import {API} from "../constant/api";


export const getStats = async () => {
    const res = await API.get("/admin_stat.php");
    return res.data
}