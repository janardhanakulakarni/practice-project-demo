<template>
  <div>
    <v-row justify="center" class="px-16 mt-10">
      <v-col cols="4">
        <!-- <div class="label-text">Department</div> -->
        <v-form
          ref="firstCol"
          v-model="valid"
          @submit.prevent="compltedSecondStep"
        >
          <v-text-field
            class="mt-3"
            label="SSLC Registartion number"
            v-model="academicDetails.sslcRegNum"
            single-line
            :rules="fieldRules"
            solo
          ></v-text-field>
          <v-select
            class="mt-3"
            :items="pucOrDiploma"
            label="PUC/Dimploma"
            v-model="selectedPUC"
            :menu-props="{ top: false, offsetY: true }"
            item-value="id"
            item-text="name"
            solo
            @change="onSelectPU"
          ></v-select>
          <v-text-field
            v-if="showPUC"
            class="mt-3"
            label="PUC Registartion number"
            v-model="academicDetails.pucRegNum"
            single-line
            :rules="fieldRules"
            solo
          ></v-text-field>
          <v-text-field
            v-if="!showPUC"
            class="mt-3"
            label="Diploma Registartion number"
            v-model="academicDetails.diplomaRegNum"
            single-line
            :rules="fieldRules"
            solo
          ></v-text-field>
          <v-select
            class="mt-3"
            :items="seatTypes"
            label="Allocated seat through"
            :rules="selectRules"
            v-model="academicDetails.seatType"
            :menu-props="{ top: false, offsetY: true }"
            item-value="id"
            item-text="name"
            solo
          ></v-select>
        </v-form>
      </v-col>
      <v-col cols="4">
        <v-form
          ref="secondCol"
          v-model="valid"
          lazy-validation
          @submit.prevent="compltedSecondStep"
        >
          <v-text-field
            class="mt-3"
            label="SSLC Results"
            v-model="academicDetails.sslcResult"
            single-line
            :rules="fieldRules"
            solo
          ></v-text-field>
          <div class="mt-7 warning-text">
            <strong>
              Please select one option to enter PUC/Diploma results</strong
            >
          </div>
          <v-text-field
            v-if="showPUC"
            class="mt-13"
            label="PUC Results"
            v-model="academicDetails.pucResult"
            single-line
            :rules="fieldRules"
            solo
          ></v-text-field>
          <v-text-field
            v-if="!showPUC"
            class="mt-13"
            label="Diploma Results"
            v-model="academicDetails.diplomaResult"
            single-line
            :rules="fieldRules"
            solo
          ></v-text-field>
          <v-select
            class="mt-3"
            :items="quotas"
            label="Admission Quota"
            :rules="selectRules"
            v-model="academicDetails.admissionQuota"
            :menu-props="{ top: false, offsetY: true }"
            item-value="id"
            item-text="name"
            solo
          ></v-select>
        </v-form>
      </v-col>
    </v-row>
    <div align="center" class="mt-8 mb-6">
      <v-btn
        @click="goToContactDetails"
        large
        color="previous"
        class="submit-btn-color mr-5"
        >Previous</v-btn
      >
      <v-btn
        @click="compltedThirdStep"
        large
        color="primary"
        class="submit-btn-color"
        >Continue</v-btn
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
import { mapActions, mapGetters } from "vuex";
export default {
  name: "academicDetails",
  data: () => ({
    valid: false,
    pucOrDiploma: [
      {
        id: 1,
        name: "PUC",
      },
      {
        id: 2,
        name: "Diploma",
      },
    ],
    showPUC: true,
    seatTypes: [
      {
        id: 1,
        name: "KCET",
      },
      {
        id: 2,
        name: "JEE",
      },
      {
        id: 3,
        name: "COMEDK",
      },
      {
        id: 4,
        name: "Other",
      },
    ],
    quotas: [
      {
        id: 1,
        name: "Government",
      },
      {
        id: 2,
        name: "SNQ",
      },
      {
        id: 3,
        name: "Management",
      },
    ],
    selectedPUC: "",
    academicDetails: {
      sslcRegNum: "",
      pucRegNum: "",
      diplomaRegNum: "",
      seatType: "",
      sslcResult: "",
      pucResult: "",
      diplomaResult: "",
      admissionQuota: "",
    },
    fieldRules: [
      (v) => v !== "" || "This field is requried",
      (v) => v !== null || "This field is requried",
    ],
    selectRules: [
      (v) => v !== "" || "One selection is required",
      (v) => v !== null || "One selection is required",
    ],
  }),
  computed: {
    ...mapGetters("StudentEnrollModule", ["getAcademicDetails"]),
  },
  methods: {
    ...mapActions("StudentEnrollModule", ["saveAcademicDetail"]),
    onSelectPU() {
      if (this.selectedPUC === 1) this.showPUC = true;
      else this.showPUC = false;
    },
    compltedThirdStep() {
      if (this.$refs.firstCol.validate() && this.$refs.secondCol.validate()) {
        const academic = JSON.parse(JSON.stringify(this.academicDetails));
        this.saveAcademicDetail(academic);
        this.$emit("onClickContinue");
      }
    },
    goToContactDetails() {
      this.$emit("onClickPrevious");
    },
  },
  created() {
    console.log("in academics details");
  },
  mounted() {
    this.academicDetails = this.getAcademicDetails;
  },
};
</script>
