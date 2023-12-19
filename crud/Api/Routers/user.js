// your_route_file.js
const express = require('express');
const router = express.Router();
const dbConnect = require('./database_connection');
const mongodb = require('mongodb');
const { ObjectId } = require('mongodb');
router.get('/', async (req, res) => {
    try {

        let data = await dbConnect();
        data = await data.find().toArray();// data nikalskte hai data promise return karta hai
        console.log(data)//data  show karva rahe hai
        res.send(data)// data send kar rahe hai
        console.log("GET API Successfully connected");
    } catch (error) {
        console.error(`GET API connection error: ${error.message}`);
        res.status(500).send('Internal Server Error');
    }
});
router.post('/', async (req, res) => {
    try {
        let data = await dbConnect();
        // Replace with your actual collection name
        const result = await data.insertOne(req.body); // Use insertOne for a single document dyname
        console.log(result);
        res.status(201).send(result); // Send the inserted document
        console.log("POST API Successfully connected");
    } catch (error) {
        console.error(`POST API connection error: ${error.message}`);
        res.status(500).send('Internal Server Error');
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        const data = await dbConnect(); // Assuming dbConnect returns a valid MongoDB collection
        console.log( req.params.id);
        const result = await data.updateOne(
            { _id: new ObjectId (req.params.id) }, 
            { $set: req.body },
        );
        console.log(result);
        res.status(201).send({ result: "update" });
        console.log("PUT API Successfully connected");
    } catch (error) {
        console.error(`PUT API connection error: ${error.message}`);
        res.status(500).send('Internal Server Error');
    }
});



router.delete('/:id', async (req, res) => {
    try {
        let data = await dbConnect();
        const result = await data.deleteOne(
          { _id: new ObjectId (req.params.id) }, 
                { $set: req.body },

        );
        console.log(result);
        res.status(201).send({ result: "done" });
        console.log("DELETE API Successfully connected");
    } catch (error) {
        console.error(`DELETE API connection error: ${error.message}`);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
