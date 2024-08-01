// src/contexts/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../utils/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);
                try {
                    const response = await axios.get(`https://26dcb711-8128-4562-903e-5e90ce17012c-00-2oc5jhzdfapax.pike.replit.dev/students/${user.uid}`);
                    setProfileData(response.data);
                } catch (error) {
                    console.error('Error fetching profile data:', error);
                }
            } else {
                setUser(null);
                setProfileData(null);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, profileData, setProfileData }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
