import { Mail, Lock, MapPin, User, Shield } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

import { useAuth } from "../context/AuthContext";

const Register = () => {
    const {register} = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("FIELD_OFFICER");

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await register(name, email, password, role);

            toast.success("Account created successfully");

            navigate("/");
        } catch (error) {
            toast.error(error.message || "Registration failed");
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-8">

            <div className="w-full max-w-md">

                {/* Logo / Branding */}
                <div className="text-center mb-8">

                    <div className="mx-auto w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
                        <MapPin size={24} />
                    </div>

                    <h1 className="mt-4 text-2xl font-semibold text-slate-800">
                        Field Visit Management
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Operations Management Platform
                    </p>

                </div>


                {/* Register Card */}
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8">

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-slate-800">
                            Create an account
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Register to manage your field visits.
                        </p>
                    </div>


                    {/* Register Form */}
                    <form onSubmit={handleRegister} className="space-y-5">

                        {/* Name */}
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-slate-700 mb-2"
                            >
                                Full name
                            </label>

                            <div className="relative">

                                <User
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    id="name"
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                                />

                            </div>
                        </div>


                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-slate-700 mb-2"
                            >
                                Email address
                            </label>

                            <div className="relative">

                                <Mail
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                                />

                            </div>
                        </div>


                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-slate-700 mb-2"
                            >
                                Password
                            </label>

                            <div className="relative">

                                <Lock
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Create a password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                                />

                            </div>
                        </div>


                        {/* Role */}
                        <div>
                            <label
                                htmlFor="role"
                                className="block text-sm font-medium text-slate-700 mb-2"
                            >
                                Role
                            </label>

                            <div className="relative">

                                <Shield
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <select
                                    id="role"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-800 bg-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                                >
                                    <option value="FIELD_OFFICER">
                                        Field Officer
                                    </option>

                                    <option value="HQ_APPROVER">
                                        HQ Approver
                                    </option>

                                    <option value="ADMIN">
                                        Admin
                                    </option>
                                </select>

                            </div>
                        </div>


                        {/* Register Button */}
                        <button
                            type="submit"
                            className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white text-sm font-medium rounded-lg shadow-sm hover:shadow transition-all duration-200 ease-in-out"
                        >
                            Create Account
                        </button>

                    </form>

                </div>


                {/* Login Link */}
                <p className="text-center text-sm text-slate-500 mt-6">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
                    >
                        Sign in
                    </Link>
                </p>


                {/* Footer */}
                <p className="text-center text-xs text-slate-400 mt-4">
                    Internal Operations Management Platform
                </p>

            </div>

        </div>
    );
};

export default Register;