"use strict";

// Basic express setup:

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();
const {MongoClient} = require("mongodb");
const MONGODB_URI = "mongodb://localhost:27017/tweeter";


//Mongo client with relevant module exports to handle helper 
//functions that modify content and access database
MongoClient.connect(MONGODB_URI, (err, db) => {
  
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  console.log(`Connected to mongodb: ${MONGODB_URI}`);
  
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static("public"));
  
  //This allows us to interact with the database
  const DataHelpers = require("./lib/data-helpers.js")(db);
  
  //This imports the routing for the server
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);
  
  app.use("/tweets", tweetsRoutes);
  
  app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
  });
});