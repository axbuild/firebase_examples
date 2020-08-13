const functions = require('firebase-functions')
const admin = require('firebase-admin')
const init = require('./init')

const db = admin.firestore()
const roomsRef = db.collection('rooms')

exports.set = functions.https.onRequest( async (req, res) => {
	res.send("TODO:")
});

exports.add = functions.https.onRequest( async (req, res) => {
	const users = Object.keys(req.body.users)

	const snapshot = await roomsRef
		.where('users.' + users[0], "==", true)
		.where('users.' + users[1], "==", true)
		.get()

	if (snapshot.empty) {

		req.body.time =  Date.now()

		await roomsRef
		.add(req.body)
		.then(function(ref) {
			res.status(200).json(ref.id)
		})
		.catch(function(error) {
			res.status(500).send(error)
		});
	}
	else{
		res.status(200).json('not empty')
	}
});

exports.onCreate = functions.firestore.document('/rooms/{roomId}/chats/{chatId}')
	.onCreate( (snapshot, context) => {

		console.log('===================');
		console.log(snapshot.roomId);
		console.log(context.params.userId);
		console.log('====================');
});

exports.chats = functions.https.onRequest((req, res) => {
	res.send("chats")
});