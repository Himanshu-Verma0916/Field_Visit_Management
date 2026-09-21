import { LayoutDashboard, MapPin, PlusCircle, CheckCircle, BarChart3, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Sidebar = ({ sidebar, setSidebar }) => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
            toast.success(`${user.name} is logged out successfully`);

        } catch (error) {
            console.log(error.message || "Failed to Logout");
            toast.error(error.message || "Failed to Logout")
        }

    }
    return (
        <aside
            className={`fixed lg:static top-16 lg:top-0 bottom-0 left-0 z-40
        w-64 bg-slate-900 text-white flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${sidebar ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
    `}
        >
            {/* Logo / Brand */}
            <div className="h-16 px-6 flex items-center border-b border-slate-800">
                <div className="flex items-center gap-3">

                    {/* Logo */}
                    <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center">
                        <MapPin size={20} />
                    </div>

                    {/* Brand Name */}
                    <div>
                        <h1 className="text-sm font-semibold tracking-wide">
                            Field Visit
                        </h1>

                        <p className="text-xs text-slate-400">
                            Management
                        </p>
                    </div>

                </div>
            </div>


            {/* Navigation */}
            <nav className="flex-1 px-3 py-5">

                {/* Main Section */}
                <p className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    Main
                </p>

                <div className="space-y-1">

                    {/* Dashboard */}
                    <button onClick={() => { navigate('/'); setSidebar(false) }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-blue-600 text-white transition-all duration-200 ease-in-out hover:scale-105"
                    >
                        <LayoutDashboard size={19} />

                        <span className="text-sm font-medium">
                            Dashboard
                        </span>
                    </button>


                    {/* My Visits */}
                    <button onClick={() => { navigate('/getAllVisits'); setSidebar(false) }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-200 ease-in-out focus:bg-slate-700"
                    >
                        <MapPin size={19} />

                        <span className="text-sm font-medium">
                            {user?.role === "FIELD_OFFICER" ? "My Visits" : "All Visits"}
                        </span>

                    </button>


                    {/* Create Visit */}
                    <button
                        onClick={() => {
                            user?.role === "FIELD_OFFICER"
                                ? (navigate('/createVisit'), setSidebar(false))
                                : toast.info("Only FieldOfficer can create visit");
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-200 ease-in-out focus:bg-slate-700"
                    >
                        <PlusCircle size={19} />

                        <span className="text-sm font-medium">
                            Create Visit
                        </span>
                    </button>

                </div>


                {/* Management Section */}
                <p className="px-3 mt-7 mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    Management
                </p>

                <div className="space-y-1">

                    {/* Approvals */}
                    <button onClick={() => { navigate("/approvals"); setSidebar(false) }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-200 ease-in-out focus:bg-slate-700"
                    >
                        <CheckCircle size={19} />

                        <span className="text-sm font-medium">
                            Approvals
                        </span>
                    </button>


                    {/* Summary */}
                    <button onClick={() => { navigate("/summary"); setSidebar(false) }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-200 ease-in-out focus:bg-slate-700"
                    >
                        <BarChart3 size={19} />

                        <span className="text-sm font-medium">
                            Summary
                        </span>
                    </button>

                </div>

            </nav>


            {/* Bottom Section */}
            <div className="px-3 py-4 border-t border-slate-800">

                {/* Settings */}
                <button onClick={() => { navigate('/setting'); setSidebar(false) }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-200 ease-in-out focus:bg-slate-700"
                >
                    <Settings size={19} />

                    <span className="text-sm font-medium">
                        Settings
                    </span>
                </button>


                {/* Logout */}
                <button onClick={() => { handleLogout(); setSidebar(false) }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 mt-1 rounded-lg text-slate-300 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 ease-in-out focus:bg-slate-700"
                >
                    <LogOut size={19} />

                    <span className="text-sm font-medium">
                        Logout
                    </span>
                </button>

            </div>

        </aside>
    );
};

export default Sidebar;