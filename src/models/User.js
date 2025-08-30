const mongoose = require("mongoose")

const useSchema = new mongoose.Schema({
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    name: {type: String,required: true},
     image: {type: String,default: ""}
})

module.exports = mongoose.model("User",useSchema)