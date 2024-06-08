import { useState, useEffect } from "react";
import axios from "axios"
import SleeperCard from "../componnents/SleeperCard";
import { FAILED_GET } from "../../../../Backend/utils/errorHandling";
import { Link } from 'react-router-dom';



const Sleepers = () => {
    const [sleepers, setSleepers] = useState([])
  

    useEffect(() =>{
        const fetchSleepers = async() => {
            try{
                const res = await axios.get(`http://localhost:9000/api/sleepers`)
                setSleepers(res.data)
            }

            catch(e) {
                console.error(FAILED_GET, e)
            }
        }
            fetchSleepers()
    },[])

    return(
        <>
      <section className="intro">
        <h1>Sleepers</h1>
        
        <p>In GTFO, "sleepers" are enemies that are initially inactive and are triggered when a player gets too close or makes too much noise. To effectively disarm them, it's crucial to employ stealth tactics, such as using suppressors on firearms to avoid drawing their attention. When encountering sleepers, effective communication among team members is essential to coordinate attacks and avoid alerting other enemies. 
            Utilizing silent weapons like knives or melee weapons can also be helpful for eliminating sleepers without attracting the attention of other enemies. In summary, to disarm sleepers in GTFO, a stealthy approach and team coordination 
            are key to avoiding detection and neutralizing them effectively.</p>

        </section>

        <h2 className="cards-article">Common</h2>

            <article className="article-position">
            
        {sleepers.map(sleeper => sleeper.type.common &&(
            <Link to ={`api/sleeper/${sleepers._id}`}>
                <SleeperCard key={sleeper._id} type={sleeper.type.common} />
            </Link>
            ))}
            
            </article>

            <h2 className="title-article">Unique</h2>
            <article className="article-position">
           
                {sleepers.map(sleeper => sleeper.type.unique && (
                <Link to ={`api/sleeper/${sleepers._id}`}>
                    <SleeperCard key={sleeper._id} type={sleeper.type.unique} />
                    </Link>
                ))}
            </article>
        </>
    );
}

export default Sleepers;