// import Vuex from 'vuex'
// import Vue from 'vue'
// Vue.use(Vuex)
// const state = {
//   count: 0
// }
// const mutations = {
//   increment (state) {
//     state.count++
//     console.log('hello world', state.count);
//   },
//   decrement (state) {
//     state.count--
//     console.log('hello ', state.count);
//   }
// }
// const actions = {
//   increment: ({ commit }) => commit('increment'),
//   decrement: ({ commit }) => commit('decrement'),
//   incrementIfOdd ({ commit, state }) {
//     if ((state.count + 1) % 2 === 0) {
//       commit('increment')
//     }
//   },
// }
// const getters = {
//   evenOrOdd: state => state.count % 2 === 0 ? 'even' : 'odd'
// }
// export default new Vuex.Store({
//   state,
//   getters,
//   actions,
//   mutations
// })
import Vue from 'vue'
import Vuex from 'vuex'
import StudentEnrollModule from './modules/StudentEnrollModule'
import UserCreationModule from './modules/UserCreationModule'
import UserAuth from './modules/UserAuth'
import FileUpload  from './modules/FileUpload'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        UserAuth: UserAuth,
        StudentEnrollModule: StudentEnrollModule,
        UserCreationModule: UserCreationModule,
        FileUpload: FileUpload
    }
})