/* eslint-disable */
const state = {
  isLoading: false,
};

const getters = {
  getLoading: (state) => {
    return state.isLoading;
  },
};

const actions = {
  async startLoading({ commit }) {
    commit("setLoadingToTrue");
  },
  async stopLoading({ commit }) {
    commit("setLoadingToFalse");
  },
};

const mutations = {
  setLoadingToTrue(state) {
    console.log("caling set loading");
    state.isLoading = true;
  },
  setLoadingToFalse(state) {
    state.isLoading = false;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
