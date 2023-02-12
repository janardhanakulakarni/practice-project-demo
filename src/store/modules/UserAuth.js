/* eslint-disable */
import axiosrequest from "@/api";
import router from "@/router";
import { setItems, clearStorage } from "@/utils/localStorage";
const state = {
  profileData: {},
};

const getters = {};

const actions = {
  async accountLogin({ commit }, request) {
    try {
      commit("Common/setLoadingToTrue", null, { root: true });
      const { data } = await axiosrequest.post("/auth/login", request);
      commit("setProfileData", data.userDetails);
      const userDetails = {
        email: data.userDetails.email,
        username: data.userDetails.userName,
        firstName: data.userDetails.firstName,
        lastName: data.userDetails.lastName,
        roles: data.userDetails.role,
      };
      const dataToStore = {
        userDetails: JSON.stringify(userDetails),
        token: data.access_token,
      };
      // localStorage.setItem('userDetails', JSON.stringify(userDetails));
      // localStorage.setItem('token', data.access_token);
      setItems(dataToStore);
      commit("Common/setLoadingToFalse", null, { root: true });
      router.push({ name: "home" });
    } catch (err) {
      console.error(err);
    } finally {
      commit("Common/setLoadingToFalse", null, { root: true });
    }
  },
  async logout({ commit }) {
    try {
      commit("Common/setLoadingToTrue", null, { root: true });
      const { data } = await axiosrequest.post("/auth/logout");
      console.log(data);
      if (data.status === "success" && data.statusCode === 200) {
        clearStorage();
        commit("Common/setLoadingToFalse", null, { root: true });
        router.push({ name: "login" });
      } else {
        commit("Common/setLoadingToFalse", null, { root: true });
      }
    } catch (error) {
      console.error(error);
    } finally {
      commit("Common/setLoadingToFalse", null, { root: true });
    }
  },
};

const mutations = {
  setProfileData(state, details) {
    state.profileData = details;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
