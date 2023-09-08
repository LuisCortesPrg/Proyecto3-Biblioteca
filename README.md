<strong>Project Name</strong>
Foro-teca

<strong>Description</strong>
La mejor herramienta para averiguar cual es tu próximo libro a leer. Requiere estar registrado para su uso. Se accede a las diferentes secciones por enlaces en la cabecera de la web.
Hay 3 modelos: usuario, comentario y libros.
Los usuarios pueden realizar funciones como añadir sus comentarios,editar su perfil y borrar comentarios.El administrador será el encargado de añadir y editar libros, aparte controlara el flujo de comentarios pudiendo eliminar todos los que necesite.
La relación está establecida mayormente entre las libros y comentarios.

<strong>Technologies used</strong>
Realizando proyecto final de Bootcamp con HTML, CSS, JavaScript, NodeJS,
Express, MongoDB, React, Postman y Axios.

<strong>Estructura del cliente</strong>
404 - Como usuario, quiero ver una buena página 404 cuando voy a una página que no existe para saber que fue mi culpa
500 - Como usuario, quiero ver una buena página de error cuando el súper equipo la arruina para que sepa que no es mi culpa
homepage - Como usuario, quiero poder acceder a la página de inicio para ver de qué se trata la aplicación e iniciar sesión y registrarme
registrarse - Como usuario quiero registrarme en la página web para poder ver todos los libros y la opinion de los demas usuarios
login - Como usuario, quiero poder iniciar sesión en la página web para poder volver a mi cuenta
logout - Como usuario, quiero poder cerrar sesión en la página web para asegurarme de que nadie acceda a mi cuenta.
lista de libro - Como usuario quiero ver todos los libros sobre los que hay opiniones

<strong>Modelos</strong>

<strong>Book</strong>
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

<strong>Comment</strong>
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

<strong>User</strong>
const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: false,
      unique: true
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    role:{
      type:String,
      enum:["user","admin"],
      default:"user"
    }

  },
  {
        
    timestamps: true
  }
);


<strong>API Endpoints</strong>

<table>
  <tr>

<td><strong>HTTP Method</strong></td>

<td><strong>URL</strong></td>

<td><strong>Request Body</strong></td>

<td><strong>Success status</strong></td>

<td><strong>Error Status</strong></td>

<td><strong>Description</strong></td>

  </tr>

  <tr>

<td>POST</td>

<td>/auth/signup</td>

<td>{name, email, password}</td>

<td>201</td>

<td>400</td>

<td>registro de usuario en la base de datos</td>

  </tr>

   <tr>

<td>POST</td>

<td>/auth/login</td>

<td>{username, password}</td>

<td>200</td>

<td>400</td>

<td>validacion de credenciales, creacion de token</td>

  </tr>

   <tr>

<td>GET</td>

<td>/auth/verify</td>

<td></td>

<td>200</td>

<td>401</td>

<td>verificacion de token </td>

  </tr>
  
  <tr>

<td>GET</td>

<td>/coleccion</td>

<td></td>

<td>200</td>

<td>400</td>

<td>libros de la base de datos</td>

  </tr>

<tr>

<td>POST</td>

<td>/añadir</td>

<td></td>

<td>201</td>

<td>400</td>

<td>añadir nuevo libro</td>

  </tr>

  tr>

<td>PUT</td>

<td>/editar</td>

<td></td>

<td>200</td>

<td>400, 401</td>

<td>editar libro</td>

  </tr>

  tr>

<td>DELETE</td>

<td>/coleccion/:id</td>

<td></td>

<td>200</td>

<td>401</td>

<td>borrar libro</td>

  </tr>

  <tr>

<td>DELETE</td>

<td>/borrarcoment</td>

<td></td>

<td>200</td>

<td>401</td>

<td>borrar comentario</td>

  </tr>

  <tr>

<td>GET</td>

<td>/perfil</td>

<td></td>

<td>200</td>

<td>401</td>

<td>los detalles del perfil</td>

  </tr>

  <tr>

<td>PUT</td>

<td>/editarPerfil</td>

<td></td>

<td>200</td>

<td>400, 401</td>

<td>editar usuario</td>

  </tr>



  </table>


<strong>Servicios</strong>
<strong>Servicio de autenticación</strong>

auth.login(usuario)
auth.signup(usuario)
auth.verify()

<strong>API externa</strong>

Axios


<strong>Contexto</strong>
auth.context
theme.context