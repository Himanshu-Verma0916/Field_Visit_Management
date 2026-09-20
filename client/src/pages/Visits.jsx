import {
    Search,
    Filter,
    ChevronLeft,
    ChevronRight
} from "lucide-react";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import VisitCard from "../components/VisitCard";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import {
    getAllVisits,
    getAllLocations
} from "../services/visitServices";


const Visits = () => {

    const { user } = useAuth();
    const navigate = useNavigate();

    const [visits, setVisits] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filters
    const [status, setStatus] = useState("");
    const [location, setLocation] = useState("");

    // Locations for dropdown
    const [locations, setLocations] = useState([]);

    // Pagination
    const [page, setPage] = useState(1);

    const [pagination, setPagination] = useState({
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 1
    });


    // Load visits
    const loadVisits = async () => {

        try {

            setLoading(true);

            const data = await getAllVisits(
                status,
                location,
                page,
                10
            );

            setVisits(data.visits || []);

            setPagination(
                data.pagination || {
                    total: 0,
                    page: 1,
                    limit: 10,
                    totalPages: 1
                }
            );

        } catch (error) {

            console.error("Error loading visits:", error);

            toast.error(
                error.message || "Failed to load visits"
            );

        } finally {

            setLoading(false);

        }
    };


    // Load locations for location filter
    useEffect(() => {

        const loadLocations = async () => {

            try {

                const data = await getAllLocations();

                setLocations(data.locations || []);

            } catch (error) {

                console.error(
                    "Error loading locations:",
                    error
                );

                toast.error(
                    error.message || "Failed to load locations"
                );

            }

        };

        loadLocations();

    }, []);


    // Load visits when filters or page changes
    useEffect(() => {

        loadVisits();

    }, [status, location, page]);


    // Status filter
    const handleStatusChange = (e) => {

        setStatus(e.target.value);

        // Reset pagination when filter changes
        setPage(1);

    };


    // Location filter
    const handleLocationChange = (e) => {

        setLocation(e.target.value);

        // Reset pagination when filter changes
        setPage(1);

    };


    // View visit details
    const handleViewDetails = (id) => {

        navigate(`/getVisitById/${id}`);

    };


    // Previous page
    const handlePrevious = () => {

        if (page > 1) {

            setPage((prev) => prev - 1);

        }

    };


    // Next page
    const handleNext = () => {

        if (page < pagination.totalPages) {

            setPage((prev) => prev + 1);

        }

    };


    return (

        <div>

            {/* Page Header */}

            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">

                <div>

                    <h2 className="text-2xl font-semibold text-slate-800">
                        My Visits
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        View and manage your field visits.
                    </p>

                </div>


                {/* Create Visit */}

                {user?.role === "FIELD_OFFICER" && (

                    <button
                        onClick={() => navigate("/createVisit")}
                        className="w-full sm:w-auto px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 active:scale-[0.99] shadow-sm hover:shadow transition-all duration-200"
                    >
                        + Create Visit
                    </button>

                )}

            </div>


            {/* Filters */}

            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 mb-5">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">


                    {/* Search */}

                    <div className="relative">

                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            type="text"
                            placeholder="Search visits..."
                            className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                        />

                    </div>


                    {/* Status */}

                    <div className="relative">

                        <Filter
                            size={17}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                        />

                        <select
                            value={status}
                            onChange={handleStatusChange}
                            className="w-full appearance-none pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-700 bg-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                        >

                            <option value="">
                                All Statuses
                            </option>

                            <option value="DRAFT">
                                Draft
                            </option>

                            <option value="PENDING">
                                Pending
                            </option>

                            <option value="APPROVED">
                                Approved
                            </option>

                            <option value="REJECTED">
                                Rejected
                            </option>

                            <option value="COMPLETED">
                                Completed
                            </option>

                        </select>

                    </div>


                    {/* Location */}

                    <div>

                        <select
                            value={location}
                            onChange={handleLocationChange}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-700 bg-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                        >

                            <option value="">
                                All Locations
                            </option>

                            {locations.map((item) => (

                                <option
                                    key={item._id}
                                    value={item._id}
                                >
                                    {item.name}, {item.district}, {item.state}
                                </option>

                            ))}

                        </select>

                    </div>

                </div>

            </div>


            {/* Visit Count */}

            <div className="flex items-center justify-between mb-4">

                <p className="text-sm text-slate-500">

                    Showing{" "}

                    <span className="font-medium text-slate-700">
                        {visits.length}
                    </span>{" "}

                    visits

                </p>


                <p className="text-xs text-slate-400">

                    Page {pagination.page} of {pagination.totalPages}

                </p>

            </div>


            {/* Loading */}

            {loading ? (

                <div className="flex items-center justify-center py-16">

                    <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />

                </div>

            ) : visits.length === 0 ? (

                /* Empty State */

                <div className="bg-white border border-slate-200 rounded-xl p-10 text-center">

                    <p className="text-slate-600 font-medium">
                        No visits found
                    </p>

                    <p className="text-sm text-slate-400 mt-1">
                        Try changing your filters or create a new visit.
                    </p>

                </div>

            ) : (

                /* Visits */

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

                    {visits.map((visit) => (

                        <VisitCard
                            key={visit._id}
                            visit={visit}
                            onViewDetails={handleViewDetails}
                        />

                    ))}

                </div>

            )}


            {/* Pagination */}

            {!loading && visits.length > 0 && (

                <div className="flex items-center justify-center gap-2 mt-8">


                    {/* Previous */}

                    <button
                        onClick={handlePrevious}
                        disabled={page === 1}
                        className="flex items-center gap-1 px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                    >

                        <ChevronLeft size={16} />

                        Previous

                    </button>


                    {/* Current Page */}

                    <button
                        className="w-9 h-9 rounded-lg bg-blue-600 text-white text-sm font-medium"
                    >
                        {pagination.page}
                    </button>


                    {/* Next */}

                    <button
                        onClick={handleNext}
                        disabled={page >= pagination.totalPages}
                        className="flex items-center gap-1 px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                    >

                        Next

                        <ChevronRight size={16} />

                    </button>

                </div>

            )}

        </div>

    );
};

export default Visits;