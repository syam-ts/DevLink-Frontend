import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";

import HomeUser from './pages/user/HomeUser'
import SignupUser from './pages/user/SignupUser'
import LoginUser from './pages/user/LoginUser'

import HomeClient from './pages/client/HomeClient'
import SignupClient from './pages/client/SignupClient'
import LoginClient from './pages/client/LoginClient'

//admin  
import LoginAdmin from "./pages/admin/LoginAdmin"; 
import Index from './pages/admin/index';

import UserRoute from './routes/UserRoute';


import { Routes, Route, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import store,{ userPersistor } from './utils/redux/store/mainStore' 
 

const App = () => { 
 
  const location = useLocation();
 

  return (
    <Provider store={store}> 
    <div>  
       <Routes>

          <Route path='/user/*' element={<UserRoute />} />
 
         
      </Routes>  
    </div>
    </Provider>
  )
};

export default App;



    
   