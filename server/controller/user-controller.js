
import User from "../model/user.js";
export const signupuser = async (request, response) => {
    try {
        const user = request.body;
        const newUser = new User(user);
        await newUser.save();

        return response.status(200).json({ msg: 'Signup Successfull!'})
    } catch (error) {
        return response.status(500).json({ msg: 'Error While Signup'})
    }
}