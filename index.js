const express = require("express");
const cors = require('cors');
const port = process.env.PORT || 4000;
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()

//milddlewere
app.use(cors())
app.use(express.json())






const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ns4il.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect()
        const mobilecollection = client.db("mobileCollections").collection("Products")
        console.log('no problem')
        app.get('/products', async (req, res) => {
            const query = {}
            const cursor = mobilecollection.find(query)
            const products = await cursor.toArray();
            res.send(products)
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