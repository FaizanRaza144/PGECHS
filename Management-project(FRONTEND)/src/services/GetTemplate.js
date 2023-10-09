import { baseURL } from "../Config";
import axios from "axios";

export const GetTemplate = async (url) => {
    try {
        const response = await axios.get(baseURL + url);
        return response;
    } catch (error) {
        // Handle error
        console.error('Error:', error);
        throw error;
    }
};
