const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
    libro:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Book"},

    autor:{  
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"},

    contenido:{
        type:String,
    }
    },
    {
    timestamps: true
      }
    );


    const Comment = model ("Comment", userSchema);
    
    module.exports = Comment;