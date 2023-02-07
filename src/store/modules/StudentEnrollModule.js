import axiosrequest from '@/api'

const state = {  
    departments: [],
    nationality: [],
    religions: [],
    socialCategories: [],
    semesters: [],
    obcSubCat: [],
    genders: [],
    states: [],
    isDropdownSetupCompleted: false,  
    generalDetails: {
        selectedDepartment: '',
        department: '',
        selectedSemester: '1',
        semester: '',
        firstName: '',
        middleName: '',
        lastName: '',
        fatherName: '',
        motherName: '',
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
        castCertificateNumber: '' 
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
    academicDetails: {
        sslcRegNum: '',
        pucRegNum: '',
        diplomaRegNum: '',
        seatType: '',
        sslcResult: '',
        pucResult: '',
        diplomaResult: '',
        admissionQuota: '',
    },
    bankDetails: {
        accNumber: '',
        bankName: '',
        bankIfsc: '',
    },
    finalDetails: {},
};

const getters = {
    getStudentDropDownValues: (state) => {
        const obj = {
            'dept': state.departments,
            'gender': state.genders,
            'nationality': state.nationality,
            'obcsub': state.obcSubCat,
            'religion': state.religions, 
            'social': state.socialCategories, 
            'sem': state.semesters,
            'state': state.states
        }
        return obj;
    },
    getDropDownCompletedVal: (state) => {
        return state.isDropdownSetupCompleted;
    },
    getGeneralDetails: (state) => {
        return state.generalDetails;
    },
    getContactDetails: (state) => {
        return state.contactDetails;
    },
    getAcademicDetails: (state) => {
        return state.academicDetails;
    },
    getBankDetails: (state) => {
        return state.bankDetails;
    }
};

const actions = {
    async getDropdownVal({commit}) {
        try {
            commit('Common/setLoadingToTrue', null, {root : true});
            const payload = {
                screenName: 'userRegistration'
            }
            const { data } = await axiosrequest.get('/users/getData', payload)
            console.log(data);
            return data;
        } catch (err) {
            console.error(err);
            commit('Common/setLoadingToTrue', null, {root : true});
        }
    },
    async dispatchDropdown({commit}, payload) {
        commit('setStudentDropDownVal', payload);
    },
    async dropdownSetupCompleted({commit}) {
        commit('setDropDownSetupCompleted');
    },
    async saveGeneralDetail({commit}, request){
        const payload = {
            detailType: 'general',
            data: request
        }
        commit('setDetail', payload)
    },
    async saveContactDetail({commit}, request){
        const payload = {
            detailType: 'contact',
            data: request
        } 
        commit('setDetail', payload)
    },
    async saveAcademicDetail({commit}, request){ 
        const payload = {
            detailType: 'academic',
            data: request
        } 
        commit('setDetail', payload)
    },
    async saveBankDetail({commit}, request){ 
        const payload = {
            detailType: 'bank',
            data: request
        } 
        commit('setDetail', payload)
    },
    async enrollStudent({commit}, payload) {
        try {
            commit('Common/setLoadingToTrue', null, {root : true});
            const { data } = await axiosrequest.post('/students/addStudent', payload)
            return data;
        } catch (err) {
            console.error(err);
            commit('Common/setLoadingToFalse', null, {root : true});
        }
    },
    destroyStudentData({commit}, str = null) {
        commit('resetStudentData', str);
    }   
};

const mutations = {
    setStudentDropDownVal(state, payload) {
        if (payload.name === 'dept') state.departments = payload.arr;
        else if (payload.name === 'gender') state.genders = payload.arr;
        else if (payload.name === 'nationality') state.nationality = payload.arr;
        else if (payload.name === 'obcsub') state.obcSubCat = payload.arr;
        else if (payload.name === 'religion') state.religions = payload.arr;
        else if (payload.name === 'social') state.socialCategories = payload.arr;
        else if (payload.name === 'sem') state.semesters = payload.arr;
        else if (payload.name === 'state') state.states = payload.arr;

    },
    setDropDownSetupCompleted(state) {
        state.isDropdownSetupCompleted = true;
    },
    setDetail(state, payload) {
        if (payload.detailType === 'general') state.generalDetails = payload.data;
        if (payload.detailType === 'contact') state.contactDetails = payload.data
        if (payload.detailType === 'academic') state.academicDetails = payload.data
        if (payload.detailType === 'bank') state.bankDetails = payload.data
    },
    resetStudentData(state, val) {
        Object.keys(state.generalDetails).forEach((key) => {
            state.generalDetails[key] = '';
        });
        Object.keys(state.contactDetails.residentialAddress).forEach((key) => {
            state.contactDetails.residentialAddress[key] = '';
        });
        Object.keys(state.contactDetails.permanentAddress).forEach((key) => {
            state.contactDetails.permanentAddress[key] = '';
        });
        Object.keys(state.academicDetails).forEach((key) => {
            state.academicDetails[key] = '';
        });
        Object.keys(state.bankDetails).forEach((key) => {
            state.bankDetails[key] = '';
        });
        if (val === 'clearDropdown') {
            state.departments = [];
            state.nationality = [];
            state.religions = [];
            state.socialCategories = [];
            state.obcSubCat = [];
            state.genders = [];
            state.states = [];
            state.semesters = [];
            state.isDropdownSetupCompleted = false;
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