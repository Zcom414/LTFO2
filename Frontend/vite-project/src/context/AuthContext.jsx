import { createContext, useState, useEffect, useContext } from "react"
import {toast} from "react-toastify"
import axios from "axios"
import { token } from "./token"


export const AuthContext = createContext(null)

export const AuthProvider = ({children}) => {
    
    const [user, setUser] = useState({})
    
    
    const login = (userData) => {
        localStorage.setItem("token", JSON.stringify(userData.token))
        
        setUser(userData)
        console.log(userData);
    }
    
    const logout = () => {
        localStorage.removeItem("token")
        setUser({})
    }
    
  
    // Ce useEffect s'effectue au chargement de l'application ou à chaque rafraichissement manuel
    useEffect(() => {
        
        const fetchUser = async () => {
            try {
             const tokenFromLS = JSON.parse(localStorage.getItem("token"))
        
             if(tokenFromLS){
                    const res = await axios.get("/api/users/check", {headers: token()})
                        // Utiliser le spread operator pour ne pas écraser le TOKEN
                        // res.data = id, role, username, email
                        setUser({...user, 
                        id:res.data._id,
                        role: res.data.role,
                        username: res.data.username, 
                        email: res.data.email,
                        token: tokenFromLS
                            
                        })
                        
                        // toast.info("Vous revoilà de nouveau", {
                        //     toastId: "welcomeback"
                        // })
                        
             }
                    
            } catch (e) {
                toast.error(e.response.data.message)
                // toast.success
                // toast.warning
                // toast.info
            }
        }
        
        
        fetchUser()

        
    }, [])
    
    
    return (
        <AuthContext.Provider value={{login, logout, user}}>
           {children}
        </AuthContext.Provider>
        
        )
    
    
}


// Création d'un hook personnalisé
export const useAuth = () => useContext(AuthContext)

export default AuthProvider