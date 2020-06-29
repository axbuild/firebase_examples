const functions = require('firebase-functions')
const admin = require('firebase-admin')
const init = require('./init')

const db = admin.firestore()
const roomsRef = db.collection('rooms')


exports.addMessage = functions.https.onRequest(async (req, res) => {

	let roomId = null
	let chatId = null
	const users = Object.keys(req.body.users)

	const snapshot = await roomsRef
		.where('users.' + users[0], "==", true)
		.where('users.' + users[1], "==", true)
		.get()

	if (snapshot.empty) {
		let fields = req.body;
		fields.time =  Date.now()

		await roomsRef
		.add(fields)
		.then(function(ref) {
			roomId = ref.id
			res.status(200).json(ref.id)
		})
		.catch(function(error) {
			res.status(500).send(error)
		});

		if(roomId.id !== null)
		{
			await db.collection('rooms')
			.doc(roomId)
			.collection('chats')
			.add({
					message: 'This is test message',
					type:'text',
					author: 'test_user_code_1',
					to:'test_user_code_2',
					time: Date.now()
			})
			.then(function(ref) {
				chatId = ref.id;
				res.status(200).json(ref.id)
			})
			.catch(function(error) {
				res.status(500).send(error)
			});
		}
	}
	else{
		res.status(200).json('not empty')
	}

});

exports.tests = functions.https.onRequest((req, res) => {
	res.send("tests")
});