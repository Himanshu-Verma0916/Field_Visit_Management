import { ShieldCheck, MapPin, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import { verifyPassword } from "../services/authServices";


const VerifyPassword = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email || "";

    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!email) {
            toast.error("Email address is missing");
            navigate("/forgot-password");
            return;
        }

        if (code.length !== 6) {
            toast.error("Please enter the 6-digit verification code");
            return;
        }

        try {

            setLoading(true);

            await verifyPassword(email, code);

            toast.success("Code verified successfully");

            navigate("/updatePassword", {
                state: { email }
            });

        } catch (error) {

            toast.error(
                error.message || "Invalid or expired verification code"
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
                                to="/forgot-password"
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
                                Verify your email
                            </h2>

                        </div>


                        <p className="text-sm text-slate-500">
                            Enter the 6-digit verification code sent to:
                        </p>

                        <p className="mt-1 text-sm font-medium text-slate-700 break-all">
                            {email || "your email address"}
                        </p>

                    </div>


                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >


                        {/* Verification Code */}
                        <div>

                            <label
                                htmlFor="code"
                                className="block text-sm font-medium text-slate-700 mb-2"
                            >
                                Verification code
                            </label>


                            <div className="relative">

                                <ShieldCheck
                                    size={18}
                                    className="
                                        absolute left-3 top-1/2
                                        -translate-y-1/2
                                        text-slate-400
                                    "
                                />


                                <input
                                    id="code"
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={6}
                                    placeholder="Enter 6-digit code"
                                    value={code}
                                    onChange={(e) =>
                                        setCode(
                                            e.target.value
                                                .replace(/\D/g, "")
                                                .slice(0, 6)
                                        )
                                    }
                                    required
                                    className="
                                        w-full
                                        pl-10 pr-4
                                        py-2.5
                                        border border-slate-300
                                        rounded-lg
                                        text-sm text-slate-800
                                        tracking-widest
                                        placeholder:tracking-normal
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


                        {/* Verify Button */}
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
                                ? "Verifying..."
                                : "Verify Code"
                            }
                        </button>

                    </form>


                    {/* Back to Login */}
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


export default VerifyPassword;