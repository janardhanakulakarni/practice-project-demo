<template>
    <div>
        <v-row justify="center" class="px-16 mt-10">
            <v-col cols="4">
                <!-- <div class="label-text">Department</div> -->
                <v-form ref="firstNameForm" v-model="valid" lazy-validation @submit.prevent="compltedFirstStep">
                    <v-text-field
                        label="First Name"
                        v-model="generalDetails.firstName"
                        single-line
                        :rules="fieldRules"
                        solo
                    ></v-text-field>
                    <v-text-field
                        class="mt-3"
                        label="Father Name"
                        v-model="generalDetails.fatherName"
                        single-line
                        :rules="fieldRules"
                        solo
                    ></v-text-field>
                    <div class="dob-style mt-3" @click="showCalander = !showCalander">{{generalDetails.dob === '' ? 'Date of birth' : generalDetails.formattedDOB}}</div>
                    <v-date-picker 
                        v-if="showCalander" 
                        v-model="generalDetails.dob" 
                        full-width
                        flat
                        header-color="#85B09A" 
                        elevation="15"
                        @change="onSelectDate"
                    ></v-date-picker>
                    <span class="field-err-message" v-if="showDOBerr">Date of birth is required</span>
                    <v-select
                        class="mt-3"
                        :class="[ showDOBerr ? 'mt-4' : 'mt-10']"
                        :items="religions"
                        label="Religion"
                        :rules="selectRules"
                        v-model="generalDetails.selectedReligion"
                        :menu-props="{ top: false, offsetY: true }"
                        item-value="id"
                        item-text="name"
                        solo
                        @change="onChangeReligion"
                    ></v-select>
                    <v-text-field
                        class="mt-3"
                        label="Cast certificate number"
                        v-model="generalDetails.castCertificateNumber"
                        single-line
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
                    <v-text-field
                        class="mt-3"
                        label="Mother Name"
                        v-model="generalDetails.motherName"
                        single-line
                        :rules="fieldRules"
                        solo
                    ></v-text-field>
                    <v-select
                        class="mt-3"
                        :items="departments"
                        label="Department"
                        v-model="generalDetails.selectedDepartment"
                        :menu-props="{ top: false, offsetY: true }"
                        :rules="selectRules"
                        item-value="id"
                        item-text="name"
                        solo
                        @change="checkSelecetdDept"
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
                        @change="onChangeObcSub"
                    ></v-select>
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
                        :items="genders"
                        label="Gender"
                        v-model="generalDetails.selectedGender"
                        :menu-props="{ top: false, offsetY: true }"
                        item-value="id"
                        :rules="selectRules"
                        item-text="name"
                        solo
                        @change="onChangeGender"
                    ></v-select>
                    <v-select
                        class="mt-3"
                        :items="semesters"
                        v-model="generalDetails.selectedSemester"
                        label="Semester"
                        :menu-props="{ top: false, offsetY: true }"
                        item-value="id"
                        :rules="selectRules"
                        item-text="name"
                        solo
                        @change="onChangeSemester"
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
                        @change="onChangeNation"
                    ></v-select>
                </v-form>
            </v-col>
        </v-row>
        <div align="center" class="mt-n3 mb-6">
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
export default {
    name: 'GeneralDetails',
    data: () => ({
        departments: [],
        semesters: [],
        nationality: [],
        religions: [],
        socialCategories: [],
        obcSubCat: [],
        genders: [],
        fieldRules: [
            v => !!v || 'This field is requried',
            // v => v !== null || 'This field is requried',
        ],
        selectRules: [
            v => !!v || 'One selection is required',
            // v => v !== null || 'One selection is required',
        ],
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
        showObcSubCat: false,
        showCalander: false,
        showDOBerr: '',
        valid: false
    }),
    watch: {
        getDropDownCompletedVal(newVal) {
            if(newVal) {
                this.setAllDropDownVals();
            }
        }
    },
    computed: {
        ...mapGetters('StudentEnrollModule', ['getGeneralDetails', 'getDropDownCompletedVal', 'getStudentDropDownValues'])
    },
    methods: {
        ...mapActions('StudentEnrollModule', ['saveGeneralDetail']),
        setAllDropDownVals() {
            const arrList = ['dept', 'gender', 'nationality', 'sem', 'obcsub', 'religion','social'];
            const data = this.getStudentDropDownValues;
            arrList.forEach((name) => {
                if (name === 'dept') this.departments = data[name];
                else if (name === 'gender') this.genders = data[name];
                else if (name === 'nationality') this.nationality = data[name];
                else if (name === 'obcsub') this.obcSubCat = data[name];
                else if (name === 'religion') this.religions = data[name];
                else if (name === 'sem') this.semesters = data[name];
                else if (name === 'social') this.socialCategories = data[name];
            })
        },
        onChangeGender() {
            this.genders.forEach((item) => {
                if (this.generalDetails.selectedGender === item.id) this.generalDetails.gender = item.name
            })
        },
        onChangeSemester() {
            this.semesters.forEach((item) => {
                if (this.generalDetails.selectedSemester === item.id) this.generalDetails.semester = item.name
            })
        },
        checkSelecetdDept() {
            this.departments.forEach((item) => {
                if (this.generalDetails.selectedDepartment === item.id) this.generalDetails.department = item.name
            });
        },
        onChangeReligion() {
            this.religions.forEach((item) => {
                if (this.generalDetails.selectedReligion === item.id) this.generalDetails.religion = item.name
            })
        },
        onChangeSocialCat() {
            this.socialCategories.forEach((item) => {
                if (this.generalDetails.selectedSocialCategory === item.id) this.generalDetails.socialCategory = item.name
            })
            this.generalDetails.selectedObcSub = '';
            if (this.generalDetails.selectedSocialCategory === 2) this.showObcSubCat = true;
            else this.showObcSubCat = false;
        },
        onChangeNation() {
            this.nationality.forEach((item) => {
                if (this.generalDetails.selectedNation === item.id) this.generalDetails.nation = item.name
            })
        },
        onChangeObcSub() {
            this.obcSubCat.forEach((item) => {
                if (this.generalDetails.selectedObcSub === item.id) this.generalDetails.obcSub = item.name
            })
        },
        onSelectDate() {
            this.showDOBerr = false;
            if (!this.generalDetails.dob) return null;
            const [year, month, date] = this.generalDetails.dob.split('-');
            this.generalDetails.formattedDOB = `${date}/${month}/${year}`;
            this.showCalander = false; 
        },
        compltedFirstStep() {
            // this.$emit('onClickContinue');
            // this.$store.dispatch.saveGeneralDetail(this.generalDetails);
            if (this.$refs.firstNameForm.validate() && this.$refs.middleNameForm.validate() && this.$refs.lastNameForm.validate()) {
                if (this.generalDetails.formattedDOB === '' || this.generalDetails.dob === '') this.showDOBerr = true;
                else {
                    console.log('complted 1st step');
                    this.saveGeneralDetail(this.generalDetails);
                    this.$emit('onClickContinue');
                }
            }
        }
    },
    created() {
        // this.generalDetails = this.getGeneralDetails;
    },
    mounted() {
        this.$refs.firstNameForm.reset();
        this.$refs.middleNameForm.reset();
        this.$refs.lastNameForm.reset();
        if (this.getDropDownCompletedVal) this.setAllDropDownVals();
    }
}
</script>
