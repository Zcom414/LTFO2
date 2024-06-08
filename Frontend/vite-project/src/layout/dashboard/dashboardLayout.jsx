/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react'
// import { AuthContext } from '../contexts/AuthProvider'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAstronaut, faUserGroup, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FaRegMessage } from "react-icons/fa6";
import { GiMonsterGrasp } from "react-icons/gi";


    
function DashboardLayout() {

    const [content, setContent] = useState()
    const [dash, setDash] = useState()

    useEffect(() => {
        setDash(document.querySelector('#dash'))
    }, []);

     useEffect(()=> {
        if (dash) {
            const handleDashClick = () =>{
                const content = document.querySelector('#content');
                if (dash) {
                    content.classList.toggle("active")
                }
            }
            // Listener du "click" sur "dash"
            dash.addEventListener("click", handleDashClick)
            return () => {
                dash.removeEventListener('click', handleDashClick)
            }
        }
    }, [dash]);
   

    const OutClasses = classNames({ 
        active: false, //Si le menu burger est deployé et est donc sticky
        none : true,
        burgerSelect: true,
        'p-top-content': true,
        }) 
    //  redirection vers la page d'accueil après connexion
    const from = location.state?.from?.pathname || '/'




    return (
        <div className='mt-15'>
            <div className="hidden drawer-side-2 back-blue container burgerSelect ">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay-2"></label>

                   
                        {/* Sidebar content here */}
                    <section className="menu-drawer-2 p-4 w-80 min-h-full center">
                        
                        <div className='profile mbt-demi mt-demi'>
                            <Link to="/profile" className='flex mb-3 align-center '>
                                <FontAwesomeIcon icon={faUserAstronaut} style={{ width: '75px', height: '75px', borderRadius: '50%' }} alt="logo" />
                                <span className="badge badge-accent">Admin</span>
                            </Link>

                        </div>

                        <div id="dash">
                            <span className='dashboard-fsize'> Dashboard</span>
                        </div>

                            <div id='content' className={OutClasses} >

                                <div className='mb-1 burgerSelect p-top-content'>
                                    <Link to="/dashboard/users" className='content-fsize'><FontAwesomeIcon icon={faUserGroup} className='mr-2 ' /> All Users</Link>
                                </div>

                                <div className='mb-1 burgerSelect'>
                                    <Link to="/dashboard/contacts" className='content-fsize'><FaRegMessage className='mr-2  ' /> mail-Box</Link>
                                </div>

                                <div className='mb-1 burgerSelect'>
                                    <Link to="/sleepers/new" className='content-fsize'><GiMonsterGrasp className='mr-2  ' /> Set a new sleeper</Link>
                                </div>

                                <div className='mb-1 burgerSelect'>
                                    <Link to="/sleepers/new" className='content-fsize'><GiMonsterGrasp className='mr-2  ' /> Set a new weapons</Link>
                                </div>


                                
  

                        </div>      
                              

                        <div className='mb-1 burgerSelect'>
                            <a  className='dashboard-fsize'><FontAwesomeIcon icon={faRightFromBracket} className='mr-2 btn-general' /> Logout</a>
                        </div>
                        
                        <div className='burgerSelect content-fsize' >
                            <Outlet />
                        </div>
                        
                    </section>
                </div>
            </div>
    )
}

export default DashboardLayout