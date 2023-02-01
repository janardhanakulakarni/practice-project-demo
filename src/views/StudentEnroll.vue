<template>
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
                <student-general-details @onClickContinue="nextPage"/>
            </v-tab-item>
            <v-tab-item> 
                <student-contact-details @onClickContinue="nextPage" @onClickPrevious="previousPage"/>
            </v-tab-item>
            <v-tab-item>
                <student-academic-details  @onClickContinue="nextPage" @onClickPrevious="previousPage"/>
            </v-tab-item>
            <v-tab-item>
                <student-bank-details @onClickFinish="enrollStudentWithDetails" @onClickPrevious="previousPage"/>
            </v-tab-item>
        </v-tabs-items>
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
import StudentGeneralDetails from './../components/StudentGeneralDetails.vue'
import StudentContactDetails from './../components/StudentContactDetails.vue'
import StudentAcademicDetails from './../components/StudentAcademicDetail.vue'
import StudentBankDetails from './../components/StudentBankDetail.vue'

export default {
    components: {
        StudentGeneralDetails,
        StudentContactDetails,
        StudentAcademicDetails,
        StudentBankDetails,
    },
    name: 'EnrollStudent',
    data: () => ({
        selectedTab: 0,
        tabItems: [
          'General Details', 'Contact Details', 'Academic Details', 'Bank Details',
        ],
    }),
    methods: {
      nextPage() {
        this.selectedTab += 1;
      },
      previousPage() {
        this.selectedTab -= 1;
      },
      enrollStudentWithDetails() {
        console.log('compelete data');
      }
    },
}
</script>
