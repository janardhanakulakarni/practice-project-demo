<template>
  <div>
    <v-row justify="center" class="px-16 mt-10">
      <v-col cols="4">
        <!-- <div class="label-text">Department</div> -->
        <v-form
          ref="firstNameForm"
          v-model="valid"
          lazy-validation
          @submit.prevent="compltedFirstStep"
        >
          <v-row>
            <!-- <img style="height: 20vh; width: 10vw" :src="url" alt=""
                        />
                        <input 
                            type="file"
                            ref="myFile"
                            @input="uploadProfilePic"
                        />  -->
            <v-col cols="4">
              <v-select
                :items="titles"
                label="Title"
                v-model="generalDetails.selectedTitle"
                :menu-props="{ top: false, offsetY: true }"
                item-value="id"
                item-text="name"
                :rules="titleRules"
                solo
                @change="onChangeTitle"
              ></v-select>
            </v-col>
            <v-col cols="8">
              <v-text-field
                label="First Name"
                v-model="generalDetails.firstName"
                single-line
                :rules="nameRules"
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
            @change="onChangeGender"
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
            @change="onChangeRole"
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
            @change="onChangeReligion"
            solo
          ></v-select>
          <v-text-field
            label="User Email"
            v-model="generalDetails.userEmail"
            single-line
            :rules="emailRules"
            solo
          ></v-text-field>
          <v-select
            v-if="showObcSubCat"
            :items="obcSubCat"
            label="OBC Sub Category"
            v-model="generalDetails.selectedObcSub"
            :menu-props="{ top: false, offsetY: true }"
            item-value="id"
            item-text="name"
            :rules="selectRules"
            @change="onChangeObcSub"
            solo
          ></v-select>
        </v-form>
      </v-col>
      <v-col cols="4">
        <v-form
          ref="middleNameForm"
          v-model="valid"
          lazy-validation
          @submit.prevent="compltedFirstStep"
        >
          <v-text-field
            label="Middle Name"
            v-model="generalDetails.middleName"
            single-line
            :rules="[
              (v) => validateName(v) || 'Only alphabet and spaces are allowed',
            ]"
            solo
          ></v-text-field>
          <div class="dob-style mt-3" @click="showCalander = !showCalander">
            {{
              generalDetails.dob === ""
                ? "Date of birth"
                : generalDetails.formattedDOB
            }}
          </div>
          <v-date-picker
            v-if="showCalander"
            v-model="generalDetails.dob"
            full-width
            header-color="#85B09A"
            elevation="15"
            @change="onSelectDate"
          ></v-date-picker>
          <span class="field-err-message" v-if="showDOBerr"
            >Date of birth is required</span
          >
          <v-select
            class="mt-3"
            :class="[showDOBerr ? 'mt-4' : 'mt-10']"
            :items="departments"
            label="Department"
            v-model="generalDetails.selectedDepartment"
            :menu-props="{ top: false, offsetY: true }"
            :rules="selectRules"
            item-value="id"
            item-text="name"
            @change="onChangeDept"
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
            label="Username"
            v-model="generalDetails.username"
            single-line
            :rules="nameRules"
            solo
          ></v-text-field>
        </v-form>
      </v-col>
      <v-col cols="4">
        <v-form
          ref="lastNameForm"
          v-model="valid"
          lazy-validation
          @submit.prevent="compltedFirstStep"
        >
          <v-text-field
            label="Last Name"
            v-model="generalDetails.lastName"
            single-line
            :rules="nameRules"
            solo
          ></v-text-field>
          <v-select
            class="mt-3"
            :items="maritalStatus"
            label="Marital Status"
            v-model="generalDetails.selectedMaritalStatus"
            :menu-props="{ top: false, offsetY: true }"
            item-value="id"
            item-text="name"
            :rules="selectRules"
            @change="onChangeMariage"
            solo
          ></v-select>
          <v-select
            class="mt-3"
            :items="qualifications"
            label="Qualification"
            v-model="generalDetails.selectedQualification"
            :menu-props="{ top: false, offsetY: true }"
            item-value="id"
            :rules="selectRules"
            item-text="name"
            @change="onChangeQuali"
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
            @change="onChangeNation"
            :rules="selectRules"
            solo
          ></v-select>
          <v-row>
            <v-col cols="11">
              <v-text-field
                solo
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="fieldRules"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Password"
                v-model="generalDetails.password"
                @click:append="showPassword = !showPassword"
              ></v-text-field>
            </v-col>
            <v-col cols="1">
              <v-icon
                class="mt-3"
                medium
                color="grey-5"
                style="margin-left: -12px"
                @click="generatedPassword"
                >mdi-refresh-circle</v-icon
              >
            </v-col>
          </v-row>
        </v-form>
      </v-col>
      <div align="center" class="mt-8 mb-6">
        <v-btn
          @click="compltedFirstStep"
          large
          style="background: #85b09a"
          class="submit-btn-color"
          >Continue</v-btn
        >
      </div>
    </v-row>
    <div align="start" class="px-16 my-2">
      <span class="warning-text"
        ><h5>
          Note: Please remember <strong>EMAIL, USERNAME</strong> and
          <strong>PASSWORD</strong> to login.
        </h5></span
      >
    </div>
  </div>
</template>
<style scoped>
.dob-style {
  height: 48px;
  font-weight: 700;
  padding: 11px;
  border-radius: 5px;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
    0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
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
/* eslint-disable */
import { mapActions, mapGetters } from "vuex";
import { validateEmail, validateName } from "./../utils/validation";
export default {
  name: "GeneralDetails",
  data: () => ({
    url: "",
    departments: [],
    nationality: [],
    religions: [],
    socialCategories: [],
    obcSubCat: [],
    maritalStatus: [],
    genders: [],
    roles: [],
    titles: [],
    qualifications: [],
    showPassword: false,
    generalDetails: {
      selectedQualification: "",
      qualification: "",
      selectedDepartment: "",
      department: "",
      selectedMaritalStatus: "",
      mariageStatus: "",
      selectedTitle: "",
      title: "",
      selectedRole: "",
      role: "",
      firstName: "",
      middleName: "",
      lastName: "",
      selectedGender: "",
      gender: "",
      dob: "",
      formattedDOB: "",
      selectedNation: "",
      nation: "",
      selectedReligion: "",
      religion: "",
      selectedSocialCategory: "",
      socialCategory: "",
      selectedObcSub: "",
      obcSub: "",
      userEmail: "",
      username: "",
      password: "",
    },
    chars:
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*",
    showObcSubCat: false,
    showCalander: false,
    showDOBerr: "",
    valid: false,
    fieldRules: [
      (v) => !!v || "This field is requried",
      (v) => v !== null || "This field is requried",
    ],
    nameRules: [
      (v) => !!v || "This field is requreid",
      (v) => validateName(v) || "Only alphabet and spaces are allowed",
    ],
    selectRules: [
      (v) => !!v || "One selection is required",
      (v) => v !== null || "One selection is required",
    ],
    titleRules: [(v) => !!v || "Required", (v) => v !== null || "Required"],
    emailRules: [
      (v) => !!v || "Email is Required",
      (val) => validateEmail(val) || "Please enter correct email address",
    ],
  }),
  computed: {
    ...mapGetters("UserCreationModule", [
      "getUserGeneralDetails",
      "getDropDownCompletedVal",
      "getUserDropDownValues",
    ]),
  },
  watch: {
    getDropDownCompletedVal(newVal) {
      if (newVal) {
        this.setAllDropDownVals();
      }
    },
  },
  methods: {
    ...mapActions("UserCreationModule", ["saveUserGeneralDetail"]),
    ...mapActions("FileUpload", ["uploadFile", "getFile"]),
    validateEmail,
    validateName,
    setAllDropDownVals() {
      const arrList = [
        "dept",
        "gender",
        "nationality",
        "maritalStatus",
        "obcsub",
        "quali",
        "religion",
        "role",
        "social",
        "title",
      ];
      const data = this.getUserDropDownValues;
      arrList.forEach((name) => {
        if (name === "dept") this.departments = data[name];
        else if (name === "gender") this.genders = data[name];
        else if (name === "nationality") this.nationality = data[name];
        else if (name === "obcsub") this.obcSubCat = data[name];
        else if (name === "quali") this.qualifications = data[name];
        else if (name === "maritalStatus") this.maritalStatus = data[name];
        else if (name === "religion") this.religions = data[name];
        else if (name === "role") this.roles = data[name];
        else if (name === "social") this.socialCategories = data[name];
        else if (name === "title") this.titles = data[name];
      });
    },
    onChangeDept() {
      this.departments.forEach((item) => {
        if (this.generalDetails.selectedDepartment === item.id)
          this.generalDetails.department = item.name;
      });
    },
    onChangeMariage() {
      this.maritalStatus.forEach((item) => {
        if (this.generalDetails.selectedMaritalStatus === item.id)
          this.generalDetails.mariageStatus = item.name;
      });
    },
    onChangeTitle() {
      this.titles.forEach((item) => {
        if (this.generalDetails.selectedTitle === item.id)
          this.generalDetails.title = item.name;
      });
    },
    onChangeRole() {
      this.roles.forEach((item) => {
        if (this.generalDetails.selectedRole === item.id)
          this.generalDetails.role = item.name;
      });
    },
    onChangeGender() {
      this.genders.forEach((item) => {
        if (this.generalDetails.selectedGender === item.id)
          this.generalDetails.gender = item.name;
      });
    },
    onChangeQuali() {
      this.qualifications.forEach((item) => {
        if (this.generalDetails.selectedQualification === item.id)
          this.generalDetails.qualification = item.name;
      });
    },
    onChangeNation() {
      this.nationality.forEach((item) => {
        if (this.generalDetails.selectedNation === item.id)
          this.generalDetails.nation = item.name;
      });
    },
    onChangeReligion() {
      this.religions.forEach((item) => {
        if (this.generalDetails.selectedReligion === item.id)
          this.generalDetails.religion = item.name;
      });
    },
    onChangeObcSub() {
      this.obcSubCat.forEach((item) => {
        if (this.generalDetails.selectedObcSub === item.id)
          this.generalDetails.obcSub = item.name;
      });
    },
    generatedPassword() {
      let temp = "";
      for (let i = 0; i < 8; i++) {
        let randomPassword = Math.floor(Math.random() * this.chars.length);
        temp += this.chars.substring(randomPassword, randomPassword + 1);
      }
      this.generalDetails.password = temp;
      console.log(temp);
    },
    uploadProfilePic() {
      console.log(this.$refs.myFile.files);
      const req = {
        fileBlob: this.$refs.myFile.files[0],
        folderAndName: "userProfile/emailofuser",
      };
      this.uploadFile(req);
    },
    async getProfilePic() {
      const req = {
        folderAndName: "userProfile/emailofuser",
      };
      const profileUrl = await this.getFile(req);
      this.url = profileUrl;
      console.log("printing url", profileUrl);
    },
    onChangeSocialCat() {
      this.generalDetails.selectedObcSub = "";
      if (this.generalDetails.selectedSocialCategory === 2)
        this.showObcSubCat = true;
      else this.showObcSubCat = false;
      this.socialCategories.forEach((item) => {
        if (this.generalDetails.selectedSocialCategory === item.id)
          this.generalDetails.socialCategory = item.name;
      });
    },
    onSelectDate() {
      this.showDOBerr = false;
      if (!this.generalDetails.dob) return null;
      const [year, month, date] = this.generalDetails.dob.split("-");
      this.generalDetails.formattedDOB = `${date}/${month}/${year}`;
      this.showCalander = false;
    },
    compltedFirstStep() {
      // this.$emit('onClickContinue');
      if (
        this.$refs.firstNameForm.validate() &&
        this.$refs.middleNameForm.validate() &&
        this.$refs.lastNameForm.validate()
      ) {
        if (
          this.generalDetails.formattedDOB === "" ||
          this.generalDetails.dob === ""
        )
          this.showDOBerr = true;
        else {
          this.saveUserGeneralDetail(this.generalDetails);
          this.$emit("onClickContinue");
        }
      }
    },
  },
  created() {
    this.setAllDropDownVals();
  },
  mounted() {
    this.generalDetails = this.getUserGeneralDetails;
    this.getProfilePic();
  },
};
</script>
