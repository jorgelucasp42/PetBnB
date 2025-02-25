// src/composables/usePrestador.js
import { ref } from 'vue';
import api from '@/api/axiosAdapter';

export default function useCliente(token) {
    const usuario = ref(null);
    const loading = ref(true);
    const error = ref(null);

    const fetchClienteData = async () => {
        try {
            const response = await api.get(`/cliente/token/${token}`);
            usuario.value = response.data;
        } catch (err) {
            error.value = 'Erro ao buscar dados do cliente';
            console.error(err);
        } finally {
            loading.value = false;
        }
    };

    fetchClienteData();

    return {
        usuario,
        loading,
        error
    };
}
