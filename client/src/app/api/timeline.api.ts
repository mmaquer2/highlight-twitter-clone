
import axios from "axios";

/* 
* contains all the api calls related to timeline component
*
*/


const api = axios.create({ 
    baseURL: "http://localhost:3001",
    withCredentials: true,
});


export const generateTimeline = async () => {
    console.log("generate timeline api route called");
    try {
        const response = await api.get('/api/timeline/generate');
        return response.data;
    } catch(err)
        {console.log(err)
    }
};


export const updateTimeline = async () => {
    console.log("update timeline api route called");
    try {
        const response = await api.get('/api/timeline/update');
        return response.data;
    } catch(err) {console.log(err)}
};