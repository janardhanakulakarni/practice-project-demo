<template>
    <div class="splash-screen-content">
        <v-card
            :elevation="25 - 1"
            width="50vw"
            min-height="60vh"
            :hover="true"
            outlined
        >
            <div align="center">
            <img
            width="100%"
            height="300vh"
            src="./../assets/SD_Logo2.jpeg"
            />
            </div>
            <div class="mx-5 mt-5"><h2> About Us</h2></div>
            <div class="mx-5"><p>Our goal is to be a long-term partner for you. 
                Our experts will assist in selecting the appropriate system, guide you through the implimentation process and ongoing support for your institution.
                This will help to improve finacial management and allow you to focus on the wider picture.
            </p></div>

            <v-card-actions class="mt-8">
            <v-btn
                text
            >
                <a href="mailto:janardhanakulakarni@gmail.com" target="_blank">Contact Us</a>
            </v-btn>
            <v-spacer></v-spacer>
                <v-btn large style="background: #85B09A" class="mr-4 submit-btn-color" @click="goToLogin">
                    <h2>Get Started</h2>
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>
<style scoped>

</style>
<script>
import router  from '@/router';
export default {
    name: 'SplashScreenPage',
    data: () =>({
    }),
    methods: {
        goToLogin() {
            router.push({name: 'login'});
        }
    }
}
</script>
