import { createContext, useContext, useEffect, useState } from "react";


export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isAuthentificated, setIsAuthentificated] = useState(undefined);

    useEffect(() => {

        // setTimeout(() => {
        //     setIsAuthentificated(true);
        // }, 3000)
        setIsAuthentificated(false);

    }, []);

    const login = async (email, password) => {
        try {
            
        } catch (error) {
            
        }
    }

    const register = async (username, email, password) => {
        try {
            
        } catch (error) {
            
        }
    }

    const logout = async () => {
        try {
            
        } catch (error) {
            
        }
    }


    return (
        <AuthContext.Provider value={{user, isAuthentificated, login, register, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuh = () => {
    const value = useContext(AuthContext);


    if(!value) {
        throw new Error("useAuth must be wrapped inside AuthContextProvider");
    }

    return value;
}
