const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User= require("../models/User.model");

//post registrar el usuario
router.post("/signup", async (req, res, next) => {
  const { username, email, password } = req.body;
  console.log(req.body);

  //creamos usuario en la base de datos
  if (!username||!email||!password){
    res.json({errorMessage:"todos los campos tienen que estar llenos"})
    return;
  }

  //validacion de contraseña

  const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  if (regexPassword.test(password) === false) {
    res.status(400).json("auth/signup", {
      errorMessage:
        "La contraseña debe tener al menos, una mayuscula  y tener 8 caracteres o más",
    });
    return;
  }

  //usuario repetido
  try {
 
    const foundUser = await User.findOne({$or: [{email: email}, {username: username}]})
    console.log(foundUser)
    if (foundUser !== null) {
      res.status(400).json("auth/signup", {
        errorMessage: "Ya existe un usuario con nombre de usuario o correo electronico"
      })
      return; // detener la ejecucion de la ruta
    }

  //ciframos contraseña

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);
  console.log(passwordHash);

  await User.create({
    username: username,
    email: email,
    password: passwordHash,
  });

  res.json("/auth/login")
} catch (error) {
  next(error)
}
  
 

  
});

//post validar las credenciales

//get decir al fronted que el usuario esta activo

module.exports = router;
