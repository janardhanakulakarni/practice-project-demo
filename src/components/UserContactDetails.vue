<template>
    <div>
        <v-row justify="center" class="px-16 mt-8">
            <v-col cols="4">
                <!-- <div class="label-text">Department</div> -->
                <v-form ref="firstCol" v-model="valid" lazy-validation  @submit.prevent="compltedSecondStep">
                    <v-textarea
                        solo
                        name="input-7-4"
                        label="Residentail Address"
                        v-model="address.residentailAddress.address"
                        :rules="fieldRules"
                        rows="3"
                    ></v-textarea>
                    <v-text-field
                        class="mt-2"
                        label="User mobile number"
                        v-model="address.residentailAddress.userPhNum"
                        single-line
                        solo
                        :rules="fieldRules"
                    ></v-text-field>
                    <v-text-field
                        class="mt-2"
                        label="City"
                        v-model="address.residentailAddress.city"
                        single-line
                        :rules="fieldRules"
                        solo
                    ></v-text-field>
                    <v-select
                        class="mt-2"
                        :items="districts"
                        label="District"
                        v-model="address.residentailAddress.selectedDistrict"
                        :menu-props="{ top: false, offsetY: true }"
                        item-value="id"
                        item-text="name"
                        solo
                        :rules="selectRules"
                    ></v-select>
                    <v-select
                        class="mt-2"
                        :items="states"
                        label="State"
                        v-model="address.residentailAddress.selectedState"
                        :menu-props="{ top: false, offsetY: true }"
                        item-value="id"
                        item-text="name"
                        solo
                        :rules="selectRules"
                    ></v-select>
                </v-form>
                <v-checkbox
                    class="mt-n4"
                    v-model="sameAddress"
                    label="Set Reseidential Address as Permanent Address"
                    @change="makeDefaultAddress"
                    value="John"
                ></v-checkbox>
            </v-col>
            <v-col cols="4">
                <v-form ref="secondCol" v-model="valid" lazy-validation @submit.prevent="compltedSecondStep"> 
                    <v-textarea
                        solo
                        name="input-7-4"
                        label="Permanent Address"
                        v-model="address.permanentAddress.address"
                        :rules="fieldRules"
                        :disabled="disableField"
                        rows="3"
                    ></v-textarea>
                    <v-text-field
                        class="mt-2"
                        label="User mobile number"
                        v-model="address.permanentAddress.userPhNum"
                        single-line
                        solo
                        :disabled="disableField"
                        :rules="fieldRules"
                    ></v-text-field>
                    <v-text-field
                        class="mt-2"
                        label="City"
                        v-model="address.permanentAddress.city"
                        single-line
                        :rules="fieldRules"
                        solo
                        :disabled="disableField"
                    ></v-text-field>
                    <v-select
                        class="mt-2"
                        :items="districts"
                        label="District"
                        v-model="address.permanentAddress.selectedDistrict"
                        :menu-props="{ top: false, offsetY: true }"
                        item-value="id"
                        item-text="name"
                        solo
                        :disabled="disableField"
                        :rules="selectRules"
                    ></v-select>
                    <v-select
                        class="mt-2"
                        :items="states"
                        label="State"
                        v-model="address.permanentAddress.selectedState"
                        :menu-props="{ top: false, offsetY: true }"
                        item-value="id"
                        item-text="name"
                        solo
                        :disabled="disableField"
                        :rules="selectRules"
                    ></v-select>
                </v-form>
            </v-col>
        </v-row>
        <div align="center" class="mt-1">
        <v-btn @click="goTogeneralDetails" large style="background: brown" class="submit-btn-color mr-5">Previous</v-btn>
        <v-btn @click="compltedSecondStep" large style="background: #85B09A" class="submit-btn-color">Finish</v-btn>
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
        states: [],
        address: {
            residentailAddress: {
                address: '',
                userPhNum: '',
                city: '',
                selectedDistrict: '',
                selectedState: '',
                state: '',
                zipcode: ''
            },
            permanentAddress: {
                address: '',
                userPhNum: '',
                city: '',
                selectedDistrict: '',
                selectedState: '',
                state: '',
                zipcode: ''
            },
        },
        sameAddress: false,
        disableField: false,
        fieldRules: [
            (v) => !!v || 'This field is requried',
            (v) => v !== null || 'This field is requried',
        ],
        selectRules: [
            v => !!v || 'One selection is required',
            v => v !== null || 'One selection is required',
        ],
    }),
    computed: {
        ...mapGetters('UserCreationModule', ['getUserContactDetails', 'getUserDropDownValues'])
    },
    methods: {
        ...mapActions('UserCreationModule', ['saveUserContactDetail']),
        async setDropDownVals() {
            const arrList = ['state'];
            const data = this.getUserDropDownValues;
            arrList.forEach((name) => {
                if(name === 'state') this.states = data[name];
            });
        },
        async compltedSecondStep() {
            if (this.$refs.firstCol.validate() && this.$refs.secondCol.validate()) {
                await this.saveUserContactDetail(this.address);
                this.$emit('onClickFinish');
            }
        },
        goTogeneralDetails() {
            this.$emit('onClickPrevious');
        },
        makeDefaultAddress() {
            if (this.sameAddress) {
                this.disableField = true;
                this.address.permanentAddress = { ...this.address.residentailAddress };
            } else {
                this.disableField = false;
                Object.keys(this.address.permanentAddress).forEach(key => {
                    this.address.permanentAddress[key] = '';
                });
            }
        }
    },
    mounted() {
        this.address.residentailAddress = this.getUserContactDetails['residentailAddress'];
        this.address.permanentAddress = this.getUserContactDetails['permanentAddress'];
        this.setDropDownVals();
    }
}
</script>
