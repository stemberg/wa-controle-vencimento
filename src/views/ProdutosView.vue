<script setup>
import ModalProduto from "@/components/ModalProduto.vue";
import TabelaProduto from "@/components/TabelaProduto.vue";
</script>

<template>
  <div class="produtos-container">
    <TabelaProduto />
    <ModalProduto />
  </div>
</template>

<style scoped>
.produtos-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
