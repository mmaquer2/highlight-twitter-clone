import axios from "axios";

const api = axios.create({ 
    baseURL: "http://localhost:3001",
    withCredentials: true,
});


export const createPost = async (post:any) => {
    try {
        const response = await api.post('/posts', post);
        return response.data;
    } catch(err){
        console.log(err)
    }
};


export const fetchPosts = async (user_id:string) => {
    try {
        const response = await api.get('/posts');
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export const deleteUserPost = async (post_id:string) => {
    try{
        const response = await api.delete('/posts/:id');
        return response.data;
    } catch(err){
        console.log(err)
    }  
};