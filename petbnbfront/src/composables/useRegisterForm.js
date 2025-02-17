import { computed, ref } from "vue";
import { globalStore } from "@/store/globalStore";
import { useRouter } from "vue-router";
import { registerCliente, registerPrestador } from "@/api/registerService";
import { cpf as cpfValidator } from 'cpf-cnpj-validator';


export function useRegisterForm() {
    const router = useRouter();

    const userType = computed(() => globalStore.userType);

    const nome = ref("");
    const cpf = ref("");
    const tipoService = ref("");
    const imagePreview = ref(null);

    const selectHidden = () => {
        return userType.value.toLowerCase() === "cliente" ? "hidden" : "";
    };

    const onImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                imagePreview.value = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    const submitForm = async () => {
        const telefone = new URLSearchParams(window.location.search).get('phoneNumber');
        let data;

        if (!cpfValidator.isValid(cpf.value)) {
            alert('CPF inválido');
            return;
        }
        const clienteData = {
            nome: nome.value,
            cpf: cpf.value,
            telefone,
            foto: imagePreview.value,
        };

        const prestadorData = {
            nome: nome.value,
            cpf: cpf.value,
            telefone,
            foto: imagePreview.value
        };
        try {
            if (userType.value === "Cliente") {
                data = await registerCliente(clienteData);
            } else if (userType.value === "Prestador") {
                data = await registerPrestador(prestadorData);
            }

            const auth_token = data.auth_token;
            localStorage.setItem("auth_token", auth_token);
            localStorage.setItem("userType", userType.value);

            globalStore.auth_token = auth_token;
            globalStore.userType = userType.value;


            if (userType.value.toLowerCase() === "prestador") {
                router.push("/endereco");
            } else {
                router.push("/buscarservico");
            }
        } catch (error) {
            alert(error.response?.data?.message ?? "Erro inesperado, tente novamente.");
            console.error("Erro ao registrar:", error);
        }
    };

    return {
        userType,
        nome,
        cpf,
        tipoService,
        selectHidden,
        imagePreview,
        onImageChange,
        submitForm
    };
}