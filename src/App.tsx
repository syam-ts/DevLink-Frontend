import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar"; 
import HomeUser from './pages/user/HomeUser'
import HomeClient from './pages/client/HomeClient'

import SignupUser from './pages/user/SignupUser'
import LoginUser from './pages/user/LoginUser'
import SignupClient from './pages/client/SignupClient'
import LoginClient from './pages/client/LoginClient'
import { BrowserRouter , Routes, Route} from 'react-router-dom';
 
const App = () => { 

  return (
    <> 

    {/* user routes */}
    { location.pathname !== '/user/signup' && location.pathname !== '/user/login' && location.pathname !== '/client/signup' && location.pathname !== '/client/login' ? (
    <>
      <BrowserRouter>
     <Navbar />
   <Routes>
     <Route path='/user/home' element={<HomeUser />} />
     <Route path='/client/home' element={<HomeClient />} />
   </Routes>
      <Footer /> 
   </BrowserRouter>
      
    </>
  ): (
    <BrowserRouter>
    <Routes>
      <Route path='/user/signup' element={<SignupUser />} />
      <Route path='/user/login' element={<LoginUser />} /> 
      <Route path='/client/signup' element={<SignupClient />} />
      <Route path='/client/login' element={<LoginClient />} />
    </Routes>
    </BrowserRouter>
  )
}


   {/* Client routes */}
   {/* { location.pathname !== '/client/signup' && location.pathname == '/client/login' ? (
    <BrowserRouter>
    <Navbar />
   <Routes>
     <Route path='/client/home' element={<HomeCilent />} /> 
   </Routes>
   </BrowserRouter>
       ) : (
    <BrowserRouter>
    <Routes>
      <Route path='/client/signup' element={<SignupClient />} />
      <Route path='/client/login' element={<LoginClient />} />
    </Routes>
    </BrowserRouter>
   )} */}
   
       
    
    </>
  )
};

export default App;
