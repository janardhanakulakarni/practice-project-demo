<template>
    <div style="width: 95vw" class="ma-7 mt-10">
      <v-snackbar
        v-model="showMessage"
        absolute
        :min-width="100"
        :max-width="350"
        :color="msg.color"
        centered
        timeout="5000"
        top
      >
        {{ msg.desc }}
      </v-snackbar>
        <v-tabs
          v-model="selectedTab"
          background-color="#006064"
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
  min-height: 47vh;
}
::v-deep .theme--dark.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active), .theme--dark.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active) > .v-icon, .theme--dark.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active) > .v-btn, .theme--dark.v-tabs > .v-tabs-bar .v-tab--disabled {
    color: #ffffff;
    font-weight: bolder;
}
</style>
<script>
import StudentGeneralDetails from './../components/StudentGeneralDetails.vue'
import StudentContactDetails from './../components/StudentContactDetails.vue'
import StudentAcademicDetails from './../components/StudentAcademicDetail.vue'
import StudentBankDetails from './../components/StudentBankDetail.vue'
import { mapActions, mapGetters } from 'vuex'

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
        msg: {
            color: '',
            desc: '',
        },
        showMessage: false,
    }),
    computed: {
        ...mapGetters('StudentEnrollModule', ['getGeneralDetails', 'getContactDetails', 'getAcademicDetails', 'getBankDetails'])
    },
    methods: {
      ...mapActions('StudentEnrollModule', ['getDropdownVal', 'dispatchDropdown', 'dropdownSetupCompleted', 'saveGeneralDetail', 'enrollStudent', 'destroyStudentData']),
      ...mapActions('Common', ['startLoading', 'stopLoading']),
      async getAllStudentDropdown() {
        const data = await this.getDropdownVal();
        this.stopLoading();
        const arrList = ['dept', 'gender', 'nationality', 'obcsub', 'religion', 'sem', 'social', 'state'];
           arrList.forEach((item) => {
                if (item === 'dept') this.setDropDown(data.data.department, 'dept');
                else if (item === 'gender') this.setDropDown(data.data.gender, 'gender');
                else if (item === 'nationality') this.setDropDown(data.data.nationality, 'nationality');
                else if (item === 'obcsub') this.setDropDown(data.data.obcsubcategory, 'obcsub');
                else if (item === 'religion') this.setDropDown(data.data.religion, 'religion');
                else if (item === 'social') this.setDropDown(data.data.socialcategory, 'social');
                else if (item === 'sem') this.setDropDown(data.data.semester, 'sem');
                else if (item === 'state') {
                  this.setDropDown(data.data.states, 'state');
                  this.dropdownSetupCompleted();
                  this.stopLoading();
                }
           });
      },
      async setDropDown(arr, name) {
            let dropDownArr = [];
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
      nextPage() {
        this.selectedTab += 1;
      },
      previousPage() {
        this.selectedTab -= 1;
      },
      async enrollStudentWithDetails() {
        console.log('compelete data');
        const genDetails = this.getGeneralDetails;
        const contactDetails = this.getContactDetails;
        console.log(genDetails);
        // const academicInfo = this.getAcademicDetails;
        // const bankInfo = this.getBankDetails;
        const requestBody = {
          firstName: genDetails.firstName,
          middleName: genDetails.middleName,
          lastName: genDetails.lastName,
          fatherName: genDetails.fatherName,
          motherName: genDetails.motherName,
          genderCode: genDetails.selectedGender,
          gender: genDetails.gender,
          contactNo: contactDetails.residentialAddress.userPhNum,
          department: genDetails.department,
          departmentCode: genDetails.selectedDepartment,
          nationality: genDetails.nation,
          religion: genDetails.religion,
          religionCode: genDetails.selectedReligion,
          socialCategory: genDetails.socialCategory,
          socialCategoryCode: genDetails.selectedSocialCategory,
          obcSubCategoryCode: genDetails.selectedObcSub,
          obcSubCategory: genDetails.obcSub,
          residentialAddress: {
              address: contactDetails.residentialAddress.address,
              state: contactDetails.residentialAddress.state,
              stateRef: contactDetails.residentialAddress.selectedState,
              district: contactDetails.residentialAddress.district,
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
        console.log('final student data', requestBody);
        const data = await this.enrollStudent(requestBody);
        console.log(data);
        if (data.status === 200) {
          this.msg.color = 'green';
          this.msg.desc = data.message;
          this.showMessage = true;
          this.stopLoading();
          this.selectedTab = 0;
          this.destroyStudentData();
        }
      }
    },
    created() {
      this.getAllStudentDropdown();
    },
    destroyed() {
      this.destroyStudentData('clearDropdown');
    }
}
</script>
