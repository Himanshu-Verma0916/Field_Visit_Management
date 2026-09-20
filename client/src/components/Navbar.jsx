import {
    Menu,
    Bell,
    ChevronDown,
    User,
    LogOut
} from "lucide-react";

import assets from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ setSidebar }) => {

    const { user, logout } = useAuth();
    const navigate = useNavigate();


    // Logout handle
    const handleLogout = async () => {

        try {

            await logout();

            toast.success(`${user.name} is logged out successfully`);
            navigate("/login");

        } catch (error) {

            toast.error(
                error.message || "Failed to logout"
            );

        }
    };


    return (
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6">

            {/* Left Section */}
            <div className="flex items-center gap-3">

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setSidebar(true)}
                    className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all duration-200 ease-in-out"
                >
                    <Menu size={21} />
                </button>


                {/* Application Logo */}
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 overflow-hidden">

                    <img
                        src={assets.logo}
                        alt="Field Visit Management"
                        className="w-10 h-10 object-contain"
                    />

                </div>


                {/* Application Name */}
                <div onClick={() => navigate('/')}>

                    <h1 className="text-lg sm:text-xl font-semibold text-slate-800 leading-tight">
                        Field Visit Management
                    </h1>

                    <p className="hidden sm:block text-xs text-slate-500 mt-0.5">
                        Operations Management Platform
                    </p>

                </div>

            </div>


            {/* Right Section */}
            <div className="flex items-center gap-2 sm:gap-4">

                {/* Notification */}
                <button
                    className="relative p-2.5 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-all duration-200 ease-in-out"
                >

                    <Bell size={20} />

                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />

                </button>


                {/* Divider */}
                <div className="hidden sm:block h-8 w-px bg-slate-200" />

                {/* User Profile */}
                <div className="relative">

                    {user ? (

                        /* Logged In */
                        <div className="group">

                            {/* Profile Button */}
                            <button
                                className="
                    flex items-center gap-2 sm:gap-3
                    px-2 py-1.5 rounded-lg
                    hover:bg-slate-50
                    cursor-pointer
                    transition-all duration-200 ease-in-out
                "
                            >

                                {/* Avatar */}
                                <div className="
                    w-9 h-9 rounded-full
                    bg-blue-100 text-blue-700
                    flex items-center justify-center
                    font-semibold text-sm
                ">

                                    {user.name
                                        ?.split(" ")
                                        .map((word) => word[0])
                                        .join("")
                                        .slice(0, 2)
                                        .toUpperCase()
                                    }

                                </div>


                                {/* User Information */}
                                <div className="hidden sm:block text-left">

                                    <p className="text-sm font-medium text-slate-800">
                                        {user.name}
                                    </p>

                                    <p className="text-xs text-slate-500">
                                        {user.role}
                                    </p>

                                </div>


                                {/* Dropdown Icon */}
                                <ChevronDown
                                    size={16}
                                    className="
                        hidden sm:block
                        text-slate-400
                        transition-transform
                        duration-300
                        ease-in-out
                        group-hover:rotate-180
                    "
                                />

                            </button>


                            {/* Profile Dropdown */}
                            <div
                                className="
                    absolute right-0 top-full
                    mt-2 w-52
                    bg-white
                    border border-slate-200
                    rounded-xl
                    shadow-lg
                    py-2
                    z-50

                    opacity-0
                    invisible
                    translate-y-2

                    group-hover:opacity-100
                    group-hover:visible
                    group-hover:translate-y-0

                    transition-all
                    duration-200
                    ease-out
                "
                            >

                                {/* User Info */}
                                <div className="px-4 py-3 border-b border-slate-100">

                                    <p className="text-sm font-medium text-slate-800 truncate">
                                        {user.name}
                                    </p>

                                    <p className="text-xs text-slate-500 mt-0.5 truncate">
                                        {user.email}
                                    </p>

                                </div>


                                {/* My Profile */}
                                <button
                                    onClick={() => navigate("/profile")}
                                    className="
                        w-full flex items-center gap-3
                        px-4 py-2.5
                        text-sm text-slate-700
                        hover:bg-slate-50
                        transition-colors duration-200
                    "
                                >

                                    <User
                                        size={17}
                                        className="text-slate-500"
                                    />

                                    <span>
                                        My Profile
                                    </span>

                                </button>


                                {/* Logout */}
                                <button
                                    onClick={handleLogout}
                                    className="
                        w-full flex items-center gap-3
                        px-4 py-2.5
                        text-sm text-red-600
                        hover:bg-red-50
                        transition-colors duration-200
                    "
                                >

                                    <LogOut size={17} />

                                    <span>
                                        Logout
                                    </span>

                                </button>

                            </div>

                        </div>

                    ) : (

                        /* Logged Out */
                        <button
                            onClick={() => navigate("/login")}
                            className="
                px-4 py-2
                text-sm font-medium
                text-blue-600
                border border-blue-600
                rounded-lg
                hover:bg-blue-50
                transition-all duration-200
            "
                        >
                            Sign In
                        </button>

                    )}

                </div>

            </div>

        </header>
    );
};

export default Navbar;