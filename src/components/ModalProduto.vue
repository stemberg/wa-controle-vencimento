<script setup>
import ProdutoAPI from "@/services/ProdutoAPI";
import store from "@/store";
import { fecharModal } from "@/utils/modalConfig";
import toast from "@/utils/toastConfig";
import { onMounted, ref, computed } from "vue";

const acao = computed(() => store.state.acaoModal);
const produto = computed(() => store.state.produtoSelecionado);
const modal = ref("");
const title = computed(() => `${store.state.acaoModal} produto`);
const erro = computed(() => store.state.erros);
const loading = ref(false);

function confirmar() {
  if (acao.value === "Cadastrar") {
    cadastrarProduto();
  }
  if (acao.value === "Editar") {
    editarProduto();
  }
}

function cadastrarProduto() {
  loading.value = true;

  const novoProduto = {
    nome: produto.value.nome,
    datasVencimento: produto.value.datasVencimento,
  };

  ProdutoAPI.postProduto(novoProduto).then(() => {
    loading.value = false;
    if (erro.value) {
      return toast.abrirToast(
        "error",
        "Não foi possível cadastrar esse produto."
      );
    }
    fecharModal(modal.value);
    toast.abrirToast("success", "Produto cadastrado com sucesso!");
  });
}

function editarProduto() {
  loading.value = true;

  ProdutoAPI.editProduto(produto.value).then(() => {
    loading.value = false;
    if (erro.value) {
      return toast.abrirToast("error", "Não foi possível editar esse produto.");
    }
    fecharModal(modal.value);
    toast.abrirToast("success", "Produto editado com sucesso!");
  });
}

function adicionarDataVencimento() {
  produto.value.datasVencimento.push("");
}


onMounted(() => {
  modal.value = document.querySelector("#modal-produto");
});
</script>

<template>
  <div class="modal" id="modal-produto">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ title }}</p>
        <button class="delete" aria-label="close" @click="fecharModal(modal)"></button>
      </header>
      <section class="modal-card-body">
        <form class="form">
          <div class="field">
            <div class="field-label is-normal">
              <label class="label" style="text-align: left;">Nome</label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <input required type="text" v-model="produto.nome" class="input" />
                </div>
              </div>
            </div>
          </div>
          <div class="field" v-for="(data, index) in produto.datasVencimento" :key="index">
            <div class="field-label is-normal">
              <label class="label" style="text-align: left;">Data de Vencimento {{ index + 1 }}</label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <input required v-mask="'##/##/####'" type="text" v-model="produto.datasVencimento[index]" class="input" />
                </div>
              </div>
            </div>
          </div>
          <button class="button" @click.prevent="adicionarDataVencimento()">Adicionar Data de Vencimento</button>
        </form>
      </section>
      <footer class="modal-card-foot is-flex">
        <button v-if="!loading" class="button ml-auto" @click="confirmar()">{{ title }}</button>
        <button class="button is-primary is-loading" v-if="loading"></button>
        <button class="button" @click="fecharModal(modal)">Cancelar</button>
      </footer>
    </div>
  </div>
</template>



<style>
.radio-group {
  display: flex;
  gap: 2rem;
}

.radio {
  margin-top: 10px;
}
</style>
