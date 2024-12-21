
import HomeUser from '../pages/user/HomeUser'
import SignupUser from '../pages/user/SignupUser'
import LoginUser from '../pages/user/LoginUser'
import OtpUser from '../pages/user/OtpUser'
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';



const UserRoute = () => {

    const currentUser = useSelector((store: any) => store.user);
    const user: string = currentUser?.currentUser?.user?.user?.name;

    return (
        <>
        <Navbar roleType='user' roleInfo={user} />
            <Routes>
                <Route path='/signup' element={<SignupUser />} />
                <Route path='/verify-otp' element={<OtpUser />} />
                <Route path='/login' element={<LoginUser />} />
                <Route path='/home' element={<HomeUser />} />
            </Routes>
        <Footer />
        </>
    )
};

export default UserRoute;

