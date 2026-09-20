import {
    User,
    Mail,
    Shield,
    LogOut
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useAuth } from "../context/AuthContext";


const Settings = () => {

    const { user, logout } = useAuth();
    const navigate = useNavigate();


    // Logout
    const handleLogout = async () => {

        try {

            await logout();

            toast.success("Logged out successfully");

            navigate("/login");

        } catch (error) {

            console.error(
                "Error logging out:",
                error
            );

            toast.error(
                error.message || "Failed to logout"
            );

        }

    };


    return (
        <div className="max-w-3xl">

            {/* Page Header */}

            <div className="mb-6">

                <h2 className="text-2xl font-semibold text-slate-800">
                    Settings
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    View your profile information and manage your account.
                </p>

            </div>


            {/* Profile Details */}

            <div className="bg-white border border-slate-200 rounded-xl shadow-sm mb-5">

                {/* Header */}

                <div className="px-6 py-5 border-b border-slate-200">

                    <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">

                            <User size={20} />

                        </div>

                        <div>

                            <h3 className="text-base font-semibold text-slate-800">
                                Profile Details
                            </h3>

                            <p className="text-sm text-slate-500 mt-1">
                                Your account information.
                            </p>

                        </div>

                    </div>

                </div>


                {/* Profile Information */}

                <div className="p-6">

                    <div className="space-y-5">


                        {/* Name */}

                        <div>

                            <p className="text-sm font-medium text-slate-500 mb-2">
                                Full Name
                            </p>

                            <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg">

                                <User
                                    size={18}
                                    className="text-slate-400"
                                />

                                <p className="text-sm text-slate-800">
                                    {user?.name || "N/A"}
                                </p>

                            </div>

                        </div>


                        {/* Email */}

                        <div>

                            <p className="text-sm font-medium text-slate-500 mb-2">
                                Email Address
                            </p>

                            <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg">

                                <Mail
                                    size={18}
                                    className="text-slate-400"
                                />

                                <p className="text-sm text-slate-800">
                                    {user?.email || "N/A"}
                                </p>

                            </div>

                        </div>


                        {/* Role */}

                        <div>

                            <p className="text-sm font-medium text-slate-500 mb-2">
                                Role
                            </p>

                            <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg">

                                <Shield
                                    size={18}
                                    className="text-slate-400"
                                />

                                <p className="text-sm text-slate-800">
                                    {user?.role || "N/A"}
                                </p>

                            </div>

                            <p className="mt-2 text-xs text-slate-400">
                                Your role is assigned by the system administrator.
                            </p>

                        </div>

                    </div>

                </div>

            </div>


            {/* Logout */}

            <div className="bg-white border border-slate-200 rounded-xl shadow-sm">

                <div className="p-6 flex items-center justify-between gap-4">

                    <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">

                            <LogOut size={20} />

                        </div>

                        <div>

                            <h3 className="text-base font-semibold text-slate-800">
                                Logout
                            </h3>

                            <p className="text-sm text-slate-500 mt-1">
                                Sign out from your account.
                            </p>

                        </div>

                    </div>


                    <button
                        onClick={handleLogout}
                        className="px-5 py-2.5 border border-red-200 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50 transition-all duration-200"
                    >
                        Logout
                    </button>

                </div>

            </div>

        </div>
    );
};

export default Settings;