const express = require("express");
const cors = require('cors');
const port = process.env.PORT || 4000;
const app = express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()

//milddlewere
app.use(cors())
app.use(express.json())






const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ns4il.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect()
        const mobileCollection = client.db("mobileCollections").collection("Products")
        console.log('no problem')

        //getting all products
        app.get('/product', async (req, res) => {
            const query = {}
            const cursor = mobileCollection.find(query)
            const products = await cursor.toArray();
            res.send(products)
        })

        //getting single Product
        app.get('/product/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const product = await mobileCollection.findOne(query)
            res.send(product)
        })


        app.put('/product/:id', async (req, res) => {
            const id = req.params.id
            const update = req.body;
            const query = { _id: ObjectId(id) }
            const options = { upsert: true }
            const updatedDoc = {
                $set: {
                    quantity: update.quantity
                }
            }
            const result = await mobileCollection.updateOne(query, updatedDoc, options)
            res.send(result)
        })


        //positing new item to the database 
        app.post('/product', async (req, res) => {
            const product = req.body;
            const result = await mobileCollection.insertOne(product);
            res.send({ success: true, result })

        })

        //delete item 
        app.delete('/product/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const value = await mobileCollection.deleteOne(query)
            res.send(value)
        })


    }
    finally {

    }

}
run().catch(console.dir())








app.get('/', (req, res) => {
    res.send('mobile market in started')
})

app.listen(port, () => {
    console.log('Hearing the port', port)
})