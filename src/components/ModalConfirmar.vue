<script setup>
import ProdutoAPI from "@/services/ProdutoAPI";
import { onMounted, computed, defineProps, ref } from "vue";
import store from "@/store";
import { fecharModal } from "@/utils/modalConfig";
import toast from "@/utils/toastConfig";

const props = defineProps({ id: String });
const modal = ref("");
const modalConfirm = ref("");

const erro = computed(() => store.state.erros);
const loading = ref(false);

function deletarProduto(id) {
  loading.value = true;

  ProdutoAPI.deleteProduto(id).then(() => {
    loading.value = false;
    if (erro.value) {
      return toast.abrirToast(
        "error",
        "Não foi possível deletar esse produto."
      );
    }
    fecharModal(modalConfirm.value);
    toast.abrirToast("success", "Produto excluído com sucesso!");
  });
}

onMounted(() => {
  modalConfirm.value = document.querySelector("#modal-confirm");
  modal.value = document.querySelector("#modal-produto");
});
</script>

<template>
    <div class="modal" id="modal-confirm">
        <div class="modal-background"></div>
        <div class="modal-card">
            <section class="modal-card-body">
                <p class="modal-card-title">Deseja realmente excluir esse produto?</p>
            </section>
            <footer class="modal-card-foot">
                <button v-if="!loading" class="button delete-button" @click="deletarProduto(props.id)">
                    Excluir
                </button>
                <button class="button is-primary is-loading" v-if="loading"></button>
                <button class="button" @click=fecharModal(modalConfirm) :disabled="loading">Cancelar</button>
            </footer>
        </div>
    </div>
</template>
