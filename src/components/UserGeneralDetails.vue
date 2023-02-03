<template>
    <div>
        <v-row justify="center" class="px-16 mt-10">
            <v-col cols="4">
                <!-- <div class="label-text">Department</div> -->
                <v-form ref="firstNameForm" v-model="valid" lazy-validation @submit.prevent="compltedFirstStep">
                    <v-row>
                        <!-- <img style="height: 20vh; width: 10vw" :src="url" alt=""
                        />
                        <input 
                            type="file"
                            ref="myFile"
                            @input="uploadFile"
                        />  -->
                        <v-col cols="3">
                            <v-select
                                :items="titles"
                                label="Title"
                                v-model="generalDetails.selectedTitle"
                                :menu-props="{ top: false, offsetY: true }"
                                item-value="id"
                                item-text="name"
                                :rules="titleRules"
                                @change="clickedTitle"
                                solo
                            ></v-select>
                        </v-col>
                        <v-col cols="9">
                            <v-text-field
                                label="First Name"
                                v-model="generalDetails.firstName"
                                single-line
                                :rules="fieldRules"
                                solo
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-select
                        class="mt-3"
                        :items="genders"
                        label="Gender"
                        v-model="generalDetails.selectedGender"
                        :menu-props="{ top: false, offsetY: true }"
                        item-value="id"
                        :rules="selectRules"
                        item-text="name"
                        solo
                    ></v-select>
                    <v-select
                        class="mt-3"
                        :items="roles"
                        label="Select Role for the user"
                        v-model="generalDetails.selectedRole"
                        :menu-props="{ top: false, offsetY: true }"
                        item-value="id"
                        item-text="name"
                        solo
                        :rules="selectRules"
                    ></v-select>
                    <v-select
                        class="mt-3"
                        :items="religions"
                        label="Religion"
                        :rules="selectRules"
                        v-model="generalDetails.selectedReligion"
                        :menu-props="{ top: false, offsetY: true }"
                        item-value="id"
                        item-text="name"
                        solo
                    ></v-select>
                    <v-text-field
                        label="User Email"
                        v-model="generalDetails.userEmail"
                        single-line
                        :rules="fieldRules"
                        solo
                    ></v-text-field>
                </v-form>
            </v-col>
            <v-col cols="4">
                <v-form ref="middleNameForm" v-model="valid" lazy-validation @submit.prevent="compltedFirstStep"> 
                    <v-text-field
                        label="Middle Name"
                        v-model="generalDetails.middleName"
                        single-line
                        solo
                    ></v-text-field>
                    <div class="dob-style mt-3" @click="showCalander = !showCalander">{{generalDetails.dob === '' ? 'Date of birth' : generalDetails.formattedDOB}}</div>
                    <v-date-picker 
                        v-if="showCalander" 
                        v-model="generalDetails.dob" 
                        full-width 
                        header-color="#85B09A" 
                        elevation="15"
                        @change="onSelectDate"
                    ></v-date-picker>
                    <span class="field-err-message" v-if="showDOBerr">Date of birth is required</span>
                    <v-select
                        class="mt-3"
                        :class="[ showDOBerr ? 'mt-4' : 'mt-10']"
                        :items="departments"
                        label="Department"
                        v-model="generalDetails.selecetdDepartment"
                        :menu-props="{ top: false, offsetY: true }"
                        :rules="selectRules"
                        item-value="id"
                        item-text="name"
                        solo
                    ></v-select>
                    <v-select
                        class="mt-3"
                        :items="socialCategories"
                        label="Social Category"
                        v-model="generalDetails.selectedSocialCategory"
                        :menu-props="{ top: false, offsetY: true }"
                        item-value="id"
                        :rules="selectRules"
                        item-text="name"
                        @change="onChangeSocialCat"
                        solo
                    ></v-select>
                    <v-text-field
                        label="Password"
                        v-model="generalDetails.password"
                        single-line
                        :rules="fieldRules"
                        solo
                    ></v-text-field>
                </v-form>
            </v-col>
            <v-col cols="4">
                <v-form ref="lastNameForm" v-model="valid" lazy-validation @submit.prevent="compltedFirstStep">
                    <v-text-field
                        label="Last Name"
                        v-model="generalDetails.lastName"
                        single-line
                        :rules="fieldRules"
                        solo
                    ></v-text-field>
                    <v-select
                        class="mt-3"
                        :items="qualifications"
                        label="Qualification"
                        v-model="generalDetails.selectedQualification"
                        :menu-props="{ top: false, offsetY: true }"
                        item-value="id"
                        :rules="selectRules"
                        item-text="name"
                        solo
                    ></v-select>
                    <v-select
                        class="mt-3"
                        :items="nationality"
                        label="Nationality"
                        v-model="generalDetails.selectedNation"
                        :menu-props="{ top: false, offsetY: true }"
                        item-value="id"
                        item-text="name"
                        :rules="selectRules"
                        solo
                    ></v-select>
                    <v-select
                        class="mt-3"
                        v-if="showObcSubCat"
                        :items="obcSubCat"
                        label="OBC Sub Category"
                        v-model="generalDetails.selectedObcSub"
                        :menu-props="{ top: false, offsetY: true }"
                        item-value="id"
                        item-text="name"
                        :rules="selectRules"
                        solo
                    ></v-select>
                </v-form>
            </v-col>
        </v-row>
        <div align="center" class="pa-3">
        <v-btn @click="compltedFirstStep" large style="background: #85B09A" class="submit-btn-color">Continue</v-btn>
        </div>
    </div>
</template>
<style scoped>
.dob-style {
    height: 48px;
    font-weight: 700;
    padding: 11px;
    border-radius: 5px;
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
}
.submit-btn-color {
    color: #ffffff;
    font-weight: 900;
}
::v-deep .v-text-field.v-text-field--solo .v-label {
    color: #333333;
    font-weight: 700;
}
</style>
<script>
import { mapActions, mapGetters } from 'vuex'
import { storage } from './../firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export default {
    name: 'GeneralDetails',
    data: () => ({
        url: '',
        departments: [],
        nationality: [],
        religions: [],
        socialCategories: [],
        obcSubCat: [ ],
        genders: [],
        roles: [],
        titles: [],
        qualifications: [],
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
        showObcSubCat: false,
        showCalander: false,
        showDOBerr: '',
        valid: false,
        fieldRules: [
            v => !!v || 'This field is requried',
            v => v !== null || 'This field is requried',
        ],
        selectRules: [
            v => !!v || 'One selection is required',
            v => v !== null || 'One selection is required',
        ],
        titleRules: [
            v => !!v || 'Required',
            v => v !== null || 'Required',
        ]
    }),
    computed: {
        ...mapGetters('UserCreationModule', ['getUserGeneralDetails'])
    },
    methods: {
        ...mapActions('UserCreationModule', ['getDropDownVals', 'saveUserGeneralDetail']),
        async getAllDropDownVals() {
           const data = await this.getDropDownVals();
           const arrList = ['dept', 'gender', 'nationality', 'obcsub', 'quali', 'religion', 'role', 'social', 'title'];
           arrList.forEach((item) => {
                if (item === 'dept') this.setDropDown(data.data.department, this.departments);
                else if (item === 'gender') this.setDropDown(data.data.gender, this.genders);
                else if (item === 'nationality') this.setDropDown(data.data.nationality, this.nationality);
                else if (item === 'obcsub') this.setDropDown(data.data.obcsubcategory, this.obcSubCat);
                else if (item === 'quali') this.setDropDown(data.data.qualification, this.qualifications);
                else if (item === 'religion') this.setDropDown(data.data.religion, this.religions);
                else if (item === 'role') this.setDropDown(data.data.role, this.roles);
                else if (item === 'social') this.setDropDown(data.data.socialcategory, this.socialCategories);
                else if (item === 'title') this.setDropDown(data.data.title, this.titles);
           });
        },
        setDropDown(arr, arrName) {
            arr.forEach((item) => {
                const obj = {
                    id: item.code,
                    name: item.value
                }
                arrName.push(obj);
            })
        },
        uploadFile() {
            console.log(this.$refs.myFile.files);
            // const ext = this.$refs.myFile.files[0].name.split('.');
            const storageRef = ref(storage, `userProfile/emailofuser`);
            uploadBytes(storageRef, this.$refs.myFile.files[0]).then(
                (snapshot) => {
                    console.log('uplaoded', snapshot);
                }
            )
            setTimeout(() => {
                this.getProfilePic()
            }, 2000);
        },
        getProfilePic() {
            console.log('calling get');
            getDownloadURL(ref(storage, `userProfile/emailofuser`)).then(
                (download_url) => this.url = download_url
            )
        },
        onChangeSocialCat() {
            this.generalDetails.selectedObcSub = '';
            if (this.generalDetails.selectedSocialCategory === 2) this.showObcSubCat = true;
            else this.showObcSubCat = false;
        },
        onSelectDate() {
            this.showDOBerr = false;
            if (!this.generalDetails.dob) return null;
            const [year, month, date] = this.generalDetails.dob.split('-');
            this.generalDetails.formattedDOB = `${date}/${month}/${year}`;
            this.showCalander = false;
        },
        compltedFirstStep() {
            this.$emit('onClickContinue');
            if (this.$refs.firstNameForm.validate() && this.$refs.middleNameForm.validate() && this.$refs.lastNameForm.validate()) {
                if (this.generalDetails.formattedDOB === '' || this.generalDetails.dob === '') this.showDOBerr = true;
                else {
                    console.log('complted 1st step');
                    this.saveUserGeneralDetail(this.generalDetails);
                    this.$emit('onClickContinue');
                }
            }
        },
        clickedTitle() {
            console.log(this.generalDetails.selectedTitle)
        }
    },
    mounted() {
        this.generalDetails = this.getUserGeneralDetails;
        this.getAllDropDownVals();
    }
}
</script>
