import { ref, onMounted } from "vue";
import { getServicos } from "@/api/servicoService";

export default function useFetchServicos() {
    const servicos = ref([]);
    const loading = ref(false);
    const error = ref(null);

    const fetchServicos = async () => {
        loading.value = true;
        error.value = null;

        try {
            servicos.value = await getServicos();
        } catch (err) {
            error.value = "Erro ao carregar serviços.";
            console.error(err);
        } finally {
            loading.value = false;
        }
    };


    return { servicos, loading, error, fetchServicos };
}