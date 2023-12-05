import Vue from "vue";
import Vuex from "vuex";
import { shop } from "./modules/shop/index";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
   shop
  }
});