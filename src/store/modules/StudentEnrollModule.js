import axiosrequest from '@/api'

const state = {  
    departments: [],
    nationality: [],
    religions: [],
    socialCategories: [],
    obcSubCat: [],
    genders: [],
    states: [],
    isDropdownSetupCompleted: false,  
    generalDetails: {
        selecetdDepartment: '',
        selectedSemester: '1',
        firstName: '',
        middleName: '',
        lastName: '',
        fatherFirstName: '',
        motherName: '',
        selectedGender: '',
        dob: '',
        formattedDOB: '',
        selectedNation: '',
        selectedReligion: '',
        selectedSocialCategory: '',
        selectedObcSub: '',
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
    async getDropdownVal() {
        const payload = {
            screenName: 'studentEnrollment'
        }
        const { data } = await axiosrequest.get('/users/getData', payload)
        console.log(data);
        return data;
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
        console.log(payload);
        commit('setDetail', payload)
        const data = await axiosrequest.post('/posts')
        console.log('printing data', data);
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
    async saveFinalDetail({commit}, request){ 
        const payload = {
            detailType: 'final',
            data: request
        } 
        commit('setDetail', payload)
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
    }
}

export default{
    namespaced: true,    
    state,
    getters,
    actions, 
    mutations
};