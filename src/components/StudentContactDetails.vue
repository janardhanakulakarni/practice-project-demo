<template>
    <div>
        <v-row justify="center" class="px-16 mt-10">
            <v-col cols="4">
                <!-- <div class="label-text">Department</div> -->
                <v-form ref="firstCol" v-model="valid"  @submit.prevent="compltedSecondStep">
                    <v-textarea
                        solo
                        name="input-7-4"
                        label="Residentail Address"
                        v-model="contactDetails.residentailAddress"
                        :rules="fieldRules"
                    ></v-textarea>
                    <v-text-field
                        class="mt-3"
                        label="Student mobile number"
                        v-model="contactDetails.studentPhNumber"
                        single-line
                        solo
                    ></v-text-field>
                    <v-text-field
                        class="mt-3"
                        label="Student Email-id"
                        v-model="contactDetails.studentEmailId"
                        single-line
                        solo
                    ></v-text-field>
                    <v-text-field
                        class="mt-3"
                        label="City"
                        v-model="contactDetails.city"
                        single-line
                        :rules="fieldRules"
                        solo
                    ></v-text-field>
                    <v-select
                        class="mt-3"
                        :items="states"
                        label="State"
                        :rules="selectRules"
                        v-model="contactDetails.selectedState"
                        :menu-props="{ top: false, offsetY: true }"
                        item-value="id"
                        item-text="name"
                        solo
                    ></v-select>
                </v-form>
            </v-col>
            <v-col cols="4">
                <v-form ref="secondCol" v-model="valid" lazy-validation @submit.prevent="compltedSecondStep"> 
                    <v-textarea
                        solo
                        name="input-7-4"
                        label="Permanent Address"
                        v-model="contactDetails.permanentAddress"
                        :rules="fieldRules"
                    ></v-textarea>
                    <v-text-field
                        class="mt-3"
                        label="Parant mobile number"
                        v-model="contactDetails.parentPhNumber"
                        single-line
                        :rules="fieldRules"
                        solo
                    ></v-text-field>
                    <v-text-field
                        class="mt-3"
                        label="Parent Email-id"
                        v-model="contactDetails.parentEmailId"
                        single-line
                        solo
                    ></v-text-field>
                    <v-select
                        class="mt-3"
                        :items="districts"
                        label="District"
                        :rules="selectRules"
                        v-model="contactDetails.selectedDistrict"
                        :menu-props="{ top: false, offsetY: true }"
                        item-value="id"
                        item-text="name"
                        solo
                    ></v-select>
                    <v-text-field
                        class="mt-3"
                        label="Zipcode"
                        v-model="contactDetails.zipcode"
                        single-line
                        :rules="fieldRules"
                        solo
                    ></v-text-field>
                </v-form>
            </v-col>
        </v-row>
        <div align="center" class="pt-3">
        <v-btn @click="goTogeneralDetails" large style="background: brown" class="submit-btn-color mr-5">Previous</v-btn>
        <v-btn @click="compltedSecondStep" large style="background: #85B09A" class="submit-btn-color">Continue</v-btn>
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
    background: #85B09A
}
::v-deep .v-text-field.v-text-field--solo .v-label {
    color: #333333;
    font-weight: 700;
}
</style>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    name: 'contactDetails',
    data: () => ({
        valid: false,
        districts: [
            {
                id: 1,
                name: 'Haveri'
            },
            {
                id: 2,
                name: 'Dharwad'
            }
        ],
        states: [
            {
                id: 1,
                name: 'Karnataka'
            },
            {
                id: 2,
                name: 'Andhra Pradesh'
            }
        ],
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
        fieldRules: [
            (v) => v !== '' || 'This field is requried',
            (v) => v !== null || 'This field is requried',
        ],
        selectRules: [
            v => v !== '' || 'One selection is required',
            v => v !== null || 'One selection is required',
        ],
    }),
    computed: {
        ...mapGetters('StudentEnrollModule', ['getContactDetails'])
    },
    methods: {
        ...mapActions('StudentEnrollModule', ['saveContactDetail']),
        compltedSecondStep() {
            if (this.$refs.firstCol.validate() && this.$refs.secondCol.validate()) {
                this.saveContactDetail(this.contactDetails);
                this.$emit('onClickContinue');
            }
        },
        goTogeneralDetails() {
            this.$emit('onClickPrevious');
        }
    },
    mounted() {
        this.contactDetails = this.getContactDetails;
    }
}
</script>
