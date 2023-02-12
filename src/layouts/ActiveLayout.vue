<template>
  <div>
    <v-navigation-drawer v-model="drawer" app width="350" class="drawer-cls">
      <v-list>
        <v-list-group
          v-for="item in items"
          :key="item.title"
          v-model="item.active"
          :prepend-icon="item.action"
          class="drawerText--text"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title
                class="drawerText--text"
                v-text="item.title"
              ></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="child in item.items"
            :key="child.title"
            :to="child.to"
            @click="onClickSideNavOpt(child)"
          >
            <v-list-item-icon>
              <v-icon
                class="drawerText--text"
                v-text="'mdi-hand-pointing-right'"
              ></v-icon>
            </v-list-item-icon>
            <v-list-item-content class="ml-n6">
              <v-list-item-title v-text="child.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app class="header-cls">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>E-IRIS Portal</v-toolbar-title>
    </v-app-bar>

    <div class="footer-cls">
      <v-row>
        <v-col class="text-start px-5 mt-1" cols="6">
          <div class="footer-content">
            <p><strong>E-IRIS</strong> v1.0</p>
          </div>
        </v-col>
        <v-col class="text-end pr-8 mt-1" cols="6">
          <span class="footer-content"
            ><p><strong>All rights reserved @2023</strong></p></span
          >
        </v-col>
      </v-row>
    </div>
    <v-main>
      <router-view />
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
// @ is an alias to /src
import { mapGetters, mapActions } from "vuex";
export default {
  name: "App",
  data: () => ({
    drawer: false,
    items: [
      {
        action: "mdi-home",
        items: [],
        title: "HOME",
      },
      {
        action: "mdi-shield-account-variant",
        items: [
          { title: "Create User", to: "createUser" },
          { title: "Delete User" },
        ],
        title: "ADMIN",
      },
      {
        action: "mdi-account-group",
        active: true,
        items: [
          { title: "Create User", to: "createUser" },
          { title: "Edit User Details" },
        ],
        title: "STAF MANAGEMENT",
      },
      {
        action: "mdi-account",
        items: [
          { title: "Enroll Student", to: "studentEnroll" },
          { title: "Edit Student Details" },
        ],
        title: "STUDENT MANAGEMENT",
      },
      {
        action: "mdi-account-card",
        items: [],
        title: "ACCOUNT SECTION",
      },
      {
        action: "mdi-cradle",
        items: [],
        title: "LEAVE MANAGEMENT",
      },
      {
        action: "mdi-cog",
        items: [{ title: "Logout" }, { title: "Terms & Conditions" }],
        title: "SETTINGS",
      },
    ],
  }),
  computed: {
    ...mapGetters("Common", ["getLoading"]),
    get getLoadingStatus() {
      console.log("printing isLoading", this.getLoading);
      return this.getLoading;
    },
  },
  methods: {
    ...mapActions("UserAuth", ["logout"]),
    onClickSideNavOpt(obj) {
      this.drawer = false;
      console.log(obj);
      if (obj.title === "Logout") this.logout();
    },
  },
};
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
.drawer-cls {
  background: #006064;
}
.header-cls {
  background: #006064;
  font-size: 900;
}
.footer-cls {
  position: fixed;
  bottom: 0;
  width: 100vw;
  font-size: 12px;
  height: 24px;
  background-color: #006064;
}
::v-deep .v-toolbar__content,
.v-toolbar__extension .v-btn.v-btn--icon.v-size--default {
  background: #006064;
  color: #fff;
  font-weight: 800;
}
::v-deep .v-toolbar__content .v-btn.v-btn--icon.v-size--default,
.v-toolbar__extension .v-btn.v-btn--icon.v-size--default {
  color: #fff;
}
</style>
