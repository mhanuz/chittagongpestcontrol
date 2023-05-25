import express from 'express';
import Connection from './database/db.js';

const app = express();
const port = 8000;

app.listen(port, ()=> console.log(`Server is running on port no : ${port}`));
Connection();