/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import classNames from "classnames"
import "../assets/scss/_navbar.scss"

function NavBar() {
    const [isSticky, setIsSticky] = useState(false);
    const [icons, setIcons] = useState()

    useEffect(() => {
        const iconsBurger = document.querySelector('#icons')
        setIcons(iconsBurger)

        const handleScroll = () => {
            const scrollTop = window.scrollY;
            if (scrollTop > 0) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
            window.addEventListener('scroll', handleScroll);
            return () => { window.removeEventListener('scroll', handleScroll); };
        };
        handleScroll();
    }, []);

    /*By Jules*/
    useEffect(()=> {
        if (icons) {
            const handleIconsClick = () =>{
                const nav = document.querySelector('#nav');
                if (nav) {
                    nav.classList.toggle("active")
                }
            }
            // Listener du "click" sur "icons"
            icons.addEventListener("click", handleIconsClick)
            return () => {
                icons.removeEventListener('click', handleIconsClick)
            }
        }
    }, [icons]);

    const navClasses = classNames({

        'main-nav-outer': true, //Si le menu burger est deployé et est donc sticky
        active : !isSticky, //true + true = true
        'transition-duration-300': isSticky, //false - false = true
        })
   
    return (
        <header id="header" className="main-nav-outer"> 

        <div className="small-logo">
                            <NavLink to="/">
                                <img
                                    className="logo"
                                    src="../../public/images-front/LTFO-logo.png"
                                    alt="Logo du site représenté par LTFO"
                                />
                            </NavLink> 
                        <div id='icons'></div>
                        </div>
           

            <nav className={navClasses}>  
           
                <div className="container"> 
               
                    <ul id="nav" className="main-nav">
                        <li>
                            <NavLink to="/" exact="true" activeclassname="active">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/sleepers" activeclassname="active">Sleepers</NavLink>
                        </li>

                        <li>
                             <NavLink  to="/weapons" activeclassname="active">Weapons</NavLink>
                        </li>
                       
                        <li>
                            <NavLink to="/Rundown" activeclassname="active">Rundown</NavLink>
                        </li>

                        <li>
                            <NavLink to="/dashboard" activeclassname="active">Dashboard</NavLink>
                        </li>
                        <li>
                            <NavLink to="/users/register" activeclassname="active">Register</NavLink>
                        </li>
                        <li>
                            <NavLink to="/users/login" activeclassname="active">Login</NavLink>
                        </li>
                    </ul>
                    
                    <a className="res-nav_click" href="#">
                        {/* <i className="fa-bars" /> */}
                    </a>
                    
                </div>
            </nav>
        </header>
    );
}

export default NavBar;
