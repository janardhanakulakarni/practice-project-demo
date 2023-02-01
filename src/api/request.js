import axios from "axios";

const baseURL = "http://jsonplaceholder.typicode.com";
const contentType = {
    json: 'application/json',
    form: 'multipart/form-data',
    octet: 'application/octet-stream'
};

const axiosInstance = axios.create({
    baseURL,
    headers: {
        Accept: contentType.json,
        'Content-Type': contentType.json,
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
    get: (url, param) => axiosInstance.get(url, { param }),
    post: (url, body) => axiosInstance.get(url, { body }),
    put: (url, body) => axiosInstance.get(url, { body }),
    patch: (url, body) => axiosInstance.get(url, { body }),
    del: url => axiosInstance.get(url),
}

export default request