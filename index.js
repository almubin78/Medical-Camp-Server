const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
require('dotenv').config()
const { MongoClient } = require('mongodb');

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@medicalcluster.iyvcqq1.mongodb.net/?retryWrites=true&w=majority`;

console.log(uri);
const client = new MongoClient(uri);

async function run() {
    try {
        const campCollection = client.db("MedicalCamp").collection("campsCollection");
       
        const allUserCollection = client.db("MedicalCamp").collection("allUserCollection");

        app.get('/camps',async(req,res)=>{
            const camps = await campCollection.find({}).toArray();
            res.status(200).send(camps)
        });
        app.get('/users',async(req,res)=>{
            const user = await allUserCollection.find({}).toArray();
            res.status(200).send(user)
        });
        app.get('/email/:email',async(req,res)=>{
            const email = req.params.email;
            console.log(email);
            const user = await allUserCollection.findOne({email})
            console.log(user);
            res.send(user)
        });


        app.post('/allUsers',async(req,res)=>{
            const users = [
                {
                    "email": "participant1@example.com",
                    "name": "Participant One",
                    "image": "participant1.jpg",
                    "role": "participant"
                },
                {
                    "email": "almubin78@gmail.com",
                    "name": "Al Mubin",
                    "image": "organizer1.jpg",
                    "role": "organizer"
                },
                {
                    "email": "healthcare1@example.com",
                    "name": "Healthcare Professional One",
                    "image": "healthcare1.jpg",
                    "role": "healthcare professional"
                },
                {
                    "email": "participant2@example.com",
                    "name": "Participant Two",
                    "image": "participant2.jpg",
                    "role": "participant"
                },
                {
                    "email": "healthcare2@example.com",
                    "name": "Healthcare Professional Two",
                    "image": "healthcare2.jpg",
                    "role": "healthcare professional"
                }
            ]
            
            const user = await allUserCollection.insertOne(users);
            console.log(user);
            res.status(200).send(user)
        })
        app.post('/addCamp',async(req,res)=>{
            
            const camps = req.body;
            const insertedCamps = await campCollection.insertOne(camps);
            console.log(insertedCamps);
            res.status(200).send(insertedCamps)
        })
        

    }
    finally {

    }
}
run().catch(err => err)


app.get('/', (req, res) => {
    res.send('HomePage of server')
});

app.listen(port, () => {
    console.log('This is Module ', 'port:', port)
});