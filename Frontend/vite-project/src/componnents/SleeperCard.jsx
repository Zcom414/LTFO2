import { useEffect, useState } from "react";
import axios from "axios";

const SleeperCard = ({ type }) => {
  const [sleepers, setSleepers] = useState([]);

  useEffect(() => {
    const fetchSleepers = async () => {
      try {
        const res = await axios.get(`/api/sleepers`);
        setSleepers(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchSleepers();
  }, []);

  //Permet de ne pas multiplier les parties des cards 
  let firstImagePath = "";
  if (sleepers.length > 0) {
    firstImagePath = `${import.meta.env.VITE_API_URL}${sleepers[0].imagePath}`;
  }

  return (
    <main className="container">
      
      <article className="mt-demi">
        <div className="top">
        <h2>{type}</h2>
      </div>

    
      <section className="card">

        <div className="middle">
          <h3>::/Intel</h3>
          <img src={firstImagePath} alt="placeholder" />
        </div>

          <div className="end">
            <h3>:://Interrcepted communication</h3>
                    
                    <p className="s-text"> - .. Shhh...</p>
                    <p className="red"> - ..they react to light and Sounds !</p>
                    <p> - ..[untelligible screaming]</p>
          </div>
          
    </section>
   </article>
    </main> 

    
  );
};

export default SleeperCard;
