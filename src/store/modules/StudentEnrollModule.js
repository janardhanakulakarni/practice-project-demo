import axiosrequest from '@/api'

const state = {    
    generalDetails: {
        selecetdDepartment: '',
        selectedSemester: '1',
        firstName: '',
        middleName: '',
        lastName: '',
        fatherFirstName: '',
        fatherMiddleName: '',
        fatherLastName: '',
        motherFirstName: '',
        motherMiddleName: '',
        motherLastName: '',
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
        residentailAddress: '',
        studentPhNumber: '',
        studentEmailId: '',
        city: '',
        selectedState: '',
        permanentAddress: '',
        parentPhNumber: '',
        parentEmailId: '',
        selectedDistrict: '',
        zipcode: ''
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
    setDetail(state, payload) {
        if (payload.detailType === 'general') state.generalDetails = payload.data;
        if (payload.detailType === 'contact') state.contactDetails = payload.data
        if (payload.detailType === 'academic') state.academicDetails = payload.data
        if (payload.detailType === 'bank') state.bankDetails = payload.data
        if (payload.detailType === 'final') state.finalDetails = payload.data
    }
}

export default{
    namespaced: true,    
    state,
    getters,
    actions, 
    mutations
};