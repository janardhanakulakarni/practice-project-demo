<template>
  <div>
    <v-main>
      <router-view/>
    </v-main>
    <div class="blocking-container" v-if="getLoadingStatus">
      <v-progress-circular
        class="spinner-image"
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Inactive-layout',
  data: () => ({
  }),
    computed: {
    ...mapGetters('Common', ['getLoading']),
    get getLoadingStatus() {
      console.log('printing isLoading', this.getLoading);
      return this.getLoading
    }
  },
}
</script>
<style lang="scss" scoped>
.blocking-container {
  position: absolute;
  top: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(128, 128, 128, 0.4);
  z-index: 9999;
  .spinner-image {
    z-index: 9999;
    position: absolute;
    top: 47%;
    left: 50%;
  }
}
</style>