import UserRoute from './routes/UserRoute'
import ClientRoute from './routes/ClientRoute'
import LandingRoute from './routes/LandingRoute';
import NotFound from './pages/404/NotFound'; 
import { UserProctedRoute, ClientProctedRoute } from './utils/middleware/ProtectedRoute';
import { Routes, Route } from 'react-router-dom'; 


const App = () => { 
 

  return ( 
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
  )
};

export default App;



    
   