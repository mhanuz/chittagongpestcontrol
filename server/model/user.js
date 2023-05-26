import express from 'express';
import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    username:{
        type: String,
        require: true,
        unique: true
    },
    password:{
        type:String,
        require: true
    }
})

const user = mongoose.model('user', userSchema);

export default user;