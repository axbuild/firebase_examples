const functions = require('firebase-functions')
const admin = require('firebase-admin')
const init = require('./init')

const db = admin.firestore()
const usersRef = db.collection('users')

exports.set = functions.https.onRequest( async (req, res) => {
	await usersRef
	.doc(req.body.documentId)
	.set(req.body.fields)
	.then(function(ref) {
		res.status(200).json(ref.id)
	})
	.catch(function(error) {
		res.status(500).send(error)
	});
});

exports.add = functions.https.onRequest( async (req, res) => {
	await usersRef
	.add(req.body)
	.then(function(ref) {
		res.status(200).json(ref.id)
	})
	.catch(function(error) {
		res.status(500).send(error)
	});
});

exports.users = functions.https.onRequest((req, res) => {
	res.send("users")
});
