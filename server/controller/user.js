import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const signin = async(req, res) => {
    const {email, password} = req.body;

    try {
        const existingUser = await User.findOne({email});
        if(!existingUser) return res.status(404).json({msg:'User doesn\'t exist.'});
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
        if(!isPasswordCorrect) return res.status(404).json({msg: 'Invalid credintials'})
        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, 'test', {expiresIn:'1h'});
        res.status(200).json({ result: existingUser, token});
    } catch (error) {
        res.status(500).json({msg:'something went wrong'})
    }
}

export const signup = async(req, res)=>{
    const {email, password, confirmPassword, firstName, lastName} = req.body;

    try {
        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(400).json({msg:'User already exists.'})
        if(password !== confirmPassword) return res.status(400).json({msg:'Password don\'t match.'})
        const hashPassword = await bcrypt.hash(password, 12);
        const result = User.create({email, password:hashPassword, name:`${firstName} ${lastName}`})
        const token = jwt.sign({email: result.email, id:result._id},'test',{expiresIn:'1h'});
        res.status(200).json({result,token});
    } catch (error) {
        res.status(500).json({msg:'Something went wrong.'})
    }
}
