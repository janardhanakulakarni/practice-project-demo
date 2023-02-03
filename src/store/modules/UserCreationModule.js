import axiosrequest from '@/api'
const state = {    
    generalDetails: {
        selecetdDepartment: '',
        selectedTitle: '',
        selectedRole: '',
        firstName: '',
        middleName: '',
        lastName: '',
        selectedGender: '',
        dob: '',
        formattedDOB: '',
        selectedNation: '',
        selectedReligion: '',
        selectedSocialCategory: '',
        selectedObcSub: '',
        userEmail: '',
        password: ''
    },
    contactDetails: {
        residentailAddress: {
            address: '',
            userEmailId: '',
            userPhNum: '',
            city: '',
            selectedDistrict: '',
            selectedState: '',
            zipcode: ''
        },
        permanentAddress: {
            address: '',
            userEmailId: '',
            userPhNum: '',
            city: '',
            selectedDistrict: '',
            selectedState: '',
            zipcode: ''
        },
    },
    finalDetails: {},
};

const getters = {  
    getUserGeneralDetails: (state) => {
        return state.generalDetails;
    },
    getUserContactDetails: (state) => {
        return state.contactDetails;
    },
};

const actions = { 
    async getDropDownVals(nameOfScreen) {
        const payload = {
            screenName: nameOfScreen
        }
        const { data } = await axiosrequest.get('/users/getData', payload)
        console.log(data);
        return data;
    },
    async saveUserGeneralDetail({commit}, request){
        const payload = {
            detailType: 'general',
            data: request
        }
        console.log(payload);
        commit('setUserDetail', payload)
    },
    async saveUserContactDetail({commit}, request){
        const payload = {
            detailType: 'contact',
            data: request
        } 
        commit('setUserDetail', payload)
    },
};

const mutations = {
    setUserDetail(state, payload) {
        if (payload.detailType === 'general') state.generalDetails = payload.data;
        if (payload.detailType === 'contact') {
            state.contactDetails['residentailAddress'] = payload.data['residentailAddress'];
            state.contactDetails['permanentAddress'] = payload.data['permanentAddress'];
        }
    }
}

export default{
    namespaced: true,    
    state,
    getters,
    actions, 
    mutations
};