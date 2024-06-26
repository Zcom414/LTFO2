import {useState} from "react"
import { toast } from "react-toastify"
import {useNavigate, NavLink} from "react-router-dom"
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  
  const [formInput, setFormInput] = useState({
    email:"",
    password: ""
  })
  
  // Hook qui permet de récupérer le context
  const auth = useAuth()

  const navigate = useNavigate()
  
 const handleChange = (e) =>{
     const {name, value} = e.target;
     setFormInput({...formInput, [name]: value})
 }


 const handleSubmit = async (e) => {
     e.preventDefault();
     
     try {
          // Sécurité
         
          const res = await axios.post("/api/users/login", formInput)
          console.log(res);
         toast.success("Vous êtes bien connecté, vous allez être redirigé.")
         
         auth.login(res.data)
         
         setTimeout(()=>{
             navigate("/")
         },2000)
    
      } catch (e) {
              toast.error(e.response.data.message)
      }
      
  }
 
 
  return (
    <div className="mt-15">
      <div className="container">
        <h1 className="">Login</h1>
        <form className="" onSubmit={handleSubmit}>
          <div className="">
            <label htmlFor="email" className="block">Email</label>
            <input
              id="email"
              type="text"
              color="light-blue"
              className='text-white'
              onChange={handleChange}
              value={formInput.email}
              name="email"
            />
          </div>
          <div className="">
            <label htmlFor="password" className="block">Mot de passe</label>
            <input
              id="password"
              color="light-blue"
              className='text-white'
              onChange={handleChange}
              value={formInput.password}
              type="password"
              name="password"
            />
          </div>
          <button type="submit" className="">Envoyer</button>
          <NavLink to="/inscription" className=""> Didn't have an account ? Create one !. </NavLink>
        </form>
      </div>
    </div>
  );
};

export default Login;
