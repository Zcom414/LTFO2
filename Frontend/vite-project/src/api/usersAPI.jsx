import axios from "axios" 
 
 export const fetchUsers = async () => {
      
      try {
         
          // axios.get(`${import.meta.env.VITE_API_URL}/api/sleepers`)
        const res = await axios.get("/api/users") // avec le vite.config.js
      
      return res.data

        
      } catch (e) {
        console.log(e);
      }
      

    }
    
    
    export const addUser = async (form) =>{
        try {
            
            const res = await axios.post("/api/users/new", form)
            
            return res.data
        } catch (e) {
            console.log(e)
        }
    }
    
    export const getOneUser = async (id) => {
        try {
            
            const res = await axios.get("/api/users/"+ id)
        } catch (e) {
            console.log(e);
        }
    }