import UserRoute from './routes/UserRoute'
import ClientRoute from './routes/ClientRoute'
import LandingRoute from './routes/LandingRoute';
import NotFound from './pages/404/NotFound'; 
import { UserProctedRoute, ClientProctedRoute } from './utils/middleware/ProtectedRoute';
 
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './utils/redux/store/mainStore' 


const App = () => { 
 

  return (
    <Provider store={store}>  
       <Routes>

          <Route path='/*' element={<LandingRoute />} />
          
          <Route element={<UserProctedRoute />} >
             <Route path='user/*' element={<UserRoute />} />
          </Route>

          <Route element={<ClientProctedRoute />} >
             <Route path='client/*' element={<ClientRoute />} />
          </Route>
         
          <Route path='*' element={<NotFound />} />
         
       </Routes>   
    </Provider>
  )
};

export default App;



    
   