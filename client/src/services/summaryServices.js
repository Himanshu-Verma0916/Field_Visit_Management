const Backend_URL = import.meta.env.VITE_BACKEND_URL;

// get summary

const getSummary = async () => {
    try {
        const response = await fetch(`${Backend_URL}/api/summary`, {
            method: "GET",
            credentials: "include"
        });

        const data= await response.json();

        if(!response.ok){
            throw new Error(data.message || "Failed to fetch summary");
        }

        return data;

    } catch (error) {
        console.error("Error fetching summary:", error);
        throw error;
    }
}

export {getSummary};