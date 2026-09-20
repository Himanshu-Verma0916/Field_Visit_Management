import {MapPin,Clock3,CheckCircle,XCircle} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import VisitCard from "../components/VisitCard";

import {
    getAllVisits
} from "../services/visitServices";

import {
    getSummary
} from "../services/summaryServices";


const Dashboard = () => {

    const navigate = useNavigate();

    const [summary, setSummary] = useState({
        totalVisits: 0,
        pendingVisits: 0,
        approvedVisits: 0,
        rejectedVisits: 0
    });

    const [visits, setVisits] = useState([]);

    const [loadingSummary, setLoadingSummary] = useState(true);
    const [loadingVisits, setLoadingVisits] = useState(true);


    // Load dashboard summary
    const loadSummary = async () => {

        try {

            setLoadingSummary(true);

            const data = await getSummary();

            setSummary(data.summary);

        } catch (error) {

            console.error(
                "Error loading dashboard summary:",
                error
            );

            toast.error(
                error.message ||
                "Failed to load dashboard summary"
            );

        } finally {

            setLoadingSummary(false);

        }
    };


    // Load recent visits
    const loadRecentVisits = async () => {

        try {

            setLoadingVisits(true);

            // First page + maximum 5 visits
            const data = await getAllVisits(
                "",
                "",
                1,
                5
            );

            setVisits(data.visits || []);

        } catch (error) {

            console.error(
                "Error loading recent visits:",
                error
            );

            toast.error(
                error.message ||
                "Failed to load recent visits"
            );

        } finally {

            setLoadingVisits(false);

        }
    };


    useEffect(() => {

        loadSummary();
        loadRecentVisits();

    }, []);


    return (
        <div className="min-h-screen bg-slate-50">

            {/* Page Header */}

            <div className="mb-6">

                <h2 className="text-2xl font-semibold text-slate-800">
                    Dashboard
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Overview of your field visits and activities.
                </p>

            </div>


            {/* Statistics */}

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-7">


                {/* Total Visits */}

                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-sm text-slate-500">
                                Total Visits
                            </p>

                            <h3 className="mt-2 text-2xl font-semibold text-slate-800">

                                {loadingSummary
                                    ? "..."
                                    : summary.totalVisits
                                }

                            </h3>

                        </div>

                        <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">

                            <MapPin size={20} />

                        </div>

                    </div>

                </div>


                {/* Pending */}

                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-sm text-slate-500">
                                Pending
                            </p>

                            <h3 className="mt-2 text-2xl font-semibold text-slate-800">

                                {loadingSummary
                                    ? "..."
                                    : summary.pendingVisits
                                }

                            </h3>

                        </div>

                        <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">

                            <Clock3 size={20} />

                        </div>

                    </div>

                </div>


                {/* Approved */}

                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-sm text-slate-500">
                                Approved
                            </p>

                            <h3 className="mt-2 text-2xl font-semibold text-slate-800">

                                {loadingSummary
                                    ? "..."
                                    : summary.approvedVisits
                                }

                            </h3>

                        </div>

                        <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">

                            <CheckCircle size={20} />

                        </div>

                    </div>

                </div>


                {/* Rejected */}

                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-sm text-slate-500">
                                Rejected
                            </p>

                            <h3 className="mt-2 text-2xl font-semibold text-slate-800">

                                {loadingSummary
                                    ? "..."
                                    : summary.rejectedVisits
                                }

                            </h3>

                        </div>

                        <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">

                            <XCircle size={20} />

                        </div>

                    </div>

                </div>

            </div>


            {/* Recent Visits */}

            <div>

                <div className="flex items-center justify-between mb-4">

                    <div>

                        <h3 className="text-lg font-semibold text-slate-800">
                            Recent Visits
                        </h3>

                        <p className="text-sm text-slate-500 mt-1">
                            Your latest field visit activities.
                        </p>

                    </div>


                    <button
                        onClick={() => navigate("/getAllVisits")}
                        className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
                    >
                        View All
                    </button>

                </div>


                {/* Recent Visit Cards */}

                {loadingVisits ? (

                    <div className="bg-white border border-slate-200 rounded-xl p-8 text-center">

                        <p className="text-sm text-slate-500">
                            Loading recent visits...
                        </p>

                    </div>

                ) : visits.length === 0 ? (

                    <div className="bg-white border border-slate-200 rounded-xl p-8 text-center">

                        <p className="text-sm text-slate-500">
                            No visits found.
                        </p>

                    </div>

                ) : (

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

                        {visits.map((visit) => (

                            <VisitCard
                                key={visit._id}
                                visit={visit}
                                onViewDetails={(id) =>
                                    navigate(`/getVisitById/${id}`)
                                }
                            />

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
};

export default Dashboard;