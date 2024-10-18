import express from 'express';
import fs from 'fs/promises';

import {getPAth} from "./helpers/utils.js";

import { MongoClient } from 'mongodb';
const url = 'mongodb://localhost:27017';
const mongoClient = new MongoClient(url);
const dbName = 'myProject';

async function run() {
    try {
        await mongoClient.connect();
        const db = mongoClient.db("usersdb");
        const collection = db.collection("users");
        const count = await collection.countDocuments();
        console.log(`В коллекции users ${count} документов`);
    }catch(err) {
        console.log(err);
    } finally {
        await mongoClient.close();
    }
}
run().catch(console.error);

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/', async function (req, res) {
    res.send(await getContactsList());
});

const getContactsList = async () => {
     return JSON.parse(await fs.readFile(getPAth(import.meta.url, 'database/contacts.json'), 'utf8'));
}

app.listen(3000)