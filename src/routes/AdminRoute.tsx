import { ViewRole } from "../components/nextUi/modals/AdminViewRole";
import { Routes, Route } from "react-router-dom";
import Admin from '@/pages/admin/Index'

const AdminRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Admin />} />
        <Route path="/viewRole/:roleId/:roleInfo" element={<ViewRole />} />
      </Routes>
    </>
  );
};

export default AdminRoute;
