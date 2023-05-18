import axios from "axios";




const api = axios.create({
    baseURL:"http://localhost:3000/api"
});



export const Reg = async (Inscription)  =>{
        const res = await api.post('/auth/reg',Inscription)
        return res.data;
}
export const log = async (Inscription)  =>{
    const res = await api.post('/auth/login',Inscription)
    return res.data;
}