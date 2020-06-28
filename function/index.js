const functions = require('firebase-functions')
const admin = require('firebase-admin')
const init = require('./init')
const express = require('express')
const users = require('./users')
const rooms = require('./rooms')
const chats = require('./chats')


const db = admin.firestore()
const app = express()

app.get('/', (req, res) => {
	res.send("Hello from API!")
})

app.get('/users', users.users)
app.post('/users/set', users.set)
app.post('/users/add', users.add)

app.get('/rooms', rooms.rooms)
app.post('/rooms/set', rooms.set)
app.post('/rooms/add', rooms.add)

app.get('/chats', chats.chats)
app.post('/chats/add', chats.add)


exports.api = functions.https.onRequest(app);

// exports.sendNotify = functions.firestore.document('/chats/{chatId}')
// 	.onCreate( (snap, context) => {
// 		console.log('send push notify inited')
// 	// console.log('users', context)
// 	// console.log('users', snap.data())
	
// 	//TODO: onCreateMessageHandler get Recipient Tokens and Send Notify
// 	const data = snap.data()

// 	if(data.to !== null && 1 === 3){

// 		db.collection('users')
// 		.doc(data.to)
// 		// .where('name', '==', data.to)
// 		.get()
// 		.then(function(querySnapshot) {
// 			querySnapshot.forEach(function(doc) {
// 				console.log(doc.id, " => ", doc.data());

// 				if(doc.token !== null){
					
// 					let payload = {
// 						notification: {
// 							title: 'You have been invited to a trip.',
// 							body: 'Tap here to check it out!'
// 						}
// 					}
// 					console.log(payload);
// 					// admin.messaging().sendToDevice(doc.token, payload)
// 					admin.messaging()
// 					.sendToDevice("00000", payload)
// 					.catch(
// 						console.error
// 					)
// 				}
				
// 			});
// 			return false
// 		})
// 		.catch(function(error) {
// 			console.log("Error getting documents: ", error);
// 		});
// 	}

// });




// exports.testAddNewMessage = functions.https.onRequest(async (request, response) => {
	
// 	let chatExist = true;
// 	let roomId = null
// 	let chatId = null

// 	const roomsRef = db.collection('rooms')
// 	const snapshot = await roomsRef
// 		.where('users.'+'test_user_code_1', "==", true)
// 		.where('users.'+'test_user_code_2', "==", true)
// 		.get()

// 	if (snapshot.empty) {
// 		await db.collection('rooms')
// 		.add({
// 				users: {'test_user_code_1':true, 'test_user_code_2':true},
// 				time: Date.now()
// 		})
// 		.then(function(ref) {
// 			roomId = ref.id
// 			response.send(ref)
// 		})
// 		.catch(function(error) {
// 			response.send(error);
// 		});

// 		if(roomId.id !== null)
// 		{
// 			await db.collection('rooms')
// 			.doc(roomId)
// 			.collection('chats')
// 			.add({
// 					message: 'This is test message',
// 					type:'text',
// 					author: 'test_user_code_1',
// 					to:'test_user_code_2',
// 					time: Date.now()
// 			})
// 			.then(function(ref) {
// 				chatId = ref.id;
// 				response.send(ref)
// 			})
// 			.catch(function(error) {
// 				response.send(error);
// 			});
// 		}
// 	}
// 	else{
// 		response.send('not empty')
// 	}

// });
