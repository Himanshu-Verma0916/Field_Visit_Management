import {
    MapPin,
    CalendarDays,
    IndianRupee,
    User,
    ArrowRight
} from "lucide-react";

import StatusBadge from "./StatusBadge";

const VisitCard = ({ visit, onViewDetails }) => {

    // Prevent crash if visit data is not available
    if (!visit) {
        return null;
    }

    return (
        <div className="group bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-in-out">

            {/* Top Section */}
            <div className="flex items-start justify-between gap-4">

                {/* Title */}
                <div className="min-w-0">

                    <h3 className="text-base font-semibold text-slate-800 truncate">
                        {visit.title || "Untitled Visit"}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                        {visit.purpose || "No purpose provided"}
                    </p>

                </div>


                {/* Status */}
                <div className="shrink-0">
                    <StatusBadge status={visit.status} />
                </div>

            </div>


            {/* Visit Information */}
            <div className="mt-5 space-y-3">

                {/* Location */}
                <div className="flex items-center gap-3">

                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <MapPin size={17} />
                    </div>

                    <div>

                        <p className="text-xs text-slate-400">
                            Location
                        </p>

                        <p className="text-sm font-medium text-slate-700">
                            {visit.location?.name || "N/A"}
                        </p>

                    </div>

                </div>


                {/* Planned Date */}
                <div className="flex items-center gap-3">

                    <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-600 flex items-center justify-center shrink-0">
                        <CalendarDays size={17} />
                    </div>

                    <div>

                        <p className="text-xs text-slate-400">
                            Planned Date
                        </p>

                        <p className="text-sm font-medium text-slate-700">
                            {visit.plannedDate
                                ? new Date(visit.plannedDate).toLocaleDateString(
                                    "en-IN",
                                    {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric"
                                    }
                                )
                                : "N/A"
                            }
                        </p>

                    </div>

                </div>


                {/* Estimated Cost */}
                <div className="flex items-center gap-3">

                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <IndianRupee size={17} />
                    </div>

                    <div>

                        <p className="text-xs text-slate-400">
                            Estimated Cost
                        </p>

                        <p className="text-sm font-medium text-slate-700">
                            ₹{Number(
                                visit.estimatedCost || 0
                            ).toLocaleString("en-IN")}
                        </p>

                    </div>

                </div>

            </div>


            {/* Divider */}
            <div className="my-5 border-t border-slate-100" />


            {/* Bottom Section */}
            <div className="flex items-center justify-between gap-3">

                {/* Created By */}
                <div className="flex items-center gap-2 min-w-0">

                    <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                        <User size={14} />
                    </div>

                    <div className="min-w-0">

                        <p className="text-[11px] text-slate-400">
                            Created by
                        </p>

                        <p className="text-xs font-medium text-slate-700 truncate">
                            {visit.createdBy?.name || "Unknown"}
                        </p>

                    </div>

                </div>


                {/* View Details */}
                <button
                    onClick={() => onViewDetails?.(visit._id)}
                    className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200 shrink-0"
                >
                    View Details

                    <ArrowRight
                        size={16}
                        className="group-hover:translate-x-0.5 transition-transform duration-200"
                    />

                </button>

            </div>

        </div>
    );
};

export default VisitCard;