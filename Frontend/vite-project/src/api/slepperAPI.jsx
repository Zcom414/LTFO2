import axios from "axios" 
 
 export const fetchSleepers = async () => {
      
      try {
         
          // axios.get(`${import.meta.env.VITE_API_URL}/api/sleepers`)
        const res = await axios.get("/api/sleepers") // avec le vite.config.js
      
      return res.data

        
      } catch (e) {
        console.log(e);
      }
      

    }
    
    
    export const addSleeper = async (form) =>{
        try {
            
            const res = await axios.post("/api/sleepers/new", form)
            
            return res.data
        } catch (e) {
            console.log(e)
        }
    }
    
    export const getOneSleeper = async (id) => {
        try {
            
            const res = await axios.get("/api/sleepers/"+ id)
        } catch (e) {
            console.log(e);
        }
    }