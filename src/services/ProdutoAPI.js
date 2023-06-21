import store from "@/store";
import http from "./config";


// const produtos = computed(() => store.getters["produtoModule/getData"]);

const ProdutoAPI = {
  async getProdutos() {
    return http
      .get("/produto")
      .then((response) => {
        store.commit("produtoModule/setData", response.data);
        store.commit("setErros", "");
      })
      .catch((error) => store.commit("setErros", error));
  },
  async postProduto(produto) {
    return http
      .post("/produto", {
        nome: produto.nome,
        datasVencimento: produto.datasVencimento,
      })
      .then((response) => {
        store.commit("setErros", "");
        this.getProdutos();
        return response;
      })
      .catch((error) => store.commit("setErros", error));
  },
  async editProduto(dados) {
    return http
      .put(`/produto/editar/${dados.id}`, {
        nome: dados.nome,
        datasVencimento: dados.datasVencimento,
      })
      .then(() => {
        store.commit("setErros", "");
        this.getProdutos();
      })
      .catch((error) => store.commit("setErros", error));
  },
  async deleteProduto(id) {
    return http
      .delete(`/produto/deletar/${id}`)
      .then(() => {
        store.commit("produtoModule/deleteProduto", id);
        store.commit("setErros", "");
        this.getProdutos();
      })
      .catch((error) => store.commit("setErros", error));
  },
};

export default ProdutoAPI;