import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";
import LandingPage from "./pages/LandingPage";
import HomeUser from './pages/user/HomeUser'

import SignupUser from './pages/user/SignupUser'
import LoginUser from './pages/user/LoginUser'
import SignupClient from './pages/client/SignupClient'
import LoginClient from './pages/client/LoginClient'
import { BrowserRouter , Routes, Route} from 'react-router-dom';
 
const App = () => { 

  return (
    <> 

    {/* user routes */}
    { location.pathname !== '/user/signup' && location.pathname !== '/user/login' ? (
    <>
      <BrowserRouter>
     <Navbar />
   <Routes>
     <Route path='/user/home' element={<HomeUser />} />
   </Routes>
      <Footer /> 
   </BrowserRouter>
      
    </>
  ): (
    <BrowserRouter>
    <Routes>
      <Route path='/user/signup' element={<SignupUser />} />
      <Route path='/user/login' element={<LoginUser />} /> 
    </Routes>
    </BrowserRouter>
  )
}


   {/* Client routes */}
   <BrowserRouter>
   <Routes>
     <Route path='/client/signup' element={<SignupClient />} />
     <Route path='/client/login' element={<LoginClient />} />
   </Routes>
   </BrowserRouter>
       
    
    </>
  )
};

export default App;
