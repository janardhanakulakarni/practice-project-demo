<template>
  <v-app id="app" class="bg-screen">
    <router-view></router-view>
  </v-app>
</template>
<style lang="scss" scoped>
.bg-screen {
  background-color: #85b09a;
} 
</style>
<script>
// @ is an alias to /src
export default {
  name: 'App',
  data: () => ({
   }),
}
</script>