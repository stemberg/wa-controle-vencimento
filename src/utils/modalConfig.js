import store from "@/store";
import ProdutoAPI from "@/services/ProdutoAPI";

export const abrirModal = (modal) => {
  modal.classList.add("is-active");
};

export const fecharModal = (modal) => {
  modal.classList.remove("is-active");

  ProdutoAPI.getProdutos();
};

export const abrirModalNovoProduto = (modal) => {
  store.commit("setAcaoModal", "Cadastrar");
  store.commit("setProdutoSelecionado", {
    id: "",
    nome: "",
    datasVencimento: [""],
  });

  modal.classList.add("is-active");
};

export const abrirModalEditarProduto = (modal, produto) => {
  store.commit("setAcaoModal", "Editar");
  store.commit("setProdutoSelecionado", {
    id: String(produto.id),
    nome: String(produto.nome),
    datasVencimento: produto.datasVencimento,
  });

  abrirModal(modal);
};
