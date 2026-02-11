// src/layouts/AuthLayout.tsx
import { Outlet, Navigate } from "react-router-dom";
import AppSidebar from "./AppSideBar";


interface AuthLayoutProps {
    isAuth: boolean;
}

const AppAuthLayout = ({ isAuth }: AuthLayoutProps) => {

    if (!isAuth) return <Navigate to="/login" />;

    return (
        <div className="w-full h-screen bg-[#eee]  flex">
            <AppSidebar />
            <div className="w-full">
                <Outlet />
            </div>
        </div>
    );
};

export default AppAuthLayout;
