
//set necessary vars
const express = require("express");
const cors = require("cors");

//set mongodb connection
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://codepalousa:codepalousa@cluster0.9gn4rfd.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
let collection;
client.connect(err => {
    collection = client.db("todos").collection("todos");
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
app.get("/todos", async(req, res)=>{
    let todos = await collection.find({}).toArray();
    res.send(todos).status(200);
    console.log(todos);
});

// add post endpoint to post new todo to database
app.post("/todos", async (req, res) =>{
    try {
        res.send(await collection.insertOne({description: req.body})).status(201);
    }
    catch(e) {
        console.log(e);
        res.send(500);
    }
});

// get a todo by id
app.get("/todos/:id", async (req, res) => {
    try {
        res.send(
            await collection.findOne({_id: ObjectId(req.params)}))
            .status(200);
    }
    catch(e) {
        console.log(e);
        res.send(500);
    }
});

// add put endpoint to update single todo
app.put("/todos/:id", async (req, res) => {
    try {
        console.log(req.params);
        res.send(
            await collection.findOneAndUpdate({_id: ObjectId(req.params.id)}, {isDone: req.body}))
            .status(204);
    }
    catch(e) {
        console.log(e);
        res.send(500);
    }
});

//add delete endpoint
app.delete("todos/:id", async (req, res) => {
    try{
        console.log(req.params)
        res.send(
            await collection.findOneAndDelete({_id: ObjectId(req.params.id)})
        ).send(200);
    }
    catch(e){
        console.log(e);
        res.send(500);
    }
})



/* I had notes in my original server file i deleted...joy. Anyways, from memory the standard way
    to create end points is to have several pages that model the routes you are creating. 
    Joel Lord was teaching this and was awesome

*/