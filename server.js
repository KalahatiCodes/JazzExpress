const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

let db, collection;

const url = "mongodb+srv://kalahati:Qr4q9FNmhGtBc8Od@listitems.pvnup.mongodb.net/LittleJazzy?retryWrites=true&w=majority";
const dbName = "LittleJazzy";

app.listen(1118, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + 1118 + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('list').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {messages: result})
  })
})

app.post('/items', (req, res) => {
  db.collection('list').insertOne({piece: req.body.piece, composer: req.body.composer, starred:false }, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})


app.delete('/items', (req, res) => {
  db.collection('list').findOneAndDelete({piece: req.body.piece, composer: req.body.composer}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})