const Backend_URL = import.meta.env.VITE_BACKEND_URL;

// fetch services of register user
const registerUser = async (name,email,password,role) => {
    try {
        const response = await fetch(`${Backend_URL}/api/users/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials:"include",
            body: JSON.stringify({
                name,email,password,role
            })
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Failed to register user");
        }

        return data;
    } catch (error) {
        throw new Error(error.message || "Failed to register user");
    }
};

// fetch services of login user
const loginUser = async (email, password) => {
    try {
        const response = await fetch(`${Backend_URL}/api/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials:"include",
            body:JSON.stringify({email,password})
        });

        const data = await response.json();
        if(!response.ok){
            throw new Error(data.message || "Failed to login user");
        }

        return data;
    }catch(error){
        throw new Error(error.message || "Failed to login user");
    }
};


// get userProfile
const getUserProfile = async () => {
    try {
        const response = await fetch(`${Backend_URL}/api/users/profile`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Failed to get user profile");
        }

        return data;
    } catch (error) {
        throw new Error(error.message || "Failed to get user profile");
    }
};


// logout user
const logoutUser = async () => {
    try {
        const response = await fetch(`${Backend_URL}/api/users/logout`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Failed to logout user");
        }

        return data;
    } catch (error) {
        throw new Error(error.message || "Failed to logout user");
    }
};

// forgot password
const forgotPassword = async (email) => {
    try {
        const response = await fetch(`${Backend_URL}/api/users/forgotPassword`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                email
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || "Failed to send verification code"
            );
        }

        return data;
    } catch (error) {
        throw new Error(
            error.message || "Failed to send verification code"
        );
    }
};


// verify password reset code
const verifyPassword = async (email, code) => {
    try {
        const response = await fetch(`${Backend_URL}/api/users/verifyPassword`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                email,
                code
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || "Failed to verify code"
            );
        }

        return data;
    } catch (error) {
        throw new Error(
            error.message || "Failed to verify code"
        );
    }
};


// update password
const updateLogin = async (password, confirmPassword) => {
    try {
        const response = await fetch(`${Backend_URL}/api/users/updateLogin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                password,
                confirmPassword
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || "Failed to update password"
            );
        }

        return data;
    } catch (error) {
        throw new Error(
            error.message || "Failed to update password"
        );
    }
};

export {
    registerUser,
    loginUser,
    getUserProfile,
    logoutUser,
    forgotPassword,
    verifyPassword,
    updateLogin
};