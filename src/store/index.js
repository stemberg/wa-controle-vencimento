import { createStore } from "vuex";
import produtoModule from "./modules/produtoModule.js";
import VuexPersistence from "vuex-persist";

const vuexLocal = new VuexPersistence({ storage: window.localStorage });

const store = createStore({
  state: {
    acaoModal: "",
    erros: "",
    produtoSelecionado: {
      id: "",
      nome: "",
      datasVencimento: []
    }
  },
  getters: {
    getProdutoSelecionado(state) {
      return state.produtoSelecionado;
    }
  },
  mutations: {
    setErros(state, payload) {
      state.erros = payload;
    },
    setAcaoModal(state, payload) {
      state.acaoModal = payload;
    },
    setProdutoSelecionado(state, payload) {
      return state.produtoSelecionado = payload
    },
  },
  actions: {},
  modules: {
    produtoModule,
  },
  plugins: [vuexLocal.plugin],
});

export default store;
