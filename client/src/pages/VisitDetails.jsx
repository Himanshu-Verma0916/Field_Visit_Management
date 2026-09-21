import { ArrowLeft, MapPin, CalendarDays, IndianRupee, User,XCircle, CheckCircle, Clock3, Send, Edit } from "lucide-react";

import StatusBadge from "../components/StatusBadge";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { useAuth } from "../context/AuthContext";
import { getVisitById, updateVisit, submitVisitForApproval, decideVisit, completeVisit, getAllLocations } from "../services/visitServices";
import { useEffect, useState } from "react";

const VisitDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useAuth();

    const [visit, setVisit] = useState(null);
    const [decisions, setDecisions] = useState([]);

    const [locations, setLocations] = useState([]);

    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);

    const [isEditing, setIsEditing] = useState(false);

    const [title, setTitle] = useState("");
    const [purpose, setPurpose] = useState("");
    const [location, setLocation] = useState("");
    const [plannedDate, setPlannedDate] = useState("");
    const [estimatedCost, setEstimatedCost] = useState("");

    const [showRejectModal, setShowRejectModal] = useState(false);
    const [remark, setRemark] = useState("");

    // Load visit
    const loadVisit = async () => {
        try {
            setLoading(true);

            const data = await getVisitById(id);
            setVisit(data.visit);
            setDecisions(data.decisions || []);
        } catch (error) {
            console.error("Error loading visit:", error);

            toast.error(
                error.message || "Failed to load visit"
            );
        } finally {
            setLoading(false);
        }
    };

    // Load location
    const loadLocations = async () => {
        try {
            const data = await getAllLocations();
            setLocations(data.locations || []);

        } catch (error) {

            console.error("Error loading locations:", error);

            toast.error(
                error.message || "Failed to load locations"
            );

        }
    };

    useEffect(() => {
        loadVisit();
        loadLocations();
    }, [id]);

    // start editing
    const handleEdit = () => {
        setTitle(visit.title || "");
        setPurpose(visit.purpose || "");
        setLocation(visit.location?._id || "");
        setPlannedDate(visit.plannedDate ? visit.plannedDate.substring(0, 10) : "");
        setEstimatedCost(visit.estimatedCost || "");
        setIsEditing(true);

    };

    // handle update
    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!title.trim() || !purpose.trim() || !location || !plannedDate || !estimatedCost) {
            toast.error("Please fill all fields");
            return;
        }
        try {
            setActionLoading(true);

            await updateVisit(visit._id, title, purpose, location, plannedDate, estimatedCost);
            toast.success("Visit updated successfully");
            setIsEditing(false);
            await loadVisit();
        } catch (error) {

            console.error(
                "Error updating visit:",
                error
            );

            toast.error(
                error.message || "Failed to update visit"
            );
        } finally {
            setActionLoading(false);
        }

    };


    // submit for approval
    const handleSubmit = async () => {
        try {
            setActionLoading(true);
            await submitVisitForApproval(visit._id);
            toast.success("Visit submitted for approval");
            await loadVisit();
        } catch (error) {

            console.error(
                "Error submitting visit:",
                error
            );

            toast.error(
                error.message || "Failed to submit visit"
            );
        } finally {
            setActionLoading(false);
        }
    }

    // approve visit
    const handleApprove = async () => {
        try {
            setActionLoading(true);
            await decideVisit(visit._id, "APPROVED", "");

            toast.success("Visit approved successfully");
            await loadVisit();
        } catch (error) {

            console.error(
                "Error approving visit:",
                error
            );

            toast.error(
                error.message || "Failed to approve visit"
            );
        } finally {
            setActionLoading(false);
        }
    }

    // reject visit
    const handleReject = async () => {
        if (!remark.trim()) {
            toast.error("Rejection remark is required");
            return;
        }

        try {
            setActionLoading(true);
            await decideVisit(visit._id, "REJECTED", remark);
            toast.success("Visit rejected successfully");

            setRemark("");
            setShowRejectModal(false);
            await loadVisit();
        } catch (error) {

            console.error(
                "Error rejecting visit:",
                error
            );

            toast.error(
                error.message || "Failed to reject visit"
            );
        } finally {
            setActionLoading(false);
        }


    };

    // complete Visit
    const handleComplete = async () => {
        try {
            setActionLoading(true);
            await completeVisit(visit._id);
            toast.success("Visit marked as completed");
            await loadVisit();
        } catch (error) {

            console.error(
                "Error completing visit:",
                error
            );

            toast.error(
                error.message || "Failed to complete visit"
            );
        } finally {
            setActionLoading(false);
        }
    };

    if (loading) {

        return (
            <div className="flex items-center justify-center py-20">

                <p className="text-sm text-slate-500">
                    Loading visit details...
                </p>

            </div>
        );
    }

    // if visit not found
    if (!visit) {

        return (
            <div className="max-w-5xl">

                <button
                    onClick={() =>
                        navigate("/getAllVisits")
                    }
                    className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800"
                >
                    <ArrowLeft size={17} />

                    Back to Visits
                </button>


                <div className="mt-10 text-center">

                    <p className="text-slate-500">
                        Visit not found.
                    </p>

                </div>

            </div>
        );
    };

    // --------------------------------
    // Role / Ownership
    // --------------------------------

    const isFieldOfficer =
        user?.role === "FIELD_OFFICER";

    const isApprover =
        user?.role === "HQ_APPROVER" ||
        user?.role === "ADMIN";

    const isOwner =
        visit.createdBy?._id?.toString() ===
        user?._id?.toString();


    // --------------------------------
    // Available Actions
    // --------------------------------

    const canEdit =
        isFieldOfficer &&
        isOwner &&
        (
            visit.status === "DRAFT" ||
            visit.status === "REJECTED"
        );


    const canSubmit =
        isFieldOfficer &&
        isOwner &&
        (
            visit.status === "DRAFT" ||
            visit.status === "REJECTED"
        );


    const canDecide =
        isApprover &&
        visit.status === "PENDING";


    const canComplete =
        isFieldOfficer &&
        isOwner &&
        visit.status === "APPROVED";

    return (

        <div className="max-w-5xl">

            {/* Back */}

            <button
                onClick={() =>
                    navigate("/getAllVisits")
                }
                className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors duration-200 mb-5"
            >

                <ArrowLeft size={17} />

                Back to Visits

            </button>


            {/* Header */}

            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">

                <div>

                    <h2 className="text-2xl font-semibold text-slate-800">

                        {visit.title || "Untitled Visit"}

                    </h2>


                    <p className="mt-1 text-sm text-slate-500">

                        {visit.purpose ||
                            "No purpose provided"}

                    </p>

                </div>


                <StatusBadge
                    status={visit.status}
                />

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


                    {!isEditing ? (

                        <div className="p-5">

                            {/* Purpose */}

                            <div className="mb-6">

                                <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">

                                    Purpose

                                </p>


                                <p className="mt-2 text-sm leading-6 text-slate-700">

                                    {visit.purpose ||
                                        "No purpose provided"}

                                </p>

                            </div>


                            {/* Information */}

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

                                            {visit.location?.name ||
                                                "N/A"}

                                        </p>

                                    </div>

                                </div>


                                {/* Date */}

                                <div className="flex items-start gap-3">

                                    <div className="w-9 h-9 rounded-lg bg-slate-50 text-slate-600 flex items-center justify-center shrink-0">

                                        <CalendarDays size={18} />

                                    </div>


                                    <div>

                                        <p className="text-xs text-slate-400">
                                            Planned Date
                                        </p>

                                        <p className="mt-1 text-sm font-medium text-slate-700">

                                            {visit.plannedDate
                                                ? new Date(
                                                    visit.plannedDate
                                                ).toLocaleDateString(
                                                    "en-IN",
                                                    {
                                                        day: "numeric",
                                                        month: "long",
                                                        year: "numeric"
                                                    }
                                                )
                                                : "N/A"}

                                        </p>

                                    </div>

                                </div>


                                {/* Cost */}

                                <div className="flex items-start gap-3">

                                    <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">

                                        <IndianRupee size={18} />

                                    </div>


                                    <div>

                                        <p className="text-xs text-slate-400">
                                            Estimated Cost
                                        </p>

                                        <p className="mt-1 text-sm font-medium text-slate-700">

                                            ₹{Number(
                                                visit.estimatedCost || 0
                                            ).toLocaleString("en-IN")}

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

                                            {visit.createdBy?.name ||
                                                "Unknown"}

                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                    ) : (

                        /* Edit Form */

                        <form
                            onSubmit={handleUpdate}
                            className="p-5 space-y-5"
                        >

                            {/* Title */}

                            <div>

                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Visit Title
                                </label>

                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) =>
                                        setTitle(e.target.value)
                                    }
                                    className="w-full px-3 py-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                />

                            </div>


                            {/* Purpose */}

                            <div>

                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Purpose
                                </label>

                                <textarea
                                    rows="4"
                                    value={purpose}
                                    onChange={(e) =>
                                        setPurpose(e.target.value)
                                    }
                                    className="w-full px-3 py-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                />

                            </div>


                            {/* Location */}

                            <div>

                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Location
                                </label>

                                <select
                                    value={location}
                                    onChange={(e) =>
                                        setLocation(e.target.value)
                                    }
                                    className="w-full px-3 py-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                >

                                    <option value="">
                                        Select location
                                    </option>

                                    {locations.map((item) => (

                                        <option
                                            key={item._id}
                                            value={item._id}
                                        >
                                            {item.name}, {item.district},{" "}
                                            {item.state}
                                        </option>

                                    ))}

                                </select>

                            </div>


                            {/* Date */}

                            <div>

                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Planned Date
                                </label>

                                <input
                                    type="date"
                                    value={plannedDate}
                                    onChange={(e) =>
                                        setPlannedDate(
                                            e.target.value
                                        )
                                    }
                                    className="w-full px-3 py-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                />

                            </div>


                            {/* Cost */}

                            <div>

                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Estimated Cost
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    value={estimatedCost}
                                    onChange={(e) =>
                                        setEstimatedCost(
                                            e.target.value
                                        )
                                    }
                                    className="w-full px-3 py-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                />

                            </div>


                            {/* Edit Buttons */}

                            <div className="flex justify-end gap-3">

                                <button
                                    type="button"
                                    onClick={() =>
                                        setIsEditing(false)
                                    }
                                    className="px-4 py-2.5 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
                                >
                                    Cancel
                                </button>


                                <button
                                    type="submit"
                                    disabled={actionLoading}
                                    className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {actionLoading
                                        ? "Saving..."
                                        : "Save Changes"}
                                </button>

                            </div>

                        </form>

                    )}

                </div>


                {/* Actions */}

                <div className="bg-white border border-slate-200 rounded-xl shadow-sm h-fit">

                    <div className="px-5 py-4 border-b border-slate-200">

                        <h3 className="font-semibold text-slate-800">
                            Actions
                        </h3>

                    </div>


                    <div className="p-5 space-y-3">


                        {/* Submit */}

                        {canSubmit && (

                            <button
                                onClick={handleSubmit}
                                disabled={actionLoading}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50"
                            >

                                <Send size={16} />

                                {actionLoading
                                    ? "Processing..."
                                    : "Submit for Approval"}

                            </button>

                        )}


                        {/* Edit */}

                        {canEdit && (

                            <button
                                onClick={handleEdit}
                                disabled={actionLoading}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 disabled:opacity-50"
                            >

                                <Edit size={16} />

                                Edit Visit

                            </button>

                        )}


                        {/* Approve */}

                        {canDecide && (

                            <button
                                onClick={handleApprove}
                                disabled={actionLoading}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 disabled:opacity-50"
                            >

                                <CheckCircle size={16} />

                                Approve Visit

                            </button>

                        )}


                        {/* Reject */}

                        {canDecide && (
                            
                            <button
                                onClick={() =>{
                                    user?.role==="ADMIN" &&(
                                    setShowRejectModal(true))

                                    user?.role!=="ADMIN" &&( toast.info("Only Admin can reject the Visit"))}
                                }
                                disabled={actionLoading}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-red-300 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50 disabled:opacity-50"
                            >

                                <XCircle size={16} />

                                Reject Visit

                            </button>

                        )}


                        {/* Complete */}

                        {canComplete && (

                            <button
                                onClick={handleComplete}
                                disabled={actionLoading}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 disabled:opacity-50"
                            >

                                <CheckCircle size={16} />

                                Mark Completed

                            </button>

                        )}


                        {/* No Action */}

                        {!canSubmit &&
                            !canEdit &&
                            !canDecide &&
                            !canComplete && (

                                <p className="text-sm text-center text-slate-400 py-2">
                                    No actions available
                                </p>

                            )}

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

                    {decisions.length === 0 ? (

                        <div className="text-center py-6">

                            <Clock3
                                size={24}
                                className="mx-auto text-slate-300"
                            />

                            <p className="mt-2 text-sm text-slate-400">
                                No approval decisions yet.
                            </p>

                        </div>

                    ) : (

                        decisions.map((decision, index) => (

                            <div
                                key={decision._id}
                                className="flex gap-4"
                            >

                                <div className="flex flex-col items-center">

                                    <div
                                        className={`w-9 h-9 rounded-full flex items-center justify-center ${decision.decision === "APPROVED"
                                            ? "bg-emerald-100 text-emerald-600"
                                            : "bg-red-100 text-red-600"
                                            }`}
                                    >

                                        {decision.decision === "APPROVED"
                                            ? <CheckCircle size={18} />
                                            : <XCircle size={18} />
                                        }

                                    </div>


                                    {index !== decisions.length - 1 && (

                                        <div className="w-px h-full bg-slate-200 mt-2" />

                                    )}

                                </div>


                                <div className="pb-6">

                                    <div className="flex flex-wrap items-center gap-2">

                                        <p className="text-sm font-semibold text-slate-800">

                                            Visit{" "}
                                            {decision.decision === "APPROVED"
                                                ? "Approved"
                                                : "Rejected"}

                                        </p>


                                        <span className="text-xs text-slate-400">

                                            {new Date(
                                                decision.createdAt
                                            ).toLocaleString(
                                                "en-IN",
                                                {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit"
                                                }
                                            )}

                                        </span>

                                    </div>


                                    <p className="mt-1 text-sm text-slate-500">

                                        {decision.decision === "APPROVED"
                                            ? "Approved"
                                            : "Rejected"}{" "}
                                        by{" "}
                                        {decision.decidedBy?.name ||
                                            "Unknown"}

                                    </p>


                                    {decision.remark && (

                                        <p className="mt-2 text-sm text-slate-600 bg-slate-50 rounded-lg px-3 py-2">

                                            {decision.remark}

                                        </p>

                                    )}

                                </div>

                            </div>

                        ))

                    )}

                </div>

            </div>


            {/* Reject Modal */}

            {showRejectModal && (

                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">

                    <div className="w-full max-w-md bg-white rounded-xl shadow-xl">

                        <div className="px-5 py-4 border-b border-slate-200">

                            <h3 className="font-semibold text-slate-800">
                                Reject Visit
                            </h3>

                            <p className="mt-1 text-sm text-slate-500">
                                Please provide a reason for rejection.
                            </p>

                        </div>


                        <div className="p-5">

                            <textarea
                                rows="4"
                                value={remark}
                                onChange={(e) =>
                                    setRemark(e.target.value)
                                }
                                placeholder="Enter rejection remark..."
                                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500 resize-none"
                            />

                        </div>


                        <div className="flex justify-end gap-3 px-5 py-4 border-t border-slate-200">

                            <button
                                onClick={() => {
                                    setShowRejectModal(false);
                                    setRemark("");
                                }}
                                className="px-4 py-2.5 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
                            >
                                Cancel
                            </button>


                            <button
                                onClick={handleReject}
                                disabled={actionLoading}
                                className="px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                            >

                                {actionLoading
                                    ? "Rejecting..."
                                    : "Reject Visit"}

                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
};


export default VisitDetails;