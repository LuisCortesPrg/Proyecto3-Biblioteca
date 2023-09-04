const router = require("express").Router();
const express = require("express");
const Book= require ("../models/Book.model")
const Comment= require("../models/Comment.model")
const User= require ("../models/User.model")




router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const authRouter = require("./auth.routes");
router.use("/auth", authRouter);

//home

router.get("/home", async (req, res, next) => {
  try {
   
    const userId = req.user.id; 
    const user = await User.findById(userId);
   
    res.json({ username: user.username });
  } catch (error) {
    next(error);
  }
});

//añadir 

router.post("/anadir", async (req, res, next) => {
  try {
    const { title, description, author, tematica } = req.body;

    const newBook = await Book.create({ title, description, author, tematica });

    res.json(newBook);
  } catch (error) {
    next(error);
  }
});

//coleccion

router.get("/coleccion", async (req, res, next) => {
  try {
    const books = await Book.find().select({title:1})

    res.json(books);
  } catch (error) {
    next(error);
  }
});


//detalles
//para listar el libro
router.get("/coleccion/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id).populate("prestamo", "username")
    const comments = await Comment.find({ Book: id }).populate("autor", "username")
    const userRole = req.body.user.role; // si es admin o user

    res.json({ book, comments, userRole });
  } catch (error) {
    next(error);
  }
});

//borrar comentario 
router.delete("/coleccion/:id", async (req, res, next) => {
  const { commentId } = req.params;
  try {
    await Comment.findByIdAndDelete(commentId);
    res.json({ message: "Comentario eliminado" });
  } catch (error) {
    next(error);
  }
});



// borrar un libro
router.delete("/coleccion/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    await Book.findByIdAndDelete(id);
    res.json({ message: "Libro eliminado" });
  } catch (error) {
    next(error);
  }
});



//gestion
//listado de prestados
router.get("/gestion", async (req, res, next) => {
  try {
    const prestados = await Book.find({ isBorrowed: true });

    res.json(prestados);
  } catch (error) {
    next(error);
  }
});
// devolver un libro prestado
router.put("/coleccion/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const book = await Book.findByIdAndUpdate(id, { isBorrowed: false });
    res.json({ message: "Libro devuelto" });
  } catch (error) {
    next(error);
  }
});

//borrar un libro
router.delete("/coleccion/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    await Book.findByIdAndDelete(id);
    res.json({ message: "Libro eliminado" });
  } catch (error) {
    next(error);
  }
});

// buscar libro 
router.get("/busqueda", async (req, res, next) => {
  try {
    const { title, author, tematica } = req.query;

    const query = {};

    if (title) query.title = { $regex: title, $options: 'i' };
    if (author) query.author = { $regex: author, $options: 'i' };
    if (tematica) query.tematica = { $regex: tematica, $options: 'i' };

    const libros = await Book.find(query)



    res.json(libros);
  } catch (error) {
    next(error);
  }

  //resultado
  router.get("/resultados", async (req, res, next) => {
    try {
      const libros = await Book.find(query, "title")

    } catch (error) {
      next(error);
    }   

  })


});



module.exports = router;
