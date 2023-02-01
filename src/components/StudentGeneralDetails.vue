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
                        label="Father First Name"
                        v-model="generalDetails.fatherFirstName"
                        single-line
                        :rules="fieldRules"
                        solo
                    ></v-text-field>
                    <v-text-field
                        class="mt-3"
                        label="Mother First Name"
                        v-model="generalDetails.motherFirstName"
                        single-line
                        :rules="fieldRules"
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
                        @change="checkSelecetdDept"
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
                        label="Father Middle Name"
                        v-model="generalDetails.fatherMiddleName"
                        single-line
                        solo
                    ></v-text-field>
                    <v-text-field
                        class="mt-3"
                        label="Mother Middle Name"
                        v-model="generalDetails.motherMiddleName"
                        single-line
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
                    <v-text-field
                        class="mt-3"
                        label="Father Last Name"
                        v-model="generalDetails.fatherLastName"
                        single-line
                        solo
                    ></v-text-field>
                    <v-text-field
                        class="mt-3"
                        label="Mother Last Name"
                        v-model="generalDetails.motherLastName"
                        single-line
                        solo
                    ></v-text-field>
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
                    <v-text-field
                        class="mt-3"
                        label="Cast certificate number"
                        v-model="generalDetails.castCertificateNumber"
                        single-line
                        solo
                    ></v-text-field>
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
        <div align="center" class="pt-3">
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
        departments: [
            {
                id: 1,
                name: 'Civil Engineering'
            },
            {
                id: 2,
                name: 'Computer Science Engineering'
            },
            {
                id: 3,
                name: 'Electrial & Electronics Engineering'
            },
            {
                id: 4,
                name: 'Electronics & Communication Engineering'
            },
            {
                id: 5,
                name: 'Information Science Engineering'
            },
            {
                id: 6,
                name: 'Mechanical Engineering'
            },
        ],
        semesters: [
            {
                id: 1,
                name: '1st Semester'
            },
            {
                id: 2,
                name: '2nd Semester'
            },
            {
                id: 3,
                name: '3rd Semester'
            },
            {
                id: 4,
                name: '4th Semester'
            },
            {
                id: 5,
                name: '5th Semester'
            },
            {
                id: 6,
                name: '6th Semester'
            },
            {
                id: 7,
                name: '7th Semester'
            },
            {
                id: 8,
                name: '8th Semester'
            }
        ],
        nationality: [
            {
                id: 1,
                name: 'India'
            },
            {
                id: 'OTHER',
                name: 'Other'
            }
        ],
        religions: [
            {
                id: 1,
                name: 'Buddhist'
            },
            {
                id: 2,
                name: 'Christian'
            },
            {
                id: 3,
                name: 'Hindu'
            },
            {
                id: 4,
                name: 'Islamic'
            },
            {
                id: 5,
                name: 'Jain'
            },
            {
                id: 6,
                name: 'Parsi'
            },
            {
                id: 7,
                name: 'Sikh'
            },
            {
                id: 8,
                name: 'Other'
            },
        ],
        socialCategories: [
            {
                id: 1,
                name: 'General'
            },
            {
                id: 2,
                name: 'OBC'
            },
            {
                id: 3,
                name: 'SC'
            },
            {
                id: 4,
                name: 'ST'
            }
        ],
        obcSubCat: [
            {
                id: 1,
                name: 'Category 1'
            },
            {
                id: 2,
                name: 'Category 2A'
            },
            {
                id: 3,
                name: 'Category 2B'
            },
            {
                id: 4,
                name: 'Category 3A'
            },
            {
                id: 5,
                name: 'Category 3B'
            }
        ],
        genders: [
            {
                id: 1,
                name: 'Male'
            },
            {
                id: 2,
                name: 'Female'
            },
            {
                id: 3,
                name: 'Transgender'
            }
        ],
        fieldRules: [
            (v) => v !== '' || 'This field is requried',
            (v) => v !== null || 'This field is requried',
        ],
        selectRules: [
            v => v !== '' || 'One selection is required',
            v => v !== null || 'One selection is required',
        ],
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
        showObcSubCat: false,
        showCalander: false,
        showDOBerr: '',
        valid: false
    }),
    computed: {
        ...mapGetters('StudentEnrollModule', ['getGeneralDetails'])
    },
    methods: {
        ...mapActions('StudentEnrollModule', ['saveGeneralDetail']),
        checkSelecetdDept() {
            console.log(this.generalDetails.selecetdDepartment, typeof this.generalDetails.selecetdDepartment);
            console.log(this.generalDetails.selectedGender);
        },
        onChangeSocialCat() {
            console.log(this.generalDetails.selectedSocialCategory);
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
    mounted() {
        this.generalDetails = this.getGeneralDetails;
    }
}
</script>
