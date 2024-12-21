import LoginAdmin from "../pages/admin/LoginAdmin"; 
import Index from '../pages/admin/index';
import { Routes, Route } from 'react-router-dom';



const AdminRoute = () => {

    return (
        <>
            <Routes>
                <Route path='/login' element={<LoginAdmin />} /> 
                <Route path='/index/*' element={<Index />} /> 
            </Routes> 
        </>
    )
};

export default AdminRoute;


