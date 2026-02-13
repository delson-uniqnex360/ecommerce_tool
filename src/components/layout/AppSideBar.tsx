// src/components/layout/Sidebar.tsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import { clearUserId } from "../../utils/auth";

const AppSidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Navigation links array
    const navLinks = [
        { name: "Dashboard", path: "/dashboard" },
        { name: "Customer List", path: "/users" },
        { name: "Order List", path: "/order" },
        { name: "Product List", path: "/product" }
        // Add more links here if needed
    ];

    // Helper to highlight active link
    const isActive = (path: string) => location.pathname === path;

    return (
        <aside className="w-72 h-screen bg-gray-900 text-white flex flex-col justify-between">
            {/* Top section */}
            <div>
                {/* Logo / Brand */}
                <div className="py-6 px-4 flex items-center justify-center bg-gray-800 mb-6 rounded">
                    <h1 className="text-2xl font-bold text-[#eee]">Admin Panel</h1>
                </div>

                {/* Navigation links */}
                <nav>
                    <ul className="space-y-3 px-4">
                        {navLinks.map((link) => (
                            <li key={link.path}>
                                <Link
                                    to={link.path}
                                    className={`block py-2 px-4 rounded ${isActive(link.path)
                                        ? "bg-[#eee] text-gray-900 font-semibold"
                                        : "hover:bg-gray-700 transition-colors"
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            {/* Logout button */}
            <div className="px-4 mb-6">
                <button
                    onClick={() => {
                        clearUserId();
                        navigate("/login")
                    }}
                    className="w-full py-2 px-4 rounded bg-red-500 hover:bg-red-600 transition-colors font-medium"
                >
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default AppSidebar;
