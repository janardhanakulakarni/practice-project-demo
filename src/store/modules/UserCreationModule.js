/* eslint-disable */
import axiosrequest from '@/api'
const state = {
    departments: [],
    nationality: [],
    religions: [],
    socialCategories: [],
    obcSubCat: [],
    genders: [],
    maritalStatus: [],
    roles: [],
    titles: [],
    qualifications: [],
    states: [],
    isDropdownSetupCompleted: false,
    generalDetails: {
        selectedQualification: '',
        qualification: '',
        selectedDepartment: '',
        department: '',
        selectedMaritalStatus: '',
        mariageStatus: '',
        selectedTitle: '',
        title: '',
        selectedRole: '',
        role: '',
        firstName: '',
        middleName: '',
        lastName: '',
        selectedGender: '',
        gender: '',
        dob: '',
        formattedDOB: '',
        selectedNation: '',
        nation: '',
        selectedReligion: '',
        religion: '',
        selectedSocialCategory: '',
        socialCategory: '',
        selectedObcSub: '',
        obcSub: '',
        username: '',
        userEmail: '',
        password: ''
    },
    contactDetails: {
        residentialAddress: {
            address: '',
            userPhNum: '',
            city: '',
            selectedDistrict: '',
            district: '',
            selectedState: '',
            state: '',
            zipcode: ''
        },
        permanentAddress: {
            address: '',
            userPhNum: '',
            city: '',
            selectedDistrict: '',
            district: '',
            selectedState: '',
            state: '',
            zipcode: ''
        },
    },
    finalDetails: {},
};

const getters = {
    getUserDropDownValues: (state) => {
        const obj = {
            'dept': state.departments,
            'gender': state.genders,
            'nationality': state.nationality,
            'obcsub': state.obcSubCat,
            'quali': state.qualifications,
            'maritalStatus': state.maritalStatus,
            'religion': state.religions, 
            'role': state.roles, 
            'social': state.socialCategories, 
            'title': state.titles,
            'state': state.states
        }
        return obj;
    },
    getDropDownCompletedVal: (state) => {
        return state.isDropdownSetupCompleted;
    },
    getUserGeneralDetails: (state) => {
        return state.generalDetails;
    },
    getUserContactDetails: (state) => {
        return state.contactDetails;
    }
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
    async dispatchDropdown({commit}, payload) {
        commit('setUserDropDownVal', payload);
    },
    async dropdownSetupCompleted({commit}) {
        commit('setDropDownSetupCompleted');
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
    async registerUser({commit}, payload) {
        const data = await axiosrequest.post('/auth/register', payload)
        console.log(data.json());
        return data;
    }
};

const mutations = {
    setUserDropDownVal(state, payload) {
        if (payload.name === 'dept') state.departments = payload.arr;
        else if (payload.name === 'gender') state.genders = payload.arr;
        else if (payload.name === 'nationality') state.nationality = payload.arr;
        else if (payload.name === 'obcsub') state.obcSubCat = payload.arr;
        else if (payload.name === 'quali') state.qualifications = payload.arr;
        else if (payload.name === 'religion') state.religions = payload.arr;
        else if (payload.name === 'maritalStatus') state.maritalStatus = payload.arr;
        else if (payload.name === 'role') state.roles = payload.arr;
        else if (payload.name === 'social') state.socialCategories = payload.arr;
        else if (payload.name === 'state') state.states = payload.arr;
        else if (payload.name === 'title')state.titles = payload.arr;

    },
    setDropDownSetupCompleted(state) {
        state.isDropdownSetupCompleted = true;
    },
    setUserDetail(state, payload) {
        if (payload.detailType === 'general') state.generalDetails = payload.data;
        if (payload.detailType === 'contact') {
            state.contactDetails['residentialAddress'] = payload.data['residentialAddress'];
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