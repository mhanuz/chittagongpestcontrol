import dotenv from 'dotenv';
import express from 'express';
import Connection from './database/db.js'; // must include .db extension
import Router from './routes/route.js';
import cors from 'cors'
import bodyParser from 'body-parser';

// initialize dotenve
dotenv.config();

// initialize express
const app = express();
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true}))
app.use('/',Router);
const port = 8000; // express will run on this port no
// initialize express server: listen takes to arguments=> port number, a callback function: if you want to do 
// some thing after runs the server 
app.listen(port, ()=> console.log(`Server is running on port no : ${port}`));

// process object provide nodejs current informaion and control over the node js
// it is an instance of eventemmiter
const USERNAME = process.env.DB_Username;
const PASSWORD = process.env.DB_Password;
Connection(USERNAME,PASSWORD);