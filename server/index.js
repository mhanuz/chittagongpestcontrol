import express from 'express';
import dotenv from 'dotenv';
import Connection from './database/db.js';
import router from './routes/route.js';

dotenv.config();


const app = express();
app.use('/',router)
const port = 8000;

app.listen(port, ()=> console.log(`Server is running on port no : ${port}`));

const USERNAME = process.env.DB_Username;
const PASSWORD = process.env.DB_Password;
Connection(USERNAME,PASSWORD);