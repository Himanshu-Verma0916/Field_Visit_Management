import {
    ArrowLeft,
    MapPin,
    CalendarDays,
    IndianRupee,
    User,
    CheckCircle,
    XCircle,
    Clock3,
    Send,
    Edit
} from "lucide-react";

import StatusBadge from "../components/StatusBadge";

const VisitDetails = () => {
    return (
        <div className="max-w-5xl">

            {/* Back Button */}
            <button
                className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors duration-200 mb-5"
            >
                <ArrowLeft size={17} />
                Back to Visits
            </button>


            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">

                <div>
                    <h2 className="text-2xl font-semibold text-slate-800">
                        Water Quality Inspection
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Field inspection and water quality assessment
                    </p>
                </div>

                <StatusBadge />

            </div>


            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                {/* Visit Information */}
                <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl shadow-sm">

                    <div className="px-5 py-4 border-b border-slate-200">
                        <h3 className="font-semibold text-slate-800">
                            Visit Information
                        </h3>
                    </div>


                    <div className="p-5">

                        {/* Purpose */}
                        <div className="mb-6">
                            <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                                Purpose
                            </p>

                            <p className="mt-2 text-sm leading-6 text-slate-700">
                                Conduct a field inspection to assess water quality
                                and collect relevant operational data from the
                                selected location.
                            </p>
                        </div>


                        {/* Information Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                            {/* Location */}
                            <div className="flex items-start gap-3">
                                <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                    <MapPin size={18} />
                                </div>

                                <div>
                                    <p className="text-xs text-slate-400">
                                        Location
                                    </p>

                                    <p className="mt-1 text-sm font-medium text-slate-700">
                                        Azamgarh, Uttar Pradesh
                                    </p>
                                </div>
                            </div>


                            {/* Planned Date */}
                            <div className="flex items-start gap-3">
                                <div className="w-9 h-9 rounded-lg bg-slate-50 text-slate-600 flex items-center justify-center shrink-0">
                                    <CalendarDays size={18} />
                                </div>

                                <div>
                                    <p className="text-xs text-slate-400">
                                        Planned Date
                                    </p>

                                    <p className="mt-1 text-sm font-medium text-slate-700">
                                        24 September 2026
                                    </p>
                                </div>
                            </div>


                            {/* Estimated Cost */}
                            <div className="flex items-start gap-3">
                                <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                                    <IndianRupee size={18} />
                                </div>

                                <div>
                                    <p className="text-xs text-slate-400">
                                        Estimated Cost
                                    </p>

                                    <p className="mt-1 text-sm font-medium text-slate-700">
                                        ₹4,500
                                    </p>
                                </div>
                            </div>


                            {/* Created By */}
                            <div className="flex items-start gap-3">
                                <div className="w-9 h-9 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center shrink-0">
                                    <User size={18} />
                                </div>

                                <div>
                                    <p className="text-xs text-slate-400">
                                        Created By
                                    </p>

                                    <p className="mt-1 text-sm font-medium text-slate-700">
                                        Rahul Sharma
                                    </p>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>


                {/* Actions */}
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm h-fit">

                    <div className="px-5 py-4 border-b border-slate-200">
                        <h3 className="font-semibold text-slate-800">
                            Actions
                        </h3>
                    </div>

                    <div className="p-5 space-y-3">

                        <button
                            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-all duration-200"
                        >
                            <Send size={16} />
                            Submit for Approval
                        </button>

                        <button
                            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-all duration-200"
                        >
                            <Edit size={16} />
                            Edit Visit
                        </button>

                        <button
                            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-all duration-200"
                        >
                            <CheckCircle size={16} />
                            Mark Completed
                        </button>

                    </div>

                </div>

            </div>


            {/* Approval History */}
            <div className="mt-5 bg-white border border-slate-200 rounded-xl shadow-sm">

                <div className="px-5 py-4 border-b border-slate-200">
                    <h3 className="font-semibold text-slate-800">
                        Approval History
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                        Decision history for this visit.
                    </p>
                </div>


                <div className="p-5">

                    {/* Approved */}
                    <div className="flex gap-4">

                        <div className="flex flex-col items-center">

                            <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                                <CheckCircle size={18} />
                            </div>

                            <div className="w-px h-full bg-slate-200 mt-2">
                            </div>

                        </div>

                        <div className="pb-6">
                            <div className="flex flex-wrap items-center gap-2">
                                <p className="text-sm font-semibold text-slate-800">
                                    Visit Approved
                                </p>

                                <span className="text-xs text-slate-400">
                                    20 Sep 2026, 10:30 AM
                                </span>
                            </div>

                            <p className="mt-1 text-sm text-slate-500">
                                Approved by Anita Verma
                            </p>

                            <p className="mt-2 text-sm text-slate-600 bg-slate-50 rounded-lg px-3 py-2">
                                Visit details reviewed and approved.
                            </p>
                        </div>

                    </div>


                    {/* Submitted */}
                    <div className="flex gap-4">

                        <div className="flex flex-col items-center">

                            <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                                <Clock3 size={18} />
                            </div>

                        </div>

                        <div>
                            <div className="flex flex-wrap items-center gap-2">
                                <p className="text-sm font-semibold text-slate-800">
                                    Submitted for Approval
                                </p>

                                <span className="text-xs text-slate-400">
                                    19 Sep 2026, 04:15 PM
                                </span>
                            </div>

                            <p className="mt-1 text-sm text-slate-500">
                                Submitted by Rahul Sharma
                            </p>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default VisitDetails;