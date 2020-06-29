const functions = require('firebase-functions')
const admin = require('firebase-admin')
const init = require('./init')

const db = admin.firestore()
const roomsRef = db.collection('rooms')
const usersRef = db.collection('users')

exports.add = functions.https.onRequest( async (req, res) => {
	await roomsRef
	.doc(req.body.roomId)
	.collection('chats')
	.add(req.body.fields)
	.then(function(ref) {
		res.status(200).json(ref.id)
	})
	.catch(function(error) {
		res.status(500).send(error)
	});
});

exports.onCreateDocumentHandler = functions.firestore.document('/chats/{chatId}')
	.onCreate( (snap, context) => {
	// console.log('users', context)
	// console.log('users', snap.data())
	
	//TODO:  get Recipient Tokens and Send Notify
	const data = snap.data()

	if(data.to !== null){

		usersRef
		.doc(data.to)
		// .where('name', '==', data.to)
		.get()
		.then(function(querySnapshot) {
			querySnapshot.forEach(function(doc) {
				console.log(doc.id, " => ", doc.data());

				if(doc.token !== null){
					
					let payload = {
						notification: {
							title: 'New Push Notify!',
							body: 'Tap here to check it out!'
						}
					}

					admin.messaging()
					.sendToDevice(doc.token, payload)
					.catch(
						console.error
					)
				}
				
			});
			return false
		})
		.catch(function(error) {
			console.log("Error getting documents: ", error);
		});
	}

});

exports.chats = functions.https.onRequest((req, res) => {
	res.send("chats")
});