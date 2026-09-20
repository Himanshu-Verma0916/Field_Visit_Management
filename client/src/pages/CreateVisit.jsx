import { MapPin, CalendarDays, IndianRupee, FileText } from "lucide-react";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { createVisit, getAllLocations } from "../services/visitServices";


const CreateVisit = () => {

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [purpose, setPurpose] = useState("");
    const [location, setLocation] = useState("");
    const [locations, setLocations] = useState([]);
    const [plannedDate, setPlannedDate] = useState("");
    const [estimatedCost, setEstimatedCost] = useState("");

    const [loading, setLoading] = useState(false);


    const handleCreateVisit = async (e) => {

        e.preventDefault();

        try {

            // Validate form
            if (
                !title.trim() ||
                !purpose.trim() ||
                !location ||
                !plannedDate ||
                !estimatedCost
            ) {
                toast.error("Please fill all fields");
                return;
            }


            setLoading(true);


            // Create visit
            await createVisit(
                title,
                purpose,
                location,
                plannedDate,
                estimatedCost
            );


            // Show success message
            toast.success("New visit created successfully");


            // Navigate to Visits page
            navigate("/getAllVisits");


        } catch (error) {

            console.error("Error creating visit:", error);

            toast.error(
                error.message || "Failed to create visit"
            );

        } finally {

            setLoading(false);

        }
    };


    const handleCancel = () => {
        navigate("/getAllVisits");
    };

    useEffect(() => {

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

        loadLocations();

    }, []);


    return (
        <div className="max-w-4xl">

            {/* Page Header */}
            <div className="mb-6">

                <h2 className="text-2xl font-semibold text-slate-800">
                    Create Visit
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Create a new field visit and submit it for approval.
                </p>

            </div>


            {/* Form Card */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm">

                {/* Card Header */}
                <div className="px-6 py-5 border-b border-slate-200">

                    <h3 className="text-base font-semibold text-slate-800">
                        Visit Information
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                        Enter the details of the planned field visit.
                    </p>

                </div>


                {/* Form */}
                <form
                    onSubmit={handleCreateVisit}
                    className="p-6"
                >

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        {/* Visit Title */}
                        <div className="md:col-span-2">

                            <label
                                htmlFor="title"
                                className="block text-sm font-medium text-slate-700 mb-2"
                            >
                                Visit Title
                            </label>

                            <div className="relative">

                                <FileText
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    onChange={(e) =>
                                        setTitle(e.target.value)
                                    }
                                    id="title"
                                    type="text"
                                    value={title}
                                    placeholder="Enter visit title"
                                    className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                                />

                            </div>

                        </div>


                        {/* Purpose */}
                        <div className="md:col-span-2">

                            <label
                                htmlFor="purpose"
                                className="block text-sm font-medium text-slate-700 mb-2"
                            >
                                Purpose
                            </label>

                            <textarea
                                onChange={(e) =>
                                    setPurpose(e.target.value)
                                }
                                id="purpose"
                                rows="4"
                                value={purpose}
                                placeholder="Describe the purpose of this visit"
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 outline-none resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                            />

                        </div>


                        {/* Location */}
                        <div>

                            <label
                                htmlFor="location"
                                className="block text-sm font-medium text-slate-700 mb-2"
                            >
                                Location
                            </label>

                            <div className="relative">

                                <MapPin
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <select
                                    onChange={(e) => setLocation(e.target.value)}
                                    id="location"
                                    value={location}
                                    className="w-full appearance-none pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-700 bg-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                >
                                    <option value="">
                                        Select location
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


                        {/* Planned Date */}
                        <div>

                            <label
                                htmlFor="plannedDate"
                                className="block text-sm font-medium text-slate-700 mb-2"
                            >
                                Planned Date
                            </label>

                            <div className="relative">

                                <CalendarDays
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    onChange={(e) =>
                                        setPlannedDate(e.target.value)
                                    }
                                    id="plannedDate"
                                    value={plannedDate}
                                    type="date"
                                    className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                                />

                            </div>

                        </div>


                        {/* Estimated Cost */}
                        <div>

                            <label
                                htmlFor="estimatedCost"
                                className="block text-sm font-medium text-slate-700 mb-2"
                            >
                                Estimated Cost
                            </label>

                            <div className="relative">

                                <IndianRupee
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    onChange={(e) =>
                                        setEstimatedCost(e.target.value)
                                    }
                                    id="estimatedCost"
                                    type="number"
                                    value={estimatedCost}
                                    min="0"
                                    placeholder="Enter estimated cost"
                                    className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                                />

                            </div>

                        </div>

                    </div>


                    {/* Actions */}
                    <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-7 pt-5 border-t border-slate-100">

                        {/* Cancel */}
                        <button
                            onClick={handleCancel}
                            disabled={loading}
                            type="button"
                            className="px-5 py-2.5 border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-all duration-200 disabled:opacity-50"
                        >
                            Cancel
                        </button>


                        {/* Create Visit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 active:scale-[0.99] shadow-sm hover:shadow transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading
                                ? "Creating..."
                                : "Create Visit"
                            }
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default CreateVisit;