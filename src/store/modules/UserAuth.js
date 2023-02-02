import axiosrequest from '@/api'
const state = {    

};

const getters = {  
};

const actions = { 
    async accountLogin({commit}, request){
        console.log(commit);
        const data = await axiosrequest.post('/auth/login', request)
        console.log('printing data', data);
    },
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