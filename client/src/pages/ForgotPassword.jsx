import { Mail, MapPin, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { forgotPassword } from "../services/authServices";


const ForgotPassword = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            await forgotPassword(email);

            toast.success("Reset code sent to your email");

            navigate("/verifyPassword", {
                state: { email }
            });

        } catch (error) {

            toast.error(
                error.message || "Failed to send reset code"
            );

        } finally {

            setLoading(false);

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


                {/* Card */}
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8">


                    {/* Header */}
                    <div className="mb-6">

                        <div className="flex items-center gap-2 mb-4">

                            <Link
                                to="/login"
                                className="
                                    p-2 rounded-lg
                                    text-slate-500
                                    hover:bg-slate-100
                                    hover:text-slate-700
                                    transition-colors duration-200
                                "
                            >
                                <ArrowLeft size={19} />
                            </Link>

                            <h2 className="text-xl font-semibold text-slate-800">
                                Forgot password?
                            </h2>

                        </div>


                        <p className="text-sm text-slate-500">
                            Enter your registered email address and we'll
                            send you a verification code.
                        </p>

                    </div>


                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >


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
                                    className="
                                        absolute left-3 top-1/2
                                        -translate-y-1/2
                                        text-slate-400
                                    "
                                />


                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    required
                                    className="
                                        w-full
                                        pl-10 pr-4
                                        py-2.5
                                        border border-slate-300
                                        rounded-lg
                                        text-sm text-slate-800
                                        placeholder:text-slate-400
                                        outline-none
                                        focus:border-blue-500
                                        focus:ring-2
                                        focus:ring-blue-100
                                        transition-all duration-200
                                    "
                                />

                            </div>

                        </div>


                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="
                                w-full
                                py-2.5 px-4
                                bg-blue-600
                                hover:bg-blue-700
                                disabled:bg-blue-400
                                disabled:cursor-not-allowed
                                active:scale-[0.99]
                                text-white
                                text-sm font-medium
                                rounded-lg
                                shadow-sm
                                hover:shadow
                                transition-all duration-200
                            "
                        >
                            {loading
                                ? "Sending..."
                                : "Send Reset Code"
                            }
                        </button>

                    </form>


                    {/* Login Link */}
                    <p className="text-center text-sm text-slate-500 mt-6">

                        Remember your password?{" "}

                        <Link
                            to="/login"
                            className="
                                font-medium
                                text-blue-600
                                hover:text-blue-700
                                transition-colors duration-200
                            "
                        >
                            Sign in
                        </Link>

                    </p>

                </div>


                {/* Footer */}
                <p className="text-center text-xs text-slate-400 mt-6">
                    Internal Operations Management Platform
                </p>

            </div>

        </div>
    );
};


export default ForgotPassword;