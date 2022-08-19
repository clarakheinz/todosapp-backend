
//set necessary vars
const express = require("express");
const cors = require("cors");

//set mongodb connection
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://codepalousa:<password>@cluster0.9gn4rfd.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("todos").collection("todos");
  // perform actions on the collection object
//   client.close(); we do not need to close connection right now
// good standard is to have mongo connection on each page where we access the db but this app is small for now
});


// set port
const PORT = process.env.PORT || 5000;

//init app
let app = express();

// libraries to use for functionality
app.use(cors());
app.use(express.json());


app.listen(PORT, ()=> console.log(`App started and listening on port ${PORT}`));

// add get endpoint for querying all todos

//add post endpoint to post new todo to database

// add put endpoint to update single todo

//add delete endpoint




/* I had notes in my original server file i deleted...joy. Anyways, from memory the standard way
    to create end points is to have several pages that model the routes you are creating. 
    Joel Lord was teaching this and was awesome

*/