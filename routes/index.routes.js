const router = require("express").Router();
const express = require("express");
const Book = require("../models/Book.model");
const Comment = require("../models/Comment.model");
const User = require("../models/User.model");
const isAuthenticated = require("../middlewares/isAuthenticated.js");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const authRouter = require("./auth.routes");
router.use("/auth", authRouter);

const bookRouter = require("./book.routes");
router.use("/book", bookRouter);

const userRouter = require("./user.routes");
router.use("/user", userRouter);

//home

// router.get("/home", isAuthenticated, async (req, res, next) => {
//   try {
//     // const userId = req.params.id;
//     const user = req.payload._id;
//     const userData=await  User.findById(user)

    
    


//     res.json({ userData });
//   } catch (error) {
//     next(error);
//   }
// });

//añadir

// router.post("/anadir", async (req, res, next) => {
// const { title, description, author, tematica } = req.body;

//   try {
    

//     const newBook = await Book.create({ title, description, author, tematica });

    
//     res.json(newBook);
  
//   } catch (error) {
//     next(error);
//   }
// });

//coleccion

// router.get("/coleccion", async (req, res, next) => {
//   try {
//     const books = await Book.find().select({ title: 1 });

//     res.json(books);
//   } catch (error) {
//     next(error);
//   }
// });

//detalles
//para listar el libro
// router.get("/coleccion/:id", isAuthenticated, async (req, res, next) => {
//   const { id } = req.params;
//   console.log(id);
//   try {
//     const book = await Book.findById(id).populate("prestamo", "username");
//     const comments = await Comment.find({ libro: id }).populate(
//       "autor",
//       "username"
//     );


//     res.json({ book, comments });
//   } catch (error) {
//     next(error);
//   }
// });

// agregar comentario
// router.post("/coleccion/:id", isAuthenticated, async (req, res, next) => {
//   const { id } = req.params;
//   const { nuevoComentario } = req.body;
//   const autor = req.payload._id; //  ID  usuario
//   console.log(req.body);
//   try {
//     const newComent = {
//       libro: id,
//       autor,
//       contenido: nuevoComentario,
//     };

//     await Comment.create(newComent);

//     res.json({ message: "Comentario agregado" });
//   } catch (error) {
//     next(error);
//   }
// });

//borrar comentario
// router.delete("/comentarios/:commentId", async (req, res, next) => {
//   const { commentId  } = req.params;
//   try {


//     await Comment.findByIdAndDelete(commentId);
//     res.json({ message: "Comentario eliminado" });
//   } catch (error) {
//     next(error);
//   }
// });


//borrar un libro
// router.delete("/borrar-libro/:id", async (req, res, next) => {
//   const { id } = req.params;
//   try {
//     await Book.findByIdAndDelete(id);
//     res.json({ message: "Libro eliminado" });
//   } catch (error) {
//     next(error);
//   }
// });


// devolver un libro prestado
router.put("/devolver/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const book = await Book.findByIdAndUpdate(id, { isBorrowed: false });

    const userRole = req.payload.role;
    res.json(book, userRole);
  } catch (error) {
    next(error);
  }
});



//gestion
//listado de prestados
router.get("/gestion", async (req, res, next) => {
  try {
    const prestados = await Book.find({ isBorrowed: true });

    const userRole = req.payload.role;

    res.json(prestados,userRole );
  } catch (error) {
    next(error);
  }
});



//perfil

// router.get("/perfil", isAuthenticated, async (req, res, next) => {
//   try {
//     // const userId = req.params.id;
//     const user = req.payload._id;
//     const userData=await  User.findById(user)

    
    


//     res.json({ userData });
//   } catch (error) {
//     next(error);
//   }
// });

//editarperfil

// router.patch("/editarperfil", isAuthenticated, async (req, res, next) => {
//   try {
//    const elId=req.payload._id
//     const user = req.body.username;
    
//     await User.findByIdAndUpdate(elId , {username:user})


//     res.json({ username: user.username, email: user.email });
//   } catch (error) {
//     next(error);
//   }
// });


//editar libro
// router.put("/editarLibro/:id", isAuthenticated, async (req, res, next) => {
//   try {
    
//     const { title, author, description, tematica } = req.body
    
//     const response= await Book.findByIdAndUpdate(req.params.id, {title, author, description, tematica})


//     res.json(response);
//   } catch (error) {
//     next(error);
//   }
// });

// router.get ("/editarLibro/:id", isAuthenticated, async (req, res, next) =>{
// try{
//   const { id } = req.params;

//   const book = await Book.findById(id)


// res.json(book)

// }catch (error) {
//     next(error);
//   }




// })


module.exports = router;


