import React, { createContext, useState, useEffect} from 'react';


interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
};


export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC = ({children}: any) => {
    const [ isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('accessTokenU');
        if(token) {
            setIsAuthenticated(true);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated}} >
            { children }
        </AuthContext.Provider>
    )
}