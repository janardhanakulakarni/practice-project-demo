<template>
    <div>   
        <v-dialog
        v-model="showSelectionDailog"
        persistent
        max-width="600"
        class="ma-5"
        >
        <v-card>
            <v-card-title class="text-h5">
            Please select which user you want to create ?
            </v-card-title>
            <v-card-text>By selecting any option, with respect to that the user/account will get created.</v-card-text>
                <v-radio-group
                    v-model="selectedUserType"
                    column
                    class="ml-5"
                >
                    <v-radio
                        label="Admin"
                        color="primary"
                        value="1"
                    ></v-radio>
                    <v-radio
                        label="HOD (Head of the Dept)"
                        color="primary"
                        value="2"
                    ></v-radio>
                    <v-radio
                        label="Teaching Staff"
                        color="primary"
                        value="3"
                    ></v-radio>
                    <v-radio
                        label="Accountant"
                        color="primary"
                        value="4"
                    ></v-radio>
                    <v-radio
                        label="Hostel HM"
                        color="primary"
                        value="5"
                    ></v-radio>
                </v-radio-group>
            <v-card-text v-if="typeNotSelected" class="mt-n3"><span class="err-text font-weight-bold">Please select atleast one option</span></v-card-text>
            <!-- <v-card-text v-if="showWarning" class="mt-n3"><span class="warning-text font-weight-bold">Note: Integration in process</span></v-card-text> -->
            <v-spacer></v-spacer>
            <v-card-actions>
            <v-btn
                color="red darken-1"
                text
                @click="showSelectionDailog = false"
            >
                Cancel
            </v-btn>
            <v-btn
                color="green darken-1"
                text
                @click="onSelectType"
            >
                Continue
            </v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
        <div style="width: 95vw" class="ma-7">
            <v-tabs
            v-model="selectedTab"
            background-color="#85B09A"
            centered
            class="tab-radius"
            dark
            icons-and-text
            >
            <v-tab
                v-for="item in tabItems"
                :key="item"
                disabled
            >
                {{ item }}
            </v-tab>
            </v-tabs>

            <v-tabs-items v-model="selectedTab" color="orange" class="tab-item-radius">
                <v-tab-item> 
                    <user-general-details @onClickContinue="nextPage"/>
                </v-tab-item>
                <v-tab-item> 
                    <user-contact-details @onClickFinish="createUserWithDetails" @onClickPrevious="previousPage"/>
                </v-tab-item>
            </v-tabs-items>
        </div>
    </div>
</template>
<style scoped>
.tab-radius {
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}
.tab-item-radius {
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  min-height: 60vh;
}
::v-deep .theme--dark.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active), .theme--dark.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active) > .v-icon, .theme--dark.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active) > .v-btn, .theme--dark.v-tabs > .v-tabs-bar .v-tab--disabled {
    color: #333333;
    font-weight: bolder;
}
</style>
<script>
/* eslint-disable */

import UserGeneralDetails from './../components/UserGeneralDetails.vue'
import UserContactDetails from './../components/UserContactDetails.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
    components: {
        UserGeneralDetails,
        UserContactDetails,
    },
    name: 'CreateUser',
    data: () =>  ({
        showSelectionDailog: false,
        selectedUserType: '',
        typeNotSelected: false,
        selectedTab: 0,
        tabItems: [
          'General Details', 'Contact Details'
        ],
        // showWarning: false
    }),
    computed: {
        ...mapGetters('UserCreationModule', ['getUserGeneralDetails', 'getUserContactDetails'])
    },
    methods: {
        ...mapActions('UserCreationModule', ['getDropDownVals', 'dispatchDropdown', 'dropdownSetupCompleted', 'registerUser', 'destroyUserData']),
        async getAllDropDownVals() {
           const data = await this.getDropDownVals();
           const arrList = ['dept', 'gender', 'nationality', 'maritalStatus', 'obcsub', 'quali', 'religion', 'role', 'social', 'title', 'state'];
           arrList.forEach((item) => {
                if (item === 'dept') this.setDropDown(data.data.department, 'dept');
                else if (item === 'gender') this.setDropDown(data.data.gender, 'gender');
                else if (item === 'nationality') this.setDropDown(data.data.nationality, 'nationality');
                else if (item === 'obcsub') this.setDropDown(data.data.obcsubcategory, 'obcsub');
                else if (item === 'maritalStatus') this.setDropDown(data.data.maritalStatus, 'maritalStatus');
                else if (item === 'quali') this.setDropDown(data.data.qualification, 'quali');
                else if (item === 'religion') this.setDropDown(data.data.religion, 'religion');
                else if (item === 'role') this.setDropDown(data.data.role, 'role');
                else if (item === 'social') this.setDropDown(data.data.socialcategory, 'social');
                else if (item === 'state') this.setDropDown(data.data.states, 'state');
                else if (item === 'title') {
                    this.setDropDown(data.data.title, 'title');
                    this.dropdownSetupCompleted();
                }
           });
        },
        async setDropDown(arr, name) {
            let dropDownArr = [];
            if(name === 'state') {}
            arr.forEach((item) => {
                const obj = {
                    id: item.code,
                    name: item.value
                }
                if(name === 'state') {
                    obj.districts = item.districts;
                    obj.id = item.valueRef
                }
                dropDownArr.push(obj);
            })
            const req = {
                name: name,
                arr: dropDownArr
            }
            await this.dispatchDropdown(req);
        },
        onSelectType() {
            console.log(this.selectedUserType);
            if (this.selectedUserType === '') this.typeNotSelected =true;
            else this.showSelectionDailog = false;

        },
        nextPage() {
        this.selectedTab += 1;
        },
        previousPage() {
            this.selectedTab -= 1;
        },
        async createUserWithDetails() {
            const genDetails = this.getUserGeneralDetails;
            const contactDetails = this.getUserContactDetails;
            const base32 = require('hi-base32');
                const hashedPw = base32.encode(genDetails.password);
            const chunks = [];
            for (let i = 0; i<hashedPw.length; i += 4 ) {
                chunks.push(hashedPw.substring(i, i + 4));
            }
            encPW = chunks.join('-');
            const requestBody = {
                firstName: genDetails.firstName,
                middleName: genDetails.middleName,
                lastName: genDetails.lastName,
                title: genDetails.title,
                titleCode: genDetails.selectedTitle,
                userName: genDetails.userEmail,
                genderCode: genDetails.selectedGender,
                gender: genDetails.gender,
                contactNo: contactDetails.residentialAddress.userPhNum,
                email: genDetails.userEmail,
                password: encPW,
                role: genDetails.role,
                roleCode: genDetails.selectedRole,
                maritalStatus: genDetails.mariageStatus,
                maritalStatusCode: genDetails.selectedMaritalStatus,
                qualification: genDetails.qualification,
                qualificationCode: genDetails.selectedQualification,
                department: genDetails.department,
                departmentCode: genDetails.selectedDepartment,
                nationality: genDetails.nation,
                religion: genDetails.religion,
                religionCode: genDetails.selectedReligion,
                socialCategory: genDetails.socialCategory,
                socialCategoryCode: genDetails.selectedSocialCategory,
                obcSubCategory: genDetails.selectedObcSub,
                obcSubCategory: genDetails.obcSub,
                residentialAddress: {
                    address: contactDetails.residentialAddress.address,
                    state: contactDetails.residentialAddress.state,
                    stateRef: contactDetails.residentialAddress.selectedState,
                    districtRef: contactDetails.residentialAddress.selectedDistrict,
                    city: contactDetails.residentialAddress.city,
                    zipCode: contactDetails.residentialAddress.zipcode
                },
                permanentAddress: {
                    address: contactDetails.permanentAddress.address,
                    state: contactDetails.permanentAddress.state,
                    stateRef: contactDetails.permanentAddress.selectedState,
                    districtRef: contactDetails.permanentAddress.selectedDistrict,
                    district: contactDetails.permanentAddress.district,
                    city: contactDetails.permanentAddress.city,
                    zipCode: contactDetails.permanentAddress.zipcode
                }
            }
            const data = await this.registerUser(requestBody);
            console.log(data);
        }
    },
    created() {
        this.getAllDropDownVals();
    },
    destroyed() {
        this.destroyUserData('all')
    }
}
</script>
