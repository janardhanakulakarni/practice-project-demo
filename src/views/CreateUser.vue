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
  height: 73vh;
}
::v-deep .theme--dark.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active), .theme--dark.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active) > .v-icon, .theme--dark.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active) > .v-btn, .theme--dark.v-tabs > .v-tabs-bar .v-tab--disabled {
    color: #333333;
    font-weight: bolder;
}
</style>
<script>
import UserGeneralDetails from './../components/UserGeneralDetails.vue'
import UserContactDetails from './../components/UserContactDetails.vue'

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
        data: [
            {
                id: 1,
                name: 'KAR'
            }
        ]
        // showWarning: false
    }),
    methods: {
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
        createUserWithDetails() {
            console.log('compelete data', this.data);
        }
    },
    mounted() {
        console.log(this.data)
    }
}
</script>
