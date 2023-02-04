/* eslint-disable */
import Vue from 'vue'
import VueRouter from 'vue-router'
import { getToken } from './../utils/localStorage'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    beforeEnter: (to, from, next) => {
      next({ name: 'login'})
    },
    path: '/',
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('./../layouts/InactiveLayout.vue'),
    beforeEnter: (to, from, next) => {
      getToken() ? next({ name: 'home'}) : next()
    },
    children: [
      {
        path: 'login',
        name: 'login',
        component: LoginView,
      }
    ]
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('./../layouts/ActiveLayout.vue'),
    beforeEnter: (to, from, next) => {
      getToken() ? next() : next({ name: 'login'})
    },
    children: [
      {
        path: 'home',
        name: 'home',
        component: HomeView,
      },
      {
        path: 'about',
        name: 'about',
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
      },
      {
        path: 'createUser',
        name: 'createUser',
        component: () => import(/* webpackChunkName: "about" */ '../views/CreateUser.vue')
      },
      {
        path: 'studentEnroll',
        name: 'studentEnroll',
        component: () => import(/* webpackChunkName: "about" */ '../views/StudentEnroll.vue')
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
