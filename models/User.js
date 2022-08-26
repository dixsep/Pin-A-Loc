import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        require: true,
        min:3,
        max:20,
        unique:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
        max:50,
    },
    password:{
        type:String,
        require:true,
        min:6,
        unique:true,
    }
},{timestamps:true});

export default mongoose.model("User", UserSchema)
