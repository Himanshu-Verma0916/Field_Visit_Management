import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import CreateVisit from "./pages/CreateVisit";
import Visits from "./pages/Visits";
import VisitDetails from "./pages/VisitDetails";
import Summary from "./pages/Summary";
import Register from "./pages/Register";
import MyProfile from "./pages/MyProfile";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyPassword from "./pages/VerifyPassword";
import UpdatePassword from "./pages/UpdatePassword";
import Setting from "./pages/Setting";
import { useAuth } from "./context/AuthContext";
import Approvals from "./pages/Approvals";


const App = () => {

    const [sidebar, setSidebar] = useState(false);

    const { user, loading } = useAuth();


    // Wait until authentication check is completed
    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">

                <div className="text-center">

                    <div className="
                        w-8 h-8
                        border-4 border-blue-200
                        border-t-blue-600
                        rounded-full
                        animate-spin
                        mx-auto
                    " />

                    <p className="mt-3 text-sm text-slate-500">
                        Loading...
                    </p>

                </div>

            </div>
        );
    }


    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">

            <ToastContainer />


            {/* NAVBAR */}
            <Navbar setSidebar={setSidebar} />


            {/* MAIN APPLICATION */}
            <div className="flex flex-1 min-h-0">

                {/* SIDEBAR */}
                <Sidebar
                    sidebar={sidebar}
                    setSidebar={setSidebar}
                />


                {/* CONTENT AREA */}
                <div className="flex-1 min-w-0 flex flex-col">

                    {/* PAGE CONTENT */}
                    <main className="flex-1 p-4 md:p-6 lg:p-8">

                        <Routes>

                            {/* Dashboard */}
                            <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" replace />} />
                            {/* Authentication */}
                            <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
                            <Route path="/register" element={user ? <Navigate to="/" replace /> : <Register />} />
                            {/* Profile */}
                            <Route path="/profile" element={user ? <MyProfile /> : <Navigate to="/login" replace />} />
                            {/* Password Reset */}
                            <Route path="/forgotPassword" element={<ForgotPassword />} />
                            <Route path="/verifyPassword" element={<VerifyPassword />} />
                            <Route path="/updatePassword" element={<UpdatePassword />} />
                            {/* Visits */}
                            <Route path="/getAllVisits" element={user ? <Visits /> : <Navigate to="/login" replace />} />
                            <Route path="/createVisit" element={user ? <CreateVisit /> : <Navigate to="/login" replace />} />
                            <Route path="/getVisitById/:id" element={user ? <VisitDetails /> : <Navigate to="/login" replace />} />
                            {/* Summary */}
                            <Route path="/summary" element={user ? <Summary /> : <Navigate to="/login" replace />} />
                            <Route path="/setting" element={user ? <Setting /> : <Navigate to="/login" replace />} />
                            <Route path="/approvals" element={user ? <Approvals /> : <Navigate to="/login" replace />} />


                        </Routes>

                    </main>

                </div>

            </div>


            {/* FOOTER */}
            <Footer />

        </div>
    );
};

export default App;