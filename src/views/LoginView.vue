<template>
  <div align="center" >
    <div>
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
      <v-row justify="center" style="background: #85B09A; height: 100vh">
        <v-col cols="7" style="margin-top:5vh">
          <v-card
            :loading="loading"
            class="ml-4 mt-4"
            min-width="300"
            height="85vh"
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
        <v-col cols="5" style="margin-top: 5vh">
          <v-card
            :elevation="25 - 1"
            :loading="loading"
            class="mr-1 ml-n11 mt-7 mb-4"
            min-width="300"
            height="85vh"
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
              width="26vw"
              :elevation="25 - 1"
              height="28vh"
              style="background-color: 	#85B09A"
            >
            <v-form class="mx-12 pt-2" ref="loginForm" v-model="valid" lazy-validation @submit.prevent="onClickLogin">
              <v-text-field 
                :rules="emailRules" 
                v-model="login.email" 
                class="login-form" 
                placeholder="Username or Email">
              </v-text-field>
              <v-text-field
                class="mt-n2"
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
import { mapActions } from 'vuex'
import { validateEmail } from './../utils/validation'
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
        (v) => validateEmail(v) || 'Invalid Email format',
      ],
      passwordRules: [
        (v) => v !== '' || 'Password is requried',
        (v) => v !== null || 'Password is requried',
      ]
    }),
    methods: {
      ...mapActions('UserAuth', ['accountLogin']),
      validateEmail,
      async onClickLogin() {
        if ((this.$refs.loginForm).validate()) {
          console.log(this.login);
          const base32 = require('hi-base32');
          const hashedPw = base32.encode(this.login.password);
          const chunks = [];
          for (let i = 0; i<hashedPw.length; i += 4 ) {
            chunks.push(hashedPw.substring(i, i + 4));
          }
          const encPW = chunks.join('-');
          const req = {
            email: this.login.email,
            password: encPW
          }
          await this.accountLogin(req)
        } 
      }
    }
  }
</script>
<style scoped>
::v-deep .v-messages__message {
    color: white;
    font-weight: 700;
}
</style>