import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";
import LandingPage from "./pages/LandingPage";

import SignupUser from './pages/user/SignupUser'
import LoginUser from './pages/user/LoginUser'
import SignupClient from './pages/client/SignupClient'
import LoginClient from './pages/client/LoginClient'
import { BrowserRouter , Routes, Route} from 'react-router-dom';
 
const App = () => { 

  return (
    <> 

    {/* user routes */}
   <BrowserRouter>
   <Routes>
     <Route path='/user/signup' element={<SignupUser />} />
     <Route path='/user/login' element={<LoginUser />} />
   </Routes>
   </BrowserRouter>

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
