const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const bookSchema = new Schema({
  title:{
    type:String
  },
  description:{
    type:String
  },
  author:{
    type:String
  },
  tematica:{
    type:String,
    enum:["Amoroso",
      "Histórico",
      "Aventuras",
      "Policial",
      "Fantástico"]
  },
  isBorrowed:{ 
    type: Boolean, 
    default: false},
  prestamo:{
    type:mongoose.Schema.Types.ObjectId,
    ref: "User"

  }
});

const Book = model("Book", bookSchema);

module.exports = Book;
