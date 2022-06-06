import {BASE_API_URL} from "./baseApiUrl";
import axios from "axios";

export const uploadImage = (file) => {
    const formData = new FormData()
    formData.append('upload', file)
    return axios.post(BASE_API_URL + "/images", formData, {
        headers: {
            "Content-Type": 'multipart/form-data',
        }
    })
}