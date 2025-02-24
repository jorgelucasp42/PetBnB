// src/composables/usePrestador.js
import { ref } from 'vue';
import api from '@/api/axiosAdapter';

export default function usePrestador(token) {
    const usuario = ref(null);
    const loading = ref(true);
    const error = ref(null);

    const fetchPrestadorData = async () => {
        try {
            const response = await api.get(`/prestador/token/${token}`);
            usuario.value = response.data;
        } catch (err) {
            error.value = 'Erro ao buscar dados do prestador';
            console.error(err);
        } finally {
            loading.value = false;
        }
    };

    // Chama a função quando o composable é montado
    fetchPrestadorData();

    return {
        usuario,
        loading,
        error
    };
}
