import {Routes , Route , BrowserRouter} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Maps from './pages/Maps.jsx'
import Sleepers from './pages/Sleepers.jsx'
import NavBar from './componnents/NavBar.jsx'
import Footer from './componnents/Footer.jsx'
import Addsleeper from './pages/admin/addSleeper.jsx'
import DashboardLayout from './layout/dashboard/dashboardLayout.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
function App() {

  return (
    <>
    <NavBar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/maps" element={<Maps />} />
      
      {/* <Route path="/weapons" element={<Weapons/>}/> */}
      <Route path="/sleepers" element={<Sleepers/>}/>
      <Route path="users/register" element={<Register/>}/>
      <Route path="users/login" element={<Login/>}/>
        
        {/*ROUTES PRIVEES*/}
          <Route path='/sleepers/new' element={<Addsleeper/>}/>
          <Route path='/dashboard' element={<DashboardLayout/>}/>
    </Routes>
    <Footer/>
    </>
  )
}

export default App
