import axios from "axios";

const baseURL = "https://hippo-nightgown.cyclic.app/api";
// const contentType = {
//     json: 'application/json',
//     form: 'multipart/form-data',
//     octet: 'application/octet-stream'
// };

const axiosInstance = axios.create({
    baseURL,
    headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}` ,
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    transformResponse: [
        apiResponse => {
            if(apiResponse) {
                const  data  = JSON.parse(apiResponse)
                return data
            }
            return apiResponse
        }
    ]
})

const request = {
    get: (url, body) => axiosInstance.get(url, body),
    post: (url, body) => axiosInstance.post(url, body),
    put: (url, body) => axiosInstance.get(url, { body }),
    patch: (url, body) => axiosInstance.get(url, { body }),
    del: url => axiosInstance.get(url),
}

export default request