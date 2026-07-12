import mongoose from 'mongoose'

const authschema = new mongoose.Schema({
    role:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{timeseries:true})

const authmodel =  mongoose.model('users',authschema)

export default authmodel

