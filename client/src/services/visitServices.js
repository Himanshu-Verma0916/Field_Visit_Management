const Backend_URL = import.meta.env.VITE_BACKEND_URL;
// create visit
const createVisit =async(title, purpose, location, plannedDate, estimatedCost)=>{
    try{

        const response = await fetch(`${Backend_URL}/api/visits/createVisit`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify({title, purpose, location, plannedDate, estimatedCost})

        });
        const data = await response.json();
        if(!response.ok) {
            throw new Error(data.message || "Failed to create visit");
        }
        return data;
    }catch(error){
        console.error("Error creating visit:", error);
        throw error;
    }
}

// get all visits

const getAllVisits = async (status="",location="", page=1, limit=10) => {
    try {

        const params=new URLSearchParams();
        if(status){
            params.append("status",status);
        }
        
        if(location){
            params.append("location",location);
        }

        params.append("page",page);
        params.append("limit",limit);
        const response = await fetch(`${Backend_URL}/api/visits/getAllVisits?${params.toString()}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });
        const data = await response.json();
        if(!response.ok) {
            throw new Error(data.message || "Failed to fetch visits");
        }
        return data;
    } catch (error) {
        console.error("Error fetching visits:", error);
        throw error;
    }
}

// get visit by id
const getVisitById = async (id) => {
    try {
        const response = await fetch(`${Backend_URL}/api/visits/getVisitById/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });
        const data = await response.json();
        if(!response.ok) {
            throw new Error(data.message || "Failed to fetch visit");
        }
        return data;
    }catch(error){
        console.error("Error fetching visit:", error);
        throw error;
    }
};


// update visit
const updateVisit = async (id, title, purpose, location, plannedDate, estimatedCost) => {
    try {
        const response = await fetch(`${Backend_URL}/api/visits/updateVisit/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({ title, purpose, location, plannedDate, estimatedCost })
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Failed to update visit");
        }
        return data;
    } catch (error) {
        console.error("Error updating visit:", error);
        throw error;
    }
};

// submit visit for approval
const submitVisitForApproval = async (id) => {
    try {
        const response = await fetch(`${Backend_URL}/api/visits/submitVisitForApproval/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Failed to submit visit for approval");
        }
        return data;
    } catch (error) {
        console.error("Error submitting visit for approval:", error);
        throw error;
    }
};

// decide visit reject or approve
const decideVisit = async (id, decision,remark) => {
    try{
        const response =await fetch(`${Backend_URL}/api/visits/decideVisit/${id}`,{
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",

            body: JSON.stringify({
                decision,remark
            })

        });

        const data=await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Failed to submit visit for approval");
        }
        return data;


    }catch(error){
        console.error("Error submitting visit for approval:", error);
        throw error;
    }
}

// complete visit

const completeVisit=async(id)=>{
    try{
        const response= await fetch(`${Backend_URL}/api/visits/completeVisit/${id}`,{
            method:"POST",
            credentials:"include"
        });

        const data= await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Failed to submit visit for approval");
        }
        return data;
        

    }catch(error){
        console.error("Error submitting visit for approval:", error);
        throw error;
    }
}

const getAllLocations = async () => {

    const response = await fetch(
        `${Backend_URL}/api/locations/getAllLocations`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to fetch locations"
        );
    }

    return data;
};

export {createVisit,getAllVisits,getVisitById,updateVisit,submitVisitForApproval,decideVisit,completeVisit, getAllLocations };
