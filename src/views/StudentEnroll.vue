<template>
  <div style="width: 95vw" class="ma-7 mt-10">
    <v-dialog
      v-model="showEnterStudentId"
      persistent
      max-width="600"
      class="ma-5"
      overlay-opacity="0.9"
    >
      <v-card height="100%">
        <v-card-title class="text-h5">
          Please enter Student ID to edit student info.
        </v-card-title>
        <v-card-text
          >By clicking <strong>Continue</strong> button you'll get the
          information of the student there you can edit the
          details.</v-card-text
        >
        <v-card-text class="mt-n5">
          <v-form
            ref="studentIdForm"
            v-model="valid"
            lazy-validation
            @submit.prevent="onEnterStudentId"
          >
            <v-text-field
              class="mt-3"
              label="Student ID"
              style="max-width: 299px"
              v-model="enteredStudentId"
              single-line
              :rules="studentIdRules"
              solo
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions class="mt-n10 ml-2">
          <v-spacer></v-spacer>
          <v-btn depressed color="previous" to="home" class="popup-btn">
            Cancel
          </v-btn>
          <v-btn @click="onEnterStudentId" color="primary" class="popup-btn"
            >Continue</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="showSuccessMsg"
      persistent
      max-width="600"
      class="ma-5"
      overlay-opacity="0.9"
    >
      <v-card height="100%">
        <v-card-title class="text-h5">
          Student Enrolled Successfully.
        </v-card-title>
        <v-card-text>Do you want to enroll other student</v-card-text>
        <v-card-actions class="mt-n10 ml-2">
          <v-spacer></v-spacer>
          <v-btn depressed color="previous" to="home" class="popup-btn">
            NO
          </v-btn>
          <v-btn @click="onClickYes" color="primary" class="popup-btn"
            >YES</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-tabs
      v-model="selectedTab"
      background-color="#006064"
      centered
      class="tab-radius"
      dark
      icons-and-text
    >
      <v-tab v-for="item in tabItems" :key="item" disabled>
        {{ item }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="selectedTab" color="orange" class="tab-item-radius">
      <v-tab-item>
        <student-general-details @onClickContinue="nextPage" />
      </v-tab-item>
      <v-tab-item>
        <student-contact-details
          @onClickContinue="nextPage"
          @onClickPrevious="previousPage"
        />
      </v-tab-item>
      <v-tab-item>
        <student-academic-details
          @onClickContinue="nextPage"
          @onClickPrevious="previousPage"
        />
      </v-tab-item>
      <v-tab-item>
        <student-bank-details
          @onClickFinish="enrollStudentWithDetails"
          @onClickPrevious="previousPage"
        />
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
.popup-btn {
  color: #fff;
  font-weight: 900;
  height: 30px;
}
::v-deep .theme--dark.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active),
.theme--dark.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active) > .v-icon,
.theme--dark.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active) > .v-btn,
.theme--dark.v-tabs > .v-tabs-bar .v-tab--disabled {
  color: #ffffff;
  font-weight: bolder;
}
</style>
<script>
import StudentGeneralDetails from "./../components/StudentGeneralDetails.vue";
import StudentContactDetails from "./../components/StudentContactDetails.vue";
import StudentAcademicDetails from "./../components/StudentAcademicDetail.vue";
import StudentBankDetails from "./../components/StudentBankDetail.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    StudentGeneralDetails,
    StudentContactDetails,
    StudentAcademicDetails,
    StudentBankDetails,
  },
  name: "EnrollStudent",
  data: () => ({
    selectedTab: 0,
    tabItems: [
      "General Details",
      "Contact Details",
      "Academic Details",
      "Bank Details",
    ],
    showSuccessMsg: false,
    showEnterStudentId: false,
    enteredStudentId: "",
    valid: false,
    studentIdRules: [(v) => !!v || "Student ID is Required"],
  }),
  computed: {
    ...mapGetters("StudentEnrollModule", [
      "getGeneralDetails",
      "getContactDetails",
      "getAcademicDetails",
      "getBankDetails",
    ]),
  },
  methods: {
    ...mapActions("StudentEnrollModule", [
      "getDropdownVal",
      "dispatchDropdown",
      "dropdownSetupCompleted",
      "saveGeneralDetail",
      "enrollStudent",
      "destroyStudentData",
    ]),
    ...mapActions("Common", ["startLoading", "stopLoading"]),
    async getAllStudentDropdown() {
      const data = await this.getDropdownVal();
      this.stopLoading();
      const arrList = [
        "dept",
        "gender",
        "nationality",
        "obcsub",
        "religion",
        "sem",
        "social",
        "state",
      ];
      arrList.forEach((item) => {
        if (item === "dept") this.setDropDown(data.data.department, "dept");
        else if (item === "gender")
          this.setDropDown(data.data.gender, "gender");
        else if (item === "nationality")
          this.setDropDown(data.data.nationality, "nationality");
        else if (item === "obcsub")
          this.setDropDown(data.data.obcsubcategory, "obcsub");
        else if (item === "religion")
          this.setDropDown(data.data.religion, "religion");
        else if (item === "social")
          this.setDropDown(data.data.socialcategory, "social");
        else if (item === "sem") this.setDropDown(data.data.semester, "sem");
        else if (item === "state") {
          this.setDropDown(data.data.states, "state");
          this.dropdownSetupCompleted();
          this.stopLoading();
          if (this.$route.query?.editStudent === "YES")
            this.showEnterStudentId = false;
        }
      });
    },
    async setDropDown(arr, name) {
      let dropDownArr = [];
      arr.forEach((item) => {
        const obj = {
          id: item.code,
          name: item.value,
        };
        if (name === "state") {
          obj.districts = item.districts;
          obj.id = item.valueRef;
        }
        dropDownArr.push(obj);
      });
      const req = {
        name: name,
        arr: dropDownArr,
      };
      await this.dispatchDropdown(req);
    },
    nextPage() {
      this.selectedTab += 1;
    },
    previousPage() {
      this.selectedTab -= 1;
    },
    async enrollStudentWithDetails() {
      console.log("compelete data");
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
          zipCode: contactDetails.residentialAddress.zipcode,
        },
        permanentAddress: {
          address: contactDetails.permanentAddress.address,
          state: contactDetails.permanentAddress.state,
          stateRef: contactDetails.permanentAddress.selectedState,
          districtRef: contactDetails.permanentAddress.selectedDistrict,
          district: contactDetails.permanentAddress.district,
          city: contactDetails.permanentAddress.city,
          zipCode: contactDetails.permanentAddress.zipcode,
        },
      };
      console.log("final student data", requestBody);
      if (this.$route.query.editStudent === "YES") {
        // const data = await this.patchStudentDetails(requestBody)
        console.log("calling edit student");
        this.showEnterStudentId = true;
        this.selectedTab = 0;
      } else {
        const data = await this.enrollStudent(requestBody);
        console.log(data);
        if (data.status === 200) {
          this.showSuccessMsg = true;
          this.stopLoading();
          this.destroyStudentData();
        }
      }
    },
    onClickYes() {
      location.reload();
    },
    onEnterStudentId() {
      // have to call get all student dropdown and then call get api for student details
      if (this.$refs.studentIdForm.validate()) {
        console.log("validated the form");
        this.getAllStudentDropdown();
      }
    },
  },
  created() {
    if (this.$route.query.editStudent === "YES") {
      this.showEnterStudentId = true;
    } else {
      this.getAllStudentDropdown();
    }
    /* eslint-disable */
    this.$watch(
      () => this.$route.query,
      (toQuery, previousQuery) => {
        // react to route changes...
        if (this.$route.query?.editStudent === "YES") {
          this.showEnterStudentId = true;
        } else {
          this.getAllStudentDropdown();
        }
      }
    );
  },
  destroyed() {
    this.destroyStudentData("clearDropdown");
  },
};
</script>
