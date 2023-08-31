const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const isAuthenticated = require("../middlewares/isAuthenticated");

//post registrar el usuario
router.post("/signup", async (req, res, next) => {
  const { username, email, password } = req.body;
  console.log(req.body);

  //creamos usuario en la base de datos
  if (!username || !email || !password) {
    res.json({ errorMessage: "todos los campos tienen que estar llenos" });
    return;
  }

  //validacion de contraseña

  const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  if (regexPassword.test(password) === false) {
    res.status(400).json({
      errorMessage:
        "La contraseña debe tener al menos, una mayuscula  y tener 8 caracteres o más",
    });
    return;
  }

  //ciframos contraseña
  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    console.log(passwordHash);

    await User.create({
      username,
      email,
      password: passwordHash,
      //verifyPassword:""
    });
  } catch (error) {
    next(error);
  }
});

//post validar las credenciales
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);

  //usuario repetido
  try {
    const foundUser = await User.findOne({ email });
    if (foundUser === null) {
      res.status(400).json({
        errorMessage:
          "Ya existe un usuario con nombre de usuario o correo electronico",
      });

      return; // clausula de guardia
    }

    const isPasswordValid = await bcrypt.compare(password, foundUser.password);
    if (isPasswordValid === false) {
      res.status(400).json({ errorMessage: "Contraseña no valida" });
      return;
    }

    //sistema de tokens (payload no inf q no cambia)

    const payload = {
      _id: foundUser._id,
      email: foundUser.email,
      role: foundUser.role.user,
      role: foundUser.role.admin,
    };

    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "2h",
    });

    res.json({ authToken });
  } catch (error) {
    next(error);
  }
});

//get decir al fronted que el usuario esta activo
router.get("/verify", isAuthenticated, (req, res, next) => {
  console.log(req.payload); //el payload aqui hace las funciones del req.session
  res.json(req.payload);
});

module.exports = router;
