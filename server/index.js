import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoute from './routes/posts.js';

const app = express();


// middleware
app.use(bodyParser.json({ limit:'30mb', extended:true}));
app.use(bodyParser.urlencoded({ limit:'30mb', extended:true}));
app.use(cors());

app.use('/posts', postRoute);

const CONNECTION_URL = 'mongodb+srv://ashib:ashib01716@chittagongpestcontrol.bzwrvpl.mongodb.net/?retryWrites=true&w=majority'

const port = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=> app.listen(port, ()=> console.log(`Server is running on port: ${port}`)))
    .catch((error)=> console.log('Error while connecting to database',error.message));



