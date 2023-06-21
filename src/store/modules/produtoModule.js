export default {
    namespaced: true,
    state: {
      produtos: {}
    },
    getters: {
      getData(state) {
        return state.produtos;
      }
    },
    mutations: {
      setData(state, payload) {
        state.produtos = payload;
      },
    },
  };
  