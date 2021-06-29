const express = require('express');
const mongodb = require('mongodb');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// const DBURL = 'mongodb://127.0.0.1:27017';
const DBURL = process.env.DBURL || 'mongodb://127.0.0.1:27017';
const database = "Paripoorna";
const collection = 'Docs';
const PORT = process.env.PORT || 5000;

const mongoClient = mongodb.MongoClient;

app.get('/', async (req, res) => {
    res.send("This is from our awesome paripoorna backend.....");
})


app.post('/post', async (req, res) => {
    try {
        const client = await mongoClient.connect(DBURL);
        const db = client.db(database);
        const data = await db.collection(collection).insertOne({
            name: req.body.Fullname,
            profile: req.body.Profile,
            code: req.body.Postel,
            number: req.body.Number,
            mail: req.body.Mail,
            job: req.body.Job,
            dob: req.body.Dob,
            locat: req.body.location
        });
        if (data) {
            res.status(200).json({ message: "Register Successfully." });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Oops ! Internal Error !" });
    }
});


app.post('/post/:id', async (req, res) => {
    try {
        const client = await mongoClient.connect(DBURL);
        const db = client.db(database);
        const id = mongodb.ObjectID(req.params.id);
        const update = await db.collection(collection).findOneAndUpdate({ _id: id }, {
            $set: {
                name: req.body.Fullname,
                profile: req.body.Profile,
                code: req.body.Postel,
                number: req.body.Number,
                mail: req.body.Mail,
                job: req.body.Job,
                dob: req.body.Dob,
                locat: req.body.location
            }
        });
        if (update) {
            res.status(200).json({ message: "Updated Successfully.", update });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Oops ! Internal Error !" });
    }
});


app.get('/get', async (req, res) => {
    try {
        const client = await mongoClient.connect(DBURL);
        const db = client.db(database);
        const data = await db.collection(collection).find().toArray();
        if (data) {
            res.status(200).json({ message: "Successfully got.", data });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Oops ! Internal Error !" });
    }
});


app.get('/edit/:id', async (req, res) => {
    try {
        const client = await mongoClient.connect(DBURL);
        const db = client.db(database);
        let id = mongodb.ObjectID(req.params.id);
        const data = await db.collection(collection).findOne({ _id: id });
        if (data) {
            res.status(200).json({ message: "Successfully got.", data });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Oops ! Internal Error !" });
    }
});


app.get('/delete/:id', async (req, res) => {
    try {
        const client = await mongoClient.connect(DBURL);
        const db = client.db(database);
        let id = mongodb.ObjectID(req.params.id);
        const data = await db.collection(collection).findOneAndDelete({ _id: id });
        if (data) {
            res.status(200).json({ message: "Deleted Successfully.", data });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Oops ! Internal Error !" });
    }
});


app.listen(PORT, () => console.log(`:::server started on port ${PORT}:::`));