import LoginAdmin from "../pages/admin/LoginAdmin"; 
import Index from '../pages/admin/index';
import { ViewRole } from '../components/nextUi/modals/AdminViewRole'
import { Routes, Route } from 'react-router-dom';



const AdminRoute = () => {

    return (
        <>
            <Routes>
                <Route path='/login' element={<LoginAdmin />} /> 
                <Route path='/index/*' element={<Index />} /> 
                <Route path='/viewRole/:roleId/:roleInfo' element={<ViewRole />} /> 
            </Routes> 
        </>
    )
};

export default AdminRoute;


