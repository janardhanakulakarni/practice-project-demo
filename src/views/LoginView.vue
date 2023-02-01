<template>
  <div align="center" >
    <div class="mt-14">
      <v-snackbar
              v-model="loginErr"
              absolute
              :min-width="100"
              :max-width="350"
              color="red"
              centered
              timeout="5000"
              top
            >
              {{ 'Entered username or password is invalid' }}
            </v-snackbar>
      <v-row justify="center" class="mx-12" style="background: #85B09A">
        <v-col cols="7">
          <v-card
            :loading="loading"
            class="ml-4 mt-4"
            min-width="300"
            height="700"
            style="background: #B6B6B6"
            :elevation="25 - 1"
          >
            <!-- <img
              style="position: relative; top: 8rem"
              height="400"
              width="450"
              src="./../assets/"
            /> -->
            <v-card-text style="position: absolute; bottom: 0">
              <v-row>
                <v-col
                  class="text-start mt-2"
                  cols="6"
                >
                  <span class="footer-content"><strong>E-IRIS</strong> v1.0</span>
                </v-col>
                <v-col
                  class="text-end mt-2"
                  cols="6"
                >
                  <span class="footer-content" style="top: 3px"><strong>All rights reserved @2023</strong></span>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="5">
          <v-card
            :elevation="25 - 1"
            :loading="loading"
            class="mr-1 ml-n10 mt-7 mb-4"
            min-width="300"
            height="700"
          >

            <!-- <v-row class="ml-4 pt-12" justify="center">
              <img
              width="60px"
              src="./../assets/logo_2.png"
              />
              <span class="ml-5"><h3><strong>E-IRIS</strong></h3><h6><strong>Powered by SKILL-DATA</strong></h6></span>
            </v-row> -->
            <v-row class="pt-12" justify="center">
              <span><h3><strong>WELCOME TO E-IRIS PORTAL</strong></h3></span>
            </v-row>
            <h4 class="mt-12"><strong>Please login to your account </strong></h4>
            <v-card
              :loading="loading"
              class="mx-15 my-4"
              min-width="300"
              :elevation="25 - 1"
              height="300"
              style="background-color: 	#85B09A"
            >
            <v-form class="mx-12 pt-8" ref="loginForm" v-model="valid" lazy-validation @submit.prevent="onClickLogin">
                
              <v-text-field :rules="emailRules" v-model="login.email" class="login-form" placeholder="Username or Email"></v-text-field>
              <!-- <v-text-field :rules="passwordRules" class="login-form" placeholder="Password"></v-text-field> -->
              <v-text-field
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="passwordRules"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Password"
                v-model="login.password"
                @click:append="showPassword = !showPassword"
              ></v-text-field>
            </v-form>
            <div align="start" class="ml-12 mt-4">
            <v-btn
              depressed
              @click="onClickLogin"
            >
              Login
            </v-btn>
            <div class="mt-2"><a href="www.google.com" _blank>Forgot Password</a>
            </div>
            </div>
            </v-card>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LoginPage',
    data: () =>({
      loading: false,
      selection: 1,
      valid: false,
      showPassword: false,
      loginErr: false,
      login: {
        email: '',
        password: ''
      },
      emailRules: [
        (v) => v !== '' || 'Username is requried',
        (v) => v !== null || 'Username is requried',
      ],
      passwordRules: [
        (v) => v !== '' || 'Password is requried',
        (v) => v !== null || 'Password is requried',
      ]
    }),
    methods: {
      onClickLogin() {
        if ((this.$refs.loginForm).validate()) {
          console.log(this.login);
          if (localStorage.getItem('username') === this.login.email && localStorage.getItem('password') === this.login.password) {
            this.$router.push('/user/about');
          } else {
            this.loginErr = true;
          }
        } 
      }
    },
    created() {
      localStorage.setItem('username', 'admin@gmail.com');
      localStorage.setItem('password', '1234567890');
    },
  }
</script>
<style scoped>
::v-deep .v-messages__message {
    color: white;
    font-weight: 700;
}
</style>