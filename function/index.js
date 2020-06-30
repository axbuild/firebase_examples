const functions = require('firebase-functions')
const admin = require('firebase-admin')
const init = require('./init')
const express = require('express')
const users = require('./users')
const rooms = require('./rooms')
const chats = require('./chats')
const tests = require('./tests')


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

app.get('/tests', tests.tests)
app.post('/tests/addMessage', tests.addMessage)


exports.api = functions.https.onRequest(app)

exports.usersOnUpdate = users.onUpdate
exports.chatsOnCreate = chats.onCreate