import { baseURL } from "../Config";
import axios from "axios";


export const DeleteTemplate = async (url) => {
    try {
        const response = await axios.post(baseURL + url);
        return response;
    } catch (error) {
        // Handle error
        console.error('Error:', error);
        throw error;
    }
};