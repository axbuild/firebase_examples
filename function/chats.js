const functions = require('firebase-functions')
const admin = require('firebase-admin')
const init = require('./init')

const db = admin.firestore()
const roomsRef = db.collection('rooms')

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

exports.chats = functions.https.onRequest((req, res) => {
	res.send("chats")
});