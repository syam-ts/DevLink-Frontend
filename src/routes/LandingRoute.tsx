import React from "react";
import LandingPage from "../pages/publicPages/LandingPage";
import Role from "../pages/publicPages/Role";
import { Routes, Route } from "react-router-dom";
import OtpVerify from "../pages/publicPages/OtpVerify";
import NotFound from "../pages/404/NotFound";
import LoginComponent from "../components/common/LoginComponent";
import SignupComponent from "../components/common/SignupComponent";
import ResetPassword from "../pages/common/ResetPassword";
import VerifyEmail from "../pages/common/VerifyEmail";
import { ROUTE } from "../config/constants/route";
// import ResetPassword from '../pages/user/ResetPassword';

const {
    ROOT,
    NOT_FOUND,
    ROLE,
    LOGIN,
    SIGNUP,
    VERIFY_OTP,
    VERIFY_EMAIL,
    RESET_PASSWORD,
} = ROUTE.APP;

const LandingRoute: React.FC = () => {
    return (
        <>
            <Routes>
                <Route path={ROOT} element={<LandingPage />} />
                <Route path={NOT_FOUND} element={<NotFound />} />
                <Route path={ROLE} element={<Role />} />
                <Route path={LOGIN} element={<LoginComponent />} />
                <Route path={SIGNUP} element={<SignupComponent />} />
                <Route path={VERIFY_OTP} element={<OtpVerify />} />
                <Route path={VERIFY_EMAIL} element={<VerifyEmail />} />
                <Route path={RESET_PASSWORD} element={<ResetPassword />} />
            </Routes>
        </>
    );
};

export default LandingRoute;
