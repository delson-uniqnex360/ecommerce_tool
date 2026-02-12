// src/routes/AppRoutes.tsx
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import AppAuthLayout from "../components/layout/AppAuthLayout";
import AppToast from "../components/common/AppToast";

import { LOGIN_ROUTE } from "./auth/route";

import { DASHBOARD_ROUTE } from "./dashboard/route";
import { ORDER_ROUTE } from "./order/route";
import { USER_LIST_ROUTE } from "./user/route";


interface AppRoutesProps {
    isAuth: boolean;
    setIsAuth: (auth: boolean) => void;
}

// Combine all authenticated routes
const AUTH_ROUTES = [...DASHBOARD_ROUTE, ...USER_LIST_ROUTE, ...ORDER_ROUTE];

const AppRoutes = ({ isAuth, setIsAuth }: AppRoutesProps) => {
    return (
        <BrowserRouter>
            <AppToast />
            <Routes>
                {/* Public route */}
                <Route path={LOGIN_ROUTE.path} element={<LOGIN_ROUTE.element setIsAuth={setIsAuth} />} />

                {/* Auth layout with nested routes */}
                <Route element={<AppAuthLayout isAuth={isAuth} />}>
                    {AUTH_ROUTES.map(({ path, element: Element }) => (
                        <Route key={path} path={path} element={<Element />} />
                    ))}
                </Route>

                {/* Redirect unknown paths */}
                <Route path="*" element={<Navigate to={LOGIN_ROUTE.path} replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
