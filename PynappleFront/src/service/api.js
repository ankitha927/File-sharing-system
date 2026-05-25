import axios from 'axios';

const API_URI = `${import.meta.env.VITE_API_URL}`;

export const uploadFile = async (data) => {
    try {
        const response = await axios.post(`${API_URI}/upload`, data);
        return response.data;
    } catch (error) {
        console.log('Error while calling the API ', error.message);
    }
}
export const tuploadFile = async (data) => {
    try {
        const response = await axios.post(`${API_URI}/tupload`, data);
        return response.data;
    } catch (error) {
        console.log('Error while calling the API ', error.message);
    }
}

export const GetLinks= async (data)=>{
    try {
        const response = await axios.post(`${API_URI}/getlinks`, data);
        return response.data;
    } catch (error) {
        console.log('Error while calling the API ', error.message);
    }
}