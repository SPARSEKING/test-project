import { getters } from "./getters";
import { mutations } from "./mutations";
import { actions } from "./actions";

export const state = {
  categoriesWithProducts: [],
  cart: [],
  exchangeRate: 75
};

export const shop = {
  state,
  getters,
  mutations,
  actions
};