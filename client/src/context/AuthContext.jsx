import {createContext,useContext, useState, useEffect}  from 'react';

import { registerUser, loginUser, getUserProfile, logoutUser } from '../services/authServices';

const AuthContext = createContext();

const AuthProvider= ({children})=>{
    const [user, setUser]= useState(null);
    const [loading, setLoading]= useState(true);

    // check authentication status on component mount
    const checkAuth=async()=>{
        try{
            const userProfile= await getUserProfile();
            setUser(userProfile);

        }catch(error){
            console.error("Error checking authentication status:", error);
            setUser(null);
        }finally{
            setLoading(false);
        }
    }

    // Register user
    const register =async(name, email, password,role)=>{
        try{
            const registeredUser= await registerUser(name,email,password,role);
            await checkAuth();
            return registeredUser;
        }catch(error){
            console.error("Error registering user:", error);
            throw error;
        }
    }

    // Login user
    const login = async(email,password)=>{
        try{
            const loggedInUser= await loginUser(email,password);
            await checkAuth();
            return loggedInUser;
        }catch(error){
            console.error("Error logging in user:", error);
            throw error;
        }
    }

    // Logout user
    const logout = async()=>{
        try{
            const data= await logoutUser();
            setUser(null);
            return data;
        }catch(error){
            console.error("Error logging out user:", error);
            throw error;
        }
    }

    // refresh user profile 
    const refreshUserProfile = async () => {
        await checkAuth();
    };

    useEffect(()=>{
        checkAuth();
    },[]);

    const value = {
        user,
        loading,
        register,
        login,
        logout,
        refreshUserProfile
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );

};

const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export { AuthProvider, useAuth };