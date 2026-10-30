import { useState, useEffect, useCallback, useContext, createContext} from "react";
import { GetItemFromLocalStorage, SaveItemToLocalStorage, ClearLocalStorage } from "../utils/LocalStorage";


import { API } from "../constant/api";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(() => GetItemFromLocalStorage("user") || null);
    const [loading, setLoading] = useState(false);

    const GetCurrentUser = async() => {
        setLoading(true);
        try{
            const response = await API.get("/auth/get_current_user.php");
            setUser(response.data.data);
            SaveItemToLocalStorage("user", response.data.data);
        } catch (error) {
            setUser(null);
            console.log(error.response.data.message);
        } finally{
            setLoading(false);
        }
    }

    const Signout = async () => {
        setLoading(true);
        try{
            await API.post("/auth/logout.php");
            setUser(null);
            ClearLocalStorage("user");
        } catch (err) {
            setUser(null);
            ClearLocalStorage("user");
        } finally{setLoading(false)}
    }

    useEffect(() => {
        GetCurrentUser();
    }, [])

    return <AuthContext.Provider value={{user, loading, Signout, loading, GetCurrentUser}}>
        {children}
        </AuthContext.Provider>
}
export default AuthContextProvider;
export const useAuth = () => useContext(AuthContext);