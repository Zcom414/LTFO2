import { useState , useEffect } from "react";
import "../assets/scss/_home.scss"

const Home = () => {

    return(
        <>
        
         <div className="vid-scontainer mt-15">
                <video  src="https://storage.googleapis.com/gtfo-prod-v1/Trailer_for_website_Pro_Res_2_H_264_24fef05909/Trailer_for_website_Pro_Res_2_H_264_24fef05909.mp4" 
                className="video-bg" 
                muted 
                autoPlay loop playsInline 
                disablePictureInPicture>
                </video>  
                    <section className="catch-phrase">

                        <div>
                            <p><span className="yellow">Learn</span> together or </p>
                                <span className="red">DIE</span> 
                            <p>together</p>
                        </div>

                    </section>
            </div>

        <main>
                <section className="descrip-card container">
                    <h1>What is "LTFO" ?</h1>
                        <p>LTFO is a fan-made (even if its our site) wiki for the game GTFO. It provides a detailed compilation of information including weapons, 
                            enemies, maps, and strategies, serving as a valuable resource for players looking to deepen their understanding and experience of the game.
                        </p> 
                </section>

            <section className="video-card">
                <h1>Okay , what is "GTFO" ?</h1>
                
                        
                    <iframe width="100%" 
                    height="315" src="https://www.youtube.com/embed/hx9dqTkxio8?si=Nt9gAiGVIPyzVrzI" 
                    title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>

                    <p>"GTFO" is a cooperative first-person shooter. Players team up to explore underground complexes, retrieve resources, 
                        and face off against hordes of alien enemies. Strategy, coordination, and communication are crucial for survival in this hostile and dark environment. 
                    </p>

                </section>
            
                <section className="maps-card">

                </section>

                <section className="sleepers-card">

                </section>

                <section className="weapons-card">
                </section>
        </main>
        </>
    )
}

export default Home