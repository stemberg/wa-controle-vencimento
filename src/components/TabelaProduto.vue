<script setup>
import {
  abrirModalNovoProduto,
  abrirModalEditarProduto,
} from "@/utils/modalConfig";
import ProdutoAPI from "@/services/ProdutoAPI";
import { computed, onBeforeMount, onMounted, ref } from "vue";
import ModalConfirmar from "./ModalConfirmar.vue";
import store from "@/store";

const modal = ref("");
const modalConfirm = ref("");
const searchInput = ref("");

const produtos = computed(() => store.getters["produtoModule/getData"]);

function editarProduto(produto) {
  abrirModalEditarProduto(modal.value, produto);
}

function excluirProduto() {
  modalConfirm.value = document
    .querySelector("#modal-confirm")
    .classList.add("is-active");
}

function formatarMes(mes) {
  const [mesNumero, ano] = mes.split("/");
  const mesTexto = new Date(ano, mesNumero - 1, 1).toLocaleString("default", {
    month: "long",
    year: "numeric",
  });
  return mesTexto.replace(" de", " /").toUpperCase();
}

const produtosFiltrados = computed(() => {
  const filtro = searchInput.value.toLowerCase().trim();
  if (filtro === "") {
    return produtos.value;
  } else {
    return produtos.value.filter((mesProdutos) => {
      return mesProdutos.produtos.some((produto) => {
        return Object.values(produto).some((valor) => {
          if (typeof valor === "string") {
            return valor.toLowerCase().includes(filtro);
          }
          if (Array.isArray(valor)) {
            return valor.some((item) =>
              String(item).toLowerCase().includes(filtro)
            );
          }
          return false;
        });
      });
    });
  }
});

onBeforeMount(() => {
  ProdutoAPI.getProdutos();
});

onMounted(() => {
  modal.value = document.querySelector("#modal-produto");
  modalConfirm.value = document.querySelector("#modal-confirm");
});
</script>

<template>
  <div class="table-container overflow-container">
    <div class="button-container">
      <button
        class="button main-button is-medium"
        @click="abrirModalNovoProduto(modal)"
      >
        Novo Produto
      </button>

      <input
        class="search-input"
        type="text"
        v-model="searchInput"
        placeholder="Pesquisar"
      />
    </div>

    <br />
    <div class="table-scroll">
      <div v-for="(mesProdutos, index) in produtosFiltrados" :key="index">
        <h2 class="month-heading">{{ formatarMes(mesProdutos.mes) }}</h2>

        <table class="styled-table" id="data-table">
          <thead class="table-header">
            <tr>
              <th class="values-headers">
                <span class="table-header-text">Nome</span>
              </th>
              <th class="values-headers">
                <span class="table-header-text">Vencimento</span>
              </th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(produto, index) in mesProdutos.produtos"
              :key="produto.id"
              :class="index % 2 === 0 ? 'row-even' : 'row-odd'"
            >
              <td class="row-values">
                {{ produto.nome }}
              </td>

              <td class="row-values">
                {{
                  produto.datasVencimento.map((date) => date + " ").join(", ")
                }}
              </td>

              <td class="row-values">
                <button
                  class="button edit-button"
                  @click="editarProduto(produto)"
                >
                  Editar
                </button>
              </td>
              <td class="row-values">
                <button class="button delete-button" @click="excluirProduto()">
                  Excluir
                </button>
              </td>
              <ModalConfirmar :id="produto.id" />
            </tr>
          </tbody>
        </table>
        <br />
      </div>
    </div>
  </div>
</template>

<style scoped>
.month-heading {
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 10px;
  color: #ffffff;
}

.table-container {
  width: 100%;
  height: 100%;
  background-color: #333333;
  padding-bottom: 0;
  padding-top: 30px;
  padding-left: 15px;
  padding-right: 15px;
  box-sizing: border-box;
}

.overflow-container {
  overflow: auto;
}

.button-container {
  display: flex;
  align-items: center;
}

.button {
  background-color: #4c4c4c;
  color: #ffff;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button:hover {
  background-color: #f2f2f2;
}

.main-button {
  font-weight: bold;
  margin-right: 15px;
}

.edit-button {
  background-color: #4c4c4c;
  border: 1px solid #ffff;
  color: #ffffff;
}

.delete-button {
  background-color: #4c4c4c;
  border: 1px solid #ffff;
  color: #ffffff;
}

.styled-table {
  border: 1px solid #616060;
  border-collapse: collapse;
  font-size: 1rem;
  width: 100%;
}

.table-header {
  color: #333333;
}

.table-header-text {
  color: #ffffff;
}

th,
td {
  padding: 12px 15px;
  color: #ffffff;
}

.row-even {
  background-color: #4c4c4c;
}

.row-odd {
  background-color: #333333;
}

td:first-child {
  border-radius: 4px 0 0 4px;
}

td:last-child {
  border-radius: 0 4px 4px 0;
}

.search-input {
  flex-grow: 1;
  margin-right: 15px;
  padding: 15px;
  border-radius: 4px;
  border: none;
  font-size: 15px;
  color: #ffffff;
  background-color: #4c4c4c;
}

.search-input::placeholder {
  color: #cccccc;
}

.search-input:focus {
  border: none;
  outline: none;
}
</style>
