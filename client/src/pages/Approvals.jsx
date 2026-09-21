import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { toast } from "react-toastify";

import VisitCard from "../components/VisitCard";
import { getAllVisits } from "../services/visitServices";

const Approvals = () => {
    const navigate = useNavigate();

    const [visits, setVisits] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadPendingVisits = async () => {
        try {
            setLoading(true);

            const data = await getAllVisits("PENDING", "", 1, 100);

            setVisits(data.visits || []);
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Failed to load pending visits");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPendingVisits();
    }, []);

    return (
        <div>
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                        <CheckCircle size={22} />
                    </div>

                    <div>
                        <h1 className="text-2xl font-semibold text-slate-800">
                            Approvals
                        </h1>

                        <p className="text-sm text-slate-500 mt-1">
                            Review visits waiting for approval
                        </p>
                    </div>
                </div>
            </div>

            {/* Loading */}
            {loading && (
                <div className="text-center py-10 text-slate-500">
                    Loading pending visits...
                </div>
            )}

            {/* No pending visits */}
            {!loading && visits.length === 0 && (
                <div className="bg-white border border-slate-200 rounded-xl p-10 text-center">
                    <CheckCircle
                        size={40}
                        className="mx-auto text-slate-300 mb-3"
                    />

                    <h3 className="text-lg font-medium text-slate-700">
                        No pending approvals
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                        There are currently no visits waiting for approval.
                    </p>
                </div>
            )}

            {/* Pending Visits */}
            {!loading && visits.length > 0 && (
                <>
                    <div className="mb-4">
                        <p className="text-sm text-slate-500">
                            {visits.length} visit{visits.length !== 1 ? "s" : ""}{" "}
                            waiting for approval
                        </p>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
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
                </>
            )}
        </div>
    );
};

export default Approvals;