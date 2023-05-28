import mongoose from 'mongoose';

const userSchema =new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true
    }
})

// register our schema with mongoose, and the user model can then be accessed 
// by mongoose.model('user', userSchema) or Variable User
const User = mongoose.model('user', userSchema);

export default User;