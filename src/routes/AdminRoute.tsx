import LoginAdmin from "../pages/admin/LoginAdmin"; 
import Index from '../pages/admin/index';
import { Routes, Route } from 'react-router-dom';



const AdminRoute = () => {

    return (
        <>
            <Routes>
                <Route path='/admin/login' element={<LoginAdmin />} /> 
                <Route path='/admin/index/*' element={<Index />} /> 
            </Routes> 
        </>
    )
};

export default AdminRoute;


