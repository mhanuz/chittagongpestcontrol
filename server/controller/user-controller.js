import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "../model/user.js";
import dotenv from 'dotenv';
import Token from '../model/token.js';

dotenv.config();

export const signupUser = async (request, response) => {
    try {
        // generate hashpassword
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(request.body.password, salt)
        const user = {name: request.body.name, username: request.body.username, password: hashPassword};
        // data validation through this user schema, return an object
        const newUser = new User(user);
        // it will save you object into the database
        // As we send data to cloud, this is an async request,
        // it will return a promise, therefor have to use await
        await newUser.save();
        return response.status(200).json({ msg: 'Signup Successfull!'})
    } catch (error) {
        return response.status(500).json({ msg: 'Error While Signup'})
    }
}

export const loginUser = async (request, response) => {
    let user = await User.findOne({ username: request.body.username })
    if(!user){
        return response.status(400).json({ msg: 'Username does not match'})
    }

    try {
        let match = await bcrypt.compare(request.body.password, user.password);
        if (match) {
            // secter key generator: require('crypto').randomBytes(64).toString('hex');
            // run above code on "node console" 
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, {expiresIn:'15m'});
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);

            const newToken = new Token({ token: refreshToken})
            await newToken.save();
            return response.status(200).json({accessToken: accessToken, refreshToken: refreshToken, name:user.name, username: user.username})
        } else {
            return response.status(400).json({ msg: "Password does not match."})
        }
    } catch(error) {
        return response.status(500).json({ msg:"Error While login !!!"})
    }
}