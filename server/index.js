// dependencies
// to import modules >> in pacakge.json add "type": "module"
import express from 'express';
import bodyParser from 'body-parser'; // for express middleware, to process data sent in an HTTP request body.
import mongoose from 'mongoose';
import cors from 'cors'; // cross origin resouce sharing
import dotenv from 'dotenv';

// components, modules
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js'

const app = express();
dotenv.config();


// register middlewares
app.use(bodyParser.json({ limit:'30mb', extended:true}));
app.use(bodyParser.urlencoded({ limit:'30mb', extended:true}));
app.use(cors());

// APIs
app.use('/posts', postRoutes);
app.use('/user', userRoutes)

const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=> app.listen(PORT, ()=> console.log(`Server is running on port: ${PORT}`)))
    .catch((error)=> console.log('Error while connecting to database',error.message));



