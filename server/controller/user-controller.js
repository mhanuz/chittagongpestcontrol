import bcrypt from 'bcrypt'
import User from "../model/user.js";
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