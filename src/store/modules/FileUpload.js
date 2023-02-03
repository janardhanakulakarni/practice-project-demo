/* eslint-disable */
import { storage } from './../../api/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
const state = {     

};

const getters = {  
};

const actions = { 
    async uploadFile({commit}, request){
        const storageRef = ref(storage, request.folderAndName);
        uploadBytes(storageRef, request.fileBlob).then(
            (snapshot) => {
                console.log('uplaoded', snapshot);
            }
        )
    },
    async getFile({commit},request) {
        let url = ''
        await getDownloadURL(ref(storage, request.folderAndName)).then(
            (download_url) => {
                url = download_url
            }
        )
        return url;
    }
};

const mutations = {
}

export default{
    namespaced: true,    
    state,
    getters,
    actions, 
    mutations
};