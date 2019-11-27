//use express
const express = require("express");
const bodyParser = require("body-parser")
const MongoClient = require("mongodb").MongoClient
const app = express()
var db

app.set('view engine', 'ejs')

const options = {
    keepAlive: 1,
    useUnifiedTopology: true,
    useNewUrlParser: true

}

MongoClient.connect($CONNECTION_STRING, options,  (err, MongoClient) => 
{   
    if (err) return console.log(err)

    //name of the database in quotes
    db = MongoClient.db("cluster0-cecpd")


    //add a listener so browsers can connect to us
    app.listen(32000, function ()
    {
        console.log("listening on port 32000")
    })
})

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) =>
{
    db.collection('quotes').find().toArray((err, result) =>
    {
        if (err) return console.log(err)
        // renders index.ejs
        res.render('index.ejs', { quotes: result })
    })
})

app.post('/quotes', (req, res) =>
{
    db.collection('quotes').insertOne(req.body, (err, result) =>
    {
        if (err) return console.log(err)

        console.log('added ' + "'<todo: get object name that we are adding>'" + ' to database')

        res.redirect('/')
    })
})

