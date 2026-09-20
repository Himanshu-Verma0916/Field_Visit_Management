import {
    MapPin,
    Clock3,
    CheckCircle,
    XCircle,
    ClipboardCheck,
    IndianRupee
} from "lucide-react";

const Summary = () => {
    return (
        <div>

            {/* Page Header */}
            <div className="mb-6">
                <h2 className="text-2xl font-semibold text-slate-800">
                    Summary
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Overview of field visits and approval activities.
                </p>
            </div>


            {/* Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

                {/* Total Visits */}
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200">
                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-sm text-slate-500">
                                Total Visits
                            </p>

                            <p className="mt-2 text-2xl font-semibold text-slate-800">
                                48
                            </p>
                        </div>

                        <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                            <MapPin size={20} />
                        </div>

                    </div>
                </div>


                {/* Pending */}
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200">
                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-sm text-slate-500">
                                Pending Approval
                            </p>

                            <p className="mt-2 text-2xl font-semibold text-slate-800">
                                8
                            </p>
                        </div>

                        <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                            <Clock3 size={20} />
                        </div>

                    </div>
                </div>


                {/* Approved */}
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200">
                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-sm text-slate-500">
                                Approved
                            </p>

                            <p className="mt-2 text-2xl font-semibold text-slate-800">
                                22
                            </p>
                        </div>

                        <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                            <CheckCircle size={20} />
                        </div>

                    </div>
                </div>


                {/* Rejected */}
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200">
                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-sm text-slate-500">
                                Rejected
                            </p>

                            <p className="mt-2 text-2xl font-semibold text-slate-800">
                                5
                            </p>
                        </div>

                        <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                            <XCircle size={20} />
                        </div>

                    </div>
                </div>

            </div>


            {/* Additional Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-6">

                {/* Visit Status */}
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm">

                    <div className="px-5 py-4 border-b border-slate-200">
                        <h3 className="font-semibold text-slate-800">
                            Visit Status
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                            Current distribution of visits by status.
                        </p>
                    </div>

                    <div className="p-5 space-y-4">

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                                <span className="text-sm text-slate-600">
                                    Draft
                                </span>
                            </div>

                            <span className="text-sm font-semibold text-slate-800">
                                7
                            </span>
                        </div>


                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                                <span className="text-sm text-slate-600">
                                    Pending
                                </span>
                            </div>

                            <span className="text-sm font-semibold text-slate-800">
                                8
                            </span>
                        </div>


                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                                <span className="text-sm text-slate-600">
                                    Approved
                                </span>
                            </div>

                            <span className="text-sm font-semibold text-slate-800">
                                22
                            </span>
                        </div>


                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                                <span className="text-sm text-slate-600">
                                    Rejected
                                </span>
                            </div>

                            <span className="text-sm font-semibold text-slate-800">
                                5
                            </span>
                        </div>


                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                                <span className="text-sm text-slate-600">
                                    Completed
                                </span>
                            </div>

                            <span className="text-sm font-semibold text-slate-800">
                                6
                            </span>
                        </div>

                    </div>

                </div>


                {/* Operational Overview */}
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm">

                    <div className="px-5 py-4 border-b border-slate-200">
                        <h3 className="font-semibold text-slate-800">
                            Operational Overview
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                            Key operational metrics.
                        </p>
                    </div>

                    <div className="p-5 space-y-5">

                        {/* Completed */}
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                                <ClipboardCheck size={20} />
                            </div>

                            <div>
                                <p className="text-xs text-slate-400">
                                    Completed Visits
                                </p>

                                <p className="mt-1 text-lg font-semibold text-slate-800">
                                    6
                                </p>
                            </div>
                        </div>


                        {/* Locations */}
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                <MapPin size={20} />
                            </div>

                            <div>
                                <p className="text-xs text-slate-400">
                                    Active Locations
                                </p>

                                <p className="mt-1 text-lg font-semibold text-slate-800">
                                    12
                                </p>
                            </div>
                        </div>


                        {/* Estimated Cost */}
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                                <IndianRupee size={20} />
                            </div>

                            <div>
                                <p className="text-xs text-slate-400">
                                    Estimated Visit Cost
                                </p>

                                <p className="mt-1 text-lg font-semibold text-slate-800">
                                    ₹1,24,500
                                </p>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Summary;