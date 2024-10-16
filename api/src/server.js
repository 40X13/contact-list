import express from 'express';
import fs from 'fs/promises';


import {getPath} from "./utils/get-path.js";

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
     return JSON.parse(await fs.readFile(getPath(import.meta.url, 'database/contacts.json'), 'utf8'));
}

app.listen(3000)