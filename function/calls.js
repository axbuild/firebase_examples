const functions = require('firebase-functions')
const admin = require('firebase-admin')
const init = require('./init')

const db = admin.firestore()
const roomsRef = db.collection('rooms')
const usersRef = db.collection('users')

exports.add = functions.https.onRequest( async (req, res) => {

	await roomsRef
	.doc(req.body.roomId)
	.collection('calls')
	.add(req.body.fields)
	.then(function(ref) {
		res.status(200).json(ref.id)
	})
	.catch(function(error) {
		res.status(500).send(error)
	});
});

//TODO: onCreate
exports.onCreate = functions.firestore.document('/rooms/{roomId}/calls/{callId}')
	.onCreate( (snapshot, context) => {

		const data = snapshot.data()

		console.log(data)
		

		console.log(context.params.callId);
		console.log(context.params.roomId);

		roomsRef
		.doc(context.params.roomId)
		.update({
			'incoming_call': true,
			'incoming_call_initor':data['author'],
			'incoming_call_num': 1
		})

});

exports.calls = functions.https.onRequest((req, res) => {
	res.send("calls")
});