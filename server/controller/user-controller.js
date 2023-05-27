
import User from "../model/user.js";
export const signupUser = async (request, response) => {
    try {
        const user = request.body;
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