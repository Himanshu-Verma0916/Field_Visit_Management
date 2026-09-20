import {
    Lock,
    MapPin,
    ArrowLeft,
    Eye,
    EyeOff
} from "lucide-react";

import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { updateLogin } from "../services/authServices";


const UpdatePassword = () => {

    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {

        e.preventDefault();

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {

            setLoading(true);

            await updateLogin(password, confirmPassword);

            toast.success("Password updated successfully");

            navigate("/login");

        } catch (error) {

            toast.error(
                error.message || "Failed to update password"
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
                                Create new password
                            </h2>

                        </div>


                        <p className="text-sm text-slate-500">
                            Enter a new password for your account.
                        </p>

                    </div>


                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >


                        {/* New Password */}
                        <div>

                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-slate-700 mb-2"
                            >
                                New password
                            </label>


                            <div className="relative">

                                <Lock
                                    size={18}
                                    className="
                                        absolute left-3 top-1/2
                                        -translate-y-1/2
                                        text-slate-400
                                    "
                                />


                                <input
                                    id="password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Enter new password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                    className="
                                        w-full
                                        pl-10 pr-11
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


                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="
                                        absolute right-3 top-1/2
                                        -translate-y-1/2
                                        text-slate-400
                                        hover:text-slate-600
                                    "
                                >
                                    {showPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>

                            </div>

                        </div>


                        {/* Confirm Password */}
                        <div>

                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium text-slate-700 mb-2"
                            >
                                Confirm password
                            </label>


                            <div className="relative">

                                <Lock
                                    size={18}
                                    className="
                                        absolute left-3 top-1/2
                                        -translate-y-1/2
                                        text-slate-400
                                    "
                                />


                                <input
                                    id="confirmPassword"
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Confirm new password"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(
                                            e.target.value
                                        )
                                    }
                                    required
                                    className="
                                        w-full
                                        pl-10 pr-11
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


                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                    className="
                                        absolute right-3 top-1/2
                                        -translate-y-1/2
                                        text-slate-400
                                        hover:text-slate-600
                                    "
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>

                            </div>

                        </div>


                        {/* Password Hint */}
                        <p className="text-xs text-slate-500">
                            Password must be at least 6 characters long.
                        </p>


                        {/* Update Button */}
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
                                ? "Updating..."
                                : "Update Password"
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


export default UpdatePassword;