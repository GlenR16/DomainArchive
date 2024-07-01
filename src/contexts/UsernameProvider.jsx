import { createContext,useContext,useCallback,useMemo,useState } from "react";

var dbUsername = localStorage.getItem("username") || null;
    
const UsernameContext = createContext(dbUsername);

export function useUsername() {
    const username = useContext(UsernameContext);
    return username;
}

export function UsernameProvider({ children }) {
    const [username, setUsername] = useState(dbUsername);

    const updateUsername = useCallback((username) => {
        if (!username){
            throw Error("Name cannot be empty!")
        }
        localStorage.setItem("username", username);
        setUsername(username);
    }, []);

    const clearUsername = useCallback(() => {
        localStorage.removeItem("username");
        setUsername(null)
    }, []);

    const value = useMemo(
        () => ({ username, updateUsername, clearUsername }),
        [username, updateUsername,clearUsername]
    );

    return (
        <UsernameContext.Provider value={value}>
            {children}
        </UsernameContext.Provider>
    );
}