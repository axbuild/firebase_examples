const functions = require('firebase-functions')
const admin = require('firebase-admin')
const init = require('./init')

const db = admin.firestore()
const usersRef = db.collection('users')

exports.set = functions.https.onRequest( async (req, res) => {
	await usersRef
	.doc(req.body.documentId)
	.set(req.body.fields)
	.then(function() {
		res.status(200).json({})
	})
	.catch(function(error) {
		res.status(500).send(error)
	});
});

exports.add = functions.https.onRequest( async (req, res) => {

	const snapshot = await usersRef
	.where('email', "==", req.body.email)
	.get()

	if (snapshot.empty) {

		req.body.time =  Date.now()

		await usersRef
		.add(req.body)
		.then(function(ref) {
			res.status(200).json(ref.id)
		})
		.catch(function(error) {
			res.status(500).send(error)
		});
	}
	else{
		res.status(200).json('already exist')
	}


});

exports.onUpdate = functions.firestore.document('/users/{userId}')
	.onUpdate( (change, context) => {

		const data = change.after.data();
		const previousData = change.before.data();

		if (data.email == previousData.email) {
			return null;
		}

		return change.after.ref.set({
			ch: (!data.ch) ? 1 : data.ch + 1
		}, {merge: true});

})

exports.users = functions.https.onRequest((req, res) => {
	res.send("users")
});
