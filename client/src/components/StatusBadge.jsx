const StatusBadge = ({ status }) => {

    const statusStyles = {
        DRAFT: {
            label: "Draft",
            className: "bg-slate-100 text-slate-700"
        },

        PENDING: {
            label: "Pending",
            className: "bg-amber-100 text-amber-700"
        },

        APPROVED: {
            label: "Approved",
            className: "bg-emerald-100 text-emerald-700"
        },

        REJECTED: {
            label: "Rejected",
            className: "bg-red-100 text-red-700"
        },

        COMPLETED: {
            label: "Completed",
            className: "bg-blue-100 text-blue-700"
        }
    };


    const currentStatus =
        statusStyles[status] || {
            label: "Unknown",
            className: "bg-slate-100 text-slate-600"
        };


    return (
        <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${currentStatus.className}`}
        >

            {/* Status Indicator */}
            <span className="w-1.5 h-1.5 rounded-full bg-current" />

            {currentStatus.label}

        </span>
    );
};

export default StatusBadge;