import { useToast } from "vue-toastification";

const newToast = useToast();

const toast = {
  abrirToast(tipo, mensagem) {
    if (tipo == 'success') {
      return newToast.success(mensagem, {
        timeout: 3000
      });
    }
    if (tipo == 'error') {
         return newToast.error(mensagem, {
        timeout: 3000
      });
    }
    if (tipo == 'info') {
      return newToast.info(mensagem, {
     timeout: 3000
   });
 }
  }
}

export default toast;