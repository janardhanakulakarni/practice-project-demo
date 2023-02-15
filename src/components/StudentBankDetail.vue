<template>
  <div>
    <v-row justify="center" class="px-16 mt-10">
      <v-col cols="8">
        <v-text-field
          class="mt-3"
          label="Bank Account number"
          v-model="bankDetails.accNumber"
          single-line
          solo
        ></v-text-field>
        <v-text-field
          class="mt-3"
          label="Bank Name"
          v-model="bankDetails.bankName"
          single-line
          solo
        ></v-text-field>
        <v-text-field
          class="mt-3"
          label="Bank IFSC Code"
          v-model="bankDetails.bankIfsc"
          single-line
          solo
        ></v-text-field>
      </v-col>
    </v-row>
    <div align="center" class="mt-8 mb-6">
      <v-btn
        @click="goToAcademicDetails"
        large
        color="previous"
        class="submit-btn-color mr-5"
        >Previous</v-btn
      >
      <v-btn
        @click="compltedFourthStep"
        large
        color="primary"
        class="submit-btn-color"
        >Finish</v-btn
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
  name: "bankDetails",
  data: () => ({
    bankDetails: {
      accNumber: "",
      bankName: "",
      bankIfsc: "",
    },
  }),
  computed: {
    ...mapGetters("StudentEnrollModule", ["getBankDetails"]),
  },
  methods: {
    ...mapActions("StudentEnrollModule", ["saveBankDetail"]),
    async compltedFourthStep() {
      const bankInfo = JSON.parse(JSON.stringify(this.bankDetails));
      await this.saveBankDetail(bankInfo);
      this.$emit("onClickFinish");
    },
    goToAcademicDetails() {
      this.$emit("onClickPrevious");
    },
  },
  created() {
    console.log("ins bank details");
  },
  mounted() {
    this.bankDetails = this.getBankDetails;
  },
};
</script>
