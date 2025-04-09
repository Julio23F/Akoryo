import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";


export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isAuthentificated, setIsAuthentificated] = useState(undefined);

    useEffect(() => {

        // setTimeout(() => {
        //     setIsAuthentificated(true);
        // }, 3000)
        // setIsAuthentificated(false);
        const unsub = onAuthStateChanged(auth, (user) => {
            if(user) {
                setIsAuthentificated(true);
                setUser(user);
            }
            else{
                setIsAuthentificated(false);
                setUser(null);
            }
        });
        return unsub;

    }, []);

    const login = async (email, password) => {
        try {
            
        } catch (error) {
            
        }
    }

    const register = async (username, email, password) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log("response.createUser", response.user);

            // setIsAuthentificated(true);
            // setUser(user);

            await setDoc(doc(db, "users", response.user.uid), {
                username,
                userid: response.user.uid
            });

            return {succes: true, data: response.user}

        } catch (error) {
            return {succes: false, data: error.message}
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
