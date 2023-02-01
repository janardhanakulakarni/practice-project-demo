<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      app
      width="350"
    >
    <v-list>
      <v-list-group
        v-for="item in items"
        :key="item.title"
        v-model="item.active"
        :prepend-icon="item.action"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="child in item.items"
          :key="child.title"
          :to="child.to"
          @click="drawer = false"
        >
        <v-list-item-icon>
            <v-icon v-text="'mdi-hand-pointing-right'"></v-icon>
          </v-list-item-icon>
          <v-list-item-content class="ml-n6">
            <v-list-item-title v-text="child.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Skill Data Tech</v-toolbar-title>
    </v-app-bar>
    
    <v-footer app>
      <v-row>
        <v-col
          class="text-start mt-2"
          cols="6"
        >
          <span class="footer-content"><strong>E-IRIS</strong> v1.0</span>
        </v-col>
        <v-col
          class="text-end "
          cols="6"
        >
          <span class="footer-content" style="top: 3px"><strong>All rights reserved @2023</strong></span>
        </v-col>
      </v-row>
    </v-footer>
    <v-main>
      <router-view/>
    </v-main>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'App',
  data: () => ({
    drawer: false,
      items: [
        {
          action: 'mdi-home',
          items: [],
          title: 'HOME',
        },
        {
          action: 'mdi-shield-account-variant',
          items: [{ title: 'Create User', to: 'createUser' }, { title: 'Delete User' }],
          title: 'ADMIN',
        },
        {
          action: 'mdi-account-group',
          active: true,
          items: [{ title: 'Create User', to: 'createUser' }, { title: 'Edit User Details' }],
          title: 'STAF MANAGEMENT',
        },
        {
          action: 'mdi-account',
          items: [{ title: 'Enroll Student', to: 'studentEnroll' }, { title: 'Edit Student Details' }],
          title: 'STUDENT MANAGEMENT',
        },
        {
          action: 'mdi-account-card',
          items: [],
          title: 'ACCOUNT SECTION',
        },
        {
          action: 'mdi-cradle',
          items: [],
          title: 'LEAVE MANAGEMENT',
        },
        {
          action: 'mdi-cog',
          items: [{ title: 'Logout', to: '/login' }, { title: 'Terms & Conditions' }],
          title: 'SETTINGS',
        },
      ],
  }),
  methods: {
  }
}
</script>