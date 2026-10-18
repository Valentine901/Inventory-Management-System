import { useState, useEffect, useCallback, useContext, createContext} from "react";
import { GetItemFromLocalStorage, SaveItemToLocalStorage } from "../utils/LocalStorage";


import { API } from "../constant/api";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(() => GetItemFromLocalStorage("user") || null);
    const [loading, setLoading] = useState(false);

    const GetCurrentUser = async() => {
        setLoading(true);
        try{
            const response = await API.get("/auth/get_current_user.php");
            setUser(response.data);
            SaveItemToLocalStorage("user", response.data);
        } catch (error) {
            setUser(null);
            console.log(error.response.data.message);
        } finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        GetCurrentUser();
    }, [])

    return <AuthContext.Provider value={{user, loading}}>
        {children}
        </AuthContext.Provider>
}
export default AuthContextProvider;
export const useAuth = () => useContext(AuthContext);