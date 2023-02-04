/* eslint-disable */
import axiosrequest from '@/api';
import router  from '@/router';
const state = {    
    profileData: {}
};

const getters = {  
};

const actions = { 
    async accountLogin({commit}, request){
        const { data } = await axiosrequest.post('/auth/login', request);
        commit('setProfileData', data.userDetails);
        const userDetails = {
            email: data.userDetails.email,
            username: data.userDetails.userName,
            firstName: data.userDetails.firstName,
            lastName: data.userDetails.lastName,
            roles: data.userDetails.role
        };
        localStorage.setItem('userDetails', JSON.stringify(userDetails));
        localStorage.setItem('token', data.access_token);
        router.push({name: 'home'});
    },
};

const mutations = {
    setProfileData(state, details) {
        state.profileData = details;
    }
}

export default{
    namespaced: true,    
    state,
    getters,
    actions, 
    mutations
};