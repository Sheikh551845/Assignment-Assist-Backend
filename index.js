require('dotenv').config()
const cors = require("cors");
const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT||8888;

const app= express();
app.use(cors());
app.use(express.json());




const uri = `mongodb://${process.env.DB_User}:${process.env.Use_Password}@ac-dzczvnk-shard-00-00.4kc4xcj.mongodb.net:27017,ac-dzczvnk-shard-00-01.4kc4xcj.mongodb.net:27017,ac-dzczvnk-shard-00-02.4kc4xcj.mongodb.net:27017/?ssl=true&replicaSet=atlas-dehx9a-shard-0&authSource=admin&retryWrites=true&w=majority`;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});






async function run() {
    try {
  
      await client.connect();
      const AssignmentAssistDatabase=client.db("AssignmentAssistDatabase");
      const AllAssignment=AssignmentAssistDatabase.collection("AllAssignment");
      const TakenAssignment=AssignmentAssistDatabase.collection("TakenAssignment");
  
  
      app.post("/AllAssignment", async (req, res)=> 
      {
          const Product= req.body;
          const result= await AllAssignment.insertOne(Product);
          res.send(result);
  
      });
  
      app.post("/MyTakenAssignment", async (req, res)=> 
      {
          const Product= req.body;
          const result= await TakenAssignment.insertOne(Product);
          res.send(result);
          console.log(Product);
  
      }
      
      );
  
      app.get("/MyTakenAssignment", async(req,res)=>
      {
        const cursor = TakenAssignment.find();
        const result=await cursor.toArray();
        res.send(result);
      });
  
      app.get("/AllAssignment", async(req,res)=>
      {
        const cursor = AllAssignment.find();
        const result=await cursor.toArray();
        res.send(result);
      });
  
      
  
  
  
  
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // // Ensures that the client will close when you finish/error
      // await client.close();
    }
  }
  run().catch(console.dir);
  
  
  
  
  
  app.get('/', (req, res) => {
      res.send('Hello World!')
    })
  
  app.listen(port, () => {
      console.log(`My Server is running on port: ${port}`)
  })