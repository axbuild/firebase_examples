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

//TODO: onCreate
exports.onCreate = functions.firestore.document('/rooms/{roomId}/chats/{chatId}')
	.onCreate( (snapshot, context) => {

		console.log('===================');
		const data = snapshot.data()

		console.log(data)
		

		console.log(context.params.chatId);
		console.log(context.params.roomId);

		roomsRef
		.doc(context.params.roomId)
		.update({
			'rrrrrr':'ttttttttt'
		})
		console.log('====================');
});


// exports.onCreate = functions.firestore.document('/chats/{chatId}')
// 	.onCreate( (snap, context) => {

// 		const data = snap.data()

// 		if(data.to !== null){

// 			usersRef
// 			.doc(data.to)
// 			// .where('name', '==', data.to)
// 			.get()
// 			.then(function(querySnapshot) {
// 				querySnapshot.forEach(function(doc) {
// 					console.log("Send notify: ", doc.id, " => ", doc.data())

// 					if(doc.token !== null){
						
// 						let payload = {
// 							notification: {
// 								title: 'New Push Notify ...',
// 								body: data.message
// 							}
// 						}

// 						admin.messaging()
// 						.sendToDevice(doc.token, payload)
// 						.catch(
// 							console.error
// 						)
// 					}
					
// 				});
// 				return false
// 			})
// 			.catch(function(error) {
// 				console.error
// 			});
// 		}

// });

exports.chats = functions.https.onRequest((req, res) => {
	res.send("chats")
});