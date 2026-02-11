// src/routes/AppRoutes.tsx
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import AppAuthLayout from "../components/layout/AppAuthLayout";

import { LOGIN_ROUTE } from "./auth/route";
import { DASHBOARD_ROUTE } from "./dashboard/route";
import { USER_LIST_ROUTE } from "./user/route";
import AppToast from "../components/common/AppToast";


interface AppRoutesProps {
    isAuth: boolean;
    setIsAuth: (auth: boolean) => void;
}

const AppRoutes = ({ isAuth, setIsAuth }: AppRoutesProps) => {
    return (
        <BrowserRouter>
             < AppToast />
            <Routes>
               
                {/* Public route */}
                <Route path={LOGIN_ROUTE.path} element={<LOGIN_ROUTE.element setIsAuth={setIsAuth} />} />

                {/* Auth layout with nested routes */}
                <Route element={<AppAuthLayout isAuth={isAuth} />}>
                    <Route path={DASHBOARD_ROUTE.path} element={<DASHBOARD_ROUTE.element />} />
                    <Route path={USER_LIST_ROUTE.path} element={<USER_LIST_ROUTE.element />} />
                </Route>

                {/* Redirect unknown paths */}
                <Route path="*" element={<Navigate to={LOGIN_ROUTE.path} replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
