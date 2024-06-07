import { useState } from "react";
import axios from "axios"
import {toast} from "react-toastify"
import {NavLink} from "react-router-dom"

const Register = () => {
  const [formInput, setFormInput] = useState({
    username: "",
    email: "",
    password: "",
  });

const [checkPwd, setCheckPwd] = useState({
    minLength: false,
    uppercase: false,
    lowercase: false,
    specialChar: false
})


const [isCompleted, setIsCompleted] = useState(true)
const [successMsg, setSuccessMsg] = useState("")
const [errorMsg, setErrorMsg] = useState("")

const handleChange = (e) =>{
    const {name, value} = e.target
    // Méthode une
    setFormInput({...formInput, [name]: value}) // L - LO - LOI - LOIC
    
    //  setArray([...array, "bonjour"]) // Pour ajouter une valeur dans un state en React
    // Rappel on ne peut pas utiliser la méthode PUSH 
    
    // Méthode plus optimisée
    setFormInput(prev => ({...prev, [name]: value}))
    
    isNotFullCompleted()
    // Validation pour le mot de passe
    if(name === "password"){
        const minLength = value.length >= 8; // Renvoie un true et false
        const uppercase = /[A-Z]/.test(value);
        const lowercase = /[a-z]/.test(value);
        const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value)
        
       return setCheckPwd({
            minLength,
            uppercase,
            lowercase,
            specialChar, 
            isFocus: true
        
        })
        
        
    }
    
    setCheckPwd(prev => ({...prev, isFocus:false}))
    
}

const handleSubmit = (e) => {
    e.preventDefault();
    try {
      console.log(1)
        // Sécurité 
        
      axios.post(`${import.meta.env.VITE_API_URL}api/users/register`, formInput)
      .then((res)=>{setSuccessMsg("You're account is operationnal !")})
      .catch((err)=>{console.error("erreur")})
        
        toast.success(res.data.message)
    } catch (e) {
      console.log
        // Pour afficher le message d'erreur venant du back 
        toast.error("Error")
    }
}


const renderValidation = (isValid) => (
    isValid ? <span className ="text-green-500"> ✔️ </span> : <span className ="text-red-500"> ⛔</span>
)

const isNotFullCompleted = () => {
    const checkPwd = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*.-]).{8,55}$/
    
    if(!checkPwd.test(formInput.password)) {
       return setIsCompleted(true) 
    }
    
    return setIsCompleted(false) 

}

  return (
    <div className="mt-15 center">

    <div className="mt-demi ">{successMsg}</div>
      <section className="container center">
        <h1 className="">Register</h1>

        <form onSubmit={handleSubmit} className="justify-center">
          <input
            name="username"
            type="text"
            className="center mt-demi"
            placeholder="Pseudo..."
            onChange={handleChange}
            value={formInput.username}
          />
          <input
            name="email"
            type="email"
            className="center mt-demi"
            placeholder="Email..."
            onChange={handleChange}
            value={formInput.email}
          />
          <input
            name="password"
            type="password"
            className="center mt-demi"
            placeholder="Password..."
            onChange={handleChange}
            value={formInput.password}
          />

          {checkPwd.isFocus && 
          <div className="center text-sm space-y-2">
            <p className="center mt-demi"> {renderValidation(checkPwd.minLength)} At least 8 charachters  </p>
            <p className="center mt-demi"> {renderValidation(checkPwd.uppercase)} At least 1 Uppercase </p>
            <p className="center mt-demi"> {renderValidation(checkPwd.lowercase)} At least 1 lowercase </p>
            <p className="center mt-demi"> {renderValidation(checkPwd.specialChar)} At least 1 special's charachter  </p>
          </div>
          }

         
            <button  type="submit" variant="filled" className="mt-demi del-btn">
             Register
            </button>
        
        
        <div className="mt-demi">
          <NavLink to="/login" > Déjà inscrit? Connectez-vous. </NavLink>
        </div>

        </form>
      </section>
    </div>
  );
};

export default Register;
