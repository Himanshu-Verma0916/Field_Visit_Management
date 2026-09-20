import {User,Mail,Shield,CalendarDays,ArrowLeft} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const MyProfile = () => {

    const { user } = useAuth();
    const navigate = useNavigate();


    // Get user initials
    const getInitials = () => {

        if (!user?.name) {
            return "U";
        }

        return user.name
            .split(" ")
            .map((word) => word[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();
    };


    // Format role
    const formatRole = (role) => {

        if (!role) {
            return "User";
        }

        return role
            .split("_")
            .map(
                (word) =>
                    word.charAt(0) + word.slice(1).toLowerCase()
            )
            .join(" ");
    };


    return (
        <div className="max-w-5xl mx-auto">

            {/* Page Header */}
            <div className="flex items-center gap-3 mb-6">

                <button
                    onClick={() => navigate(-1)}
                    className="
                        p-2 rounded-lg
                        text-slate-600
                        hover:bg-slate-200
                        transition-colors duration-200
                    "
                >
                    <ArrowLeft size={20} />
                </button>

                <div>
                    <h1 className="text-2xl font-semibold text-slate-800">
                        My Profile
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        View your account information.
                    </p>
                </div>

            </div>


            {/* Profile Card */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

                {/* Profile Header */}
                <div className="bg-slate-50 border-b border-slate-200 px-6 py-8 sm:px-8">

                    <div className="flex flex-col sm:flex-row sm:items-center gap-5">

                        {/* Avatar */}
                        <div className="
                            w-20 h-20
                            rounded-full
                            bg-blue-100
                            text-blue-700
                            flex items-center justify-center
                            text-2xl font-semibold
                            shrink-0
                        ">
                            {getInitials()}
                        </div>


                        {/* User Name */}
                        <div>

                            <h2 className="text-xl font-semibold text-slate-800">
                                {user?.name || "User"}
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                {formatRole(user?.role)}
                            </p>

                        </div>

                    </div>

                </div>


                {/* Account Information */}
                <div className="p-6 sm:p-8">

                    <h3 className="text-base font-semibold text-slate-800 mb-5">
                        Account Information
                    </h3>


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">


                        {/* Full Name */}
                        <div className="
                            border border-slate-200
                            rounded-xl
                            p-4
                            flex items-start gap-4
                        ">

                            <div className="
                                w-10 h-10
                                rounded-lg
                                bg-blue-50
                                text-blue-600
                                flex items-center justify-center
                                shrink-0
                            ">
                                <User size={19} />
                            </div>

                            <div className="min-w-0">

                                <p className="text-xs text-slate-500 mb-1">
                                    Full Name
                                </p>

                                <p className="text-sm font-medium text-slate-800 truncate">
                                    {user?.name || "Not available"}
                                </p>

                            </div>

                        </div>


                        {/* Email */}
                        <div className="
                            border border-slate-200
                            rounded-xl
                            p-4
                            flex items-start gap-4
                        ">

                            <div className="
                                w-10 h-10
                                rounded-lg
                                bg-blue-50
                                text-blue-600
                                flex items-center justify-center
                                shrink-0
                            ">
                                <Mail size={19} />
                            </div>

                            <div className="min-w-0">

                                <p className="text-xs text-slate-500 mb-1">
                                    Email Address
                                </p>

                                <p className="text-sm font-medium text-slate-800 truncate">
                                    {user?.email || "Not available"}
                                </p>

                            </div>

                        </div>


                        {/* Role */}
                        <div className="
                            border border-slate-200
                            rounded-xl
                            p-4
                            flex items-start gap-4
                        ">

                            <div className="
                                w-10 h-10
                                rounded-lg
                                bg-blue-50
                                text-blue-600
                                flex items-center justify-center
                                shrink-0
                            ">
                                <Shield size={19} />
                            </div>

                            <div>

                                <p className="text-xs text-slate-500 mb-1">
                                    Role
                                </p>

                                <p className="text-sm font-medium text-slate-800">
                                    {formatRole(user?.role)}
                                </p>

                            </div>

                        </div>


                        {/* Account Status */}
                        <div className="
                            border border-slate-200
                            rounded-xl
                            p-4
                            flex items-start gap-4
                        ">

                            <div className="
                                w-10 h-10
                                rounded-lg
                                bg-emerald-50
                                text-emerald-600
                                flex items-center justify-center
                                shrink-0
                            ">
                                <CalendarDays size={19} />
                            </div>

                            <div>

                                <p className="text-xs text-slate-500 mb-1">
                                    Account Status
                                </p>

                                <div className="flex items-center gap-2">

                                    <span className="w-2 h-2 rounded-full bg-emerald-500" />

                                    <p className="text-sm font-medium text-emerald-600">
                                        Active
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default MyProfile;