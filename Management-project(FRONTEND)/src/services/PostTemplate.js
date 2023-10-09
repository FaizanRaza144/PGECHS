import { baseURL } from "../Config";
import axios from "axios";

export const PostTemplate = async (url, data) => {
    try {
        const response = await axios.post(baseURL + url, data);
        return response;
    } catch (error) {
        // Handle error
        console.error('Error:', error);
        throw error;
    }
};