import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPost = async(req, res) => {
    try {
        const postMessage = await PostMessage.find();
        res.status(200).json(postMessage)
    } catch (error) {
        console.log(error.message);
    }
}

// export default getPost;
export const createPost = async(req, res) => {
    const post = req.body;

    // validate the data 
    const newPost = new PostMessage(post)
    try {
        await newPost.save(); // save to database
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({messages: error.message})
    }
}

export const updatePost = async(req,res) =>{
    const { id:_id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');
    const updatePost = await PostMessage.findByIdAndUpdate(_id, post, { new: true });
    res.json(updatePost);
}