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
    const newPost = new PostMessage({...post, creator:req.userId, createdAt: new Date().toISOString()});
    try {
        await newPost.save(); // save to database
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({messages: error.message})
    }
}

export const updatePost = async(req,res) =>{
    const post = req.body;
    const { id:_id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');
    const updatePost = await PostMessage.findByIdAndUpdate(_id, {...post, _id} , { new: true });
    res.json(updatePost);
}

export const deletePost = async(req, res)=>{
    const {id:_id} =req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');
    await PostMessage.findByIdAndRemove(_id);
    res.json({ message: " Post Deleted Successfully!"})

}

export const likePost = async (req, res)=> {
    const {id: _id} = req.params;
    if(!req.userId) return res.json({msg:"Unathenticated."});
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');
    const post = await PostMessage.findById(_id);
    const index = post.likes.findIndex((id)=> id === String(req.userId));
    if(index === -1) {
        post.likes.push(req.userId)
    } else {
        post.likes = post.likes.filter((id)=> id !== String(req.userId));
    }
    const updatePost = await PostMessage.findByIdAndUpdate(_id, post, {new: true})
    res.json(updatePost)
}