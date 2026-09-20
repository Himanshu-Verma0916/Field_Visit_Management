import { Mail, Lock, MapPin } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

import { useAuth } from "../context/AuthContext";

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await login(email, password);

            toast.success("Login successful");

            navigate("/");
        } catch (error) {
            toast.error(error.message || "Login failed");
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


                {/* Login Card */}
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8">

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-slate-800">
                            Welcome back
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Sign in to manage your field visits.
                        </p>
                    </div>


                    {/* Login Form */}
                    <form onSubmit={handleLogin} className="space-y-5">

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

                            <div className="flex items-center justify-between mb-2">

                                <label
                                    htmlFor="password"
                                    className="text-sm font-medium text-slate-700"
                                >
                                    Password
                                </label>

                                <Link
                                    to="/forgotPassword"
                                    className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
                                >
                                    Forgot password?
                                </Link>

                            </div>

                            <div className="relative">

                                <Lock
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                                />

                            </div>

                        </div>


                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white text-sm font-medium rounded-lg shadow-sm hover:shadow transition-all duration-200 ease-in-out"
                        >
                            Sign In
                        </button>

                    </form>

                </div>


                {/* Register Link */}
                <p className="text-center text-sm text-slate-500 mt-6">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
                    >
                        Create account
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

export default Login;