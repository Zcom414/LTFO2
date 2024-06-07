import { useEffect , useState } from "react";
import axios from "axios";

const SleeperCard = ({type}) => {
    const[sleepers, setSleepers] = useState([])

    useEffect(()=>{
    
        const fetchSleepers = async () => {
          try {
          
        const res = await axios.get("/api/sleepers")
        setSleepers(res.data)
            
          } catch (e) {
            console.log(e);
          }
        }
        fetchSleepers()
    },[])

return(
    <main className="container mt-demi mbt-demi">
                <div className="top">
                    <h2>{type}</h2>
                </div>

            <section className="card">

 {sleepers.map((s) => (
          <div key={s.id} className="sleeper-card">
            <div className="middle">
              <h3>::/Intel</h3>
              <img
                src={`${import.meta.env.VITE_API_URL}/uploads/Mobs.jpg`}
                alt="sleeper"
              />   
            </div>
 
            <div className="end">
              <h3>:://Intercepted communication</h3>
              <p className="s-text">- .. Shhh...</p>
              <p className="red">- ..they react to light and Sounds !</p>
              <p>- ..[unintelligible screaming]</p>
            </div>
          </div>  
  ))}     
    
     </section>
    </main>
  );
}

export default SleeperCard