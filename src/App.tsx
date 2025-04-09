import UserRoute from "./routes/UserRoute";
import ClientRoute from "./routes/ClientRoute";
import AdminRoute from "./routes/AdminRoute";
import LandingRoute from "./routes/LandingRoute";
import NotFound from "./pages/404/NotFound";
import {
  UserProtectedRoute,
  ClientProtectedRoute,
  AdminProtectedRoute,
  // RootProtectedRoute,
} from "./utils/middleware/ProtectedRoute";
import { Routes, Route } from "react-router-dom"; 

const App = () => {
  return (
    <Routes>
   
   <Route path="/*" element={<LandingRoute />} />

      {/* <Route element={<RootProtectedRoute />}>
        <Route path="/*" element={<LandingRoute />} />
      </Route> */}

      <Route element={<UserProtectedRoute />}>
        <Route path="user/*" element={<UserRoute />} />
      </Route>

      <Route element={<ClientProtectedRoute />}>
        <Route path="client/*" element={<ClientRoute />} />
      </Route>

      <Route element={<AdminProtectedRoute />}>
        <Route path="admin/*" element={<AdminRoute />} />
      </Route>  
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
