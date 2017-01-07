const Express = require('express')
const app = Express()
const MongoClient = require('mongodb').MongoClient

const port = 8080
const dburl = 'mongodb://localhost:27017/CatAndMouse'

console.log("Connecting To Database");
dbPromise = new Promise(function(resolve, reject) {
  MongoClient.connect(dburl, function(err, db) {
    if (err != null) {
      reject(err)
    } else {
      resolve(db)
    }
  })
})

dbPromise.then(function (db) {
  console.log("Configuring Endpoints")
  app.get('/', function (req, res) {
    res.send('Hello World!')
  })

  console.log("Starting Game Server")
  app.listen(port, function () {
    console.log('Game Server running on port 8080')
  })
}).catch(function(err) {
  console.log("Issue connecting to database:" + err)
})
