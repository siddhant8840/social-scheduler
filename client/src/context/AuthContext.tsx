import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

interface User {
    _id: string;
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    login: (userData: User, token: string)=> void;
    logout: () => void;
     isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({children})=>{

    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        const storedUser = sessionStorage.getItem("user");
        const storedToken = sessionStorage.getItem("token");

        if(storedUser && storedToken){
            setUser(JSON.parse(storedUser))
            setToken(storedToken)
            api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
        }

        setIsLoading(false)
    },[])

    const login = (userData: User, newToken: string)=>{
        setUser(userData)
        setToken(newToken)
        sessionStorage.setItem("user", JSON.stringify(userData))
        sessionStorage.setItem("token", newToken)
        api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
    }

    const logout = ()=>{
        setUser(null)
        setToken(null)
        sessionStorage.removeItem("user")
        sessionStorage.removeItem("token")
        delete api.defaults.headers.common["Authorization"];
    }

    return <AuthContext.Provider value={{user, token, isLoading, login, logout, isAuthenticated: !!token}}>
        {children}
    </AuthContext.Provider>

}

export const useAuth = ()=>{
    const context = useContext(AuthContext);
    if(context === undefined){
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
    
