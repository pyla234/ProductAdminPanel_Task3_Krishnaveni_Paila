import { createStore } from "vuex";

export default createStore({
  state: {
    products: [],
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    updateProduct(state, updated) {
      const index = state.products.findIndex((p) => p.id === updated.id);
      if (index !== -1) {
        state.products[index] = updated;
      }
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      const productsWithTax = data.map((product) => ({
        ...product,
        taxRate: 0,
      }));
      commit("setProducts", productsWithTax);
    },
  },
  getters: {
    getProductById: (state) => (id) => state.products.find((p) => p.id == id),
  },
});
