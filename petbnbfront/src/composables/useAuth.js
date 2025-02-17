import { ref, computed, watch } from "vue";
import { globalStore } from "@/store/globalStore.js";
import { useRouter } from "vue-router";

export function useAuth() {
    const router = useRouter();

    const country = ref("Brasil");
    const phoneNumber = ref("");
    const errorMessage = ref("");

    const userType = computed(() => globalStore.userType);

    const setUserType = (type) => {
        globalStore.userType = type;
    };

    const phoneRegex = {
        Brasil: /^\+55 \(\d{2}\) \d{5}-\d{4}$/,  // Exemplo: +55 (11) 98765-4321
        "Estados Unidos": /^\+1 \(\d{3}\) \d{3}-\d{4}$/, // Exemplo: +1 (555) 123-4567
        Portugal: /^\+351 \d{3} \d{3} \d{3}$/ // Exemplo: +351 912 345 678
    };

    const phoneMask = computed(() => {
        switch (country.value) {
            case "Brasil":
                return "+55 (##) #####-####";
            case "Estados Unidos":
                return "+1 (###) ###-####";
            case "Portugal":
                return "+351 ### ### ###";
            default:
                return "";
        }
    });

    const validatePhoneNumber = () => {
        if (!phoneRegex[country.value].test(phoneNumber.value)) {
            errorMessage.value = `Número de telefone inválido para ${country.value}. Formato esperado: ${getExampleFormat(country.value)}`;
            return false;
        }
        errorMessage.value = "";
        return true;
    };

    const getExampleFormat = (country) => {
        const examples = {
            Brasil: "+55 (99) 99999-9999",
            "Estados Unidos": "+1 (999) 999-9999",
            Portugal: "+351 999 999 999"
        };
        return examples[country] || "Formato desconhecido";
    };

    // Ao trocar o país, limpa o campo de telefone
    watch(country, () => {
        phoneNumber.value = "";
    });
    watch(phoneNumber, () => {
        errorMessage.value = "";

    })

    const submitForm = async () => {
        if (!userType.value) {
            alert("Por favor, selecione Cliente ou Prestador de Serviço antes de continuar.");
            return;
        }

        if (!validatePhoneNumber()) {
            return;
        }

        try {
            router.push({ path: '/confirmaNum', query: { phoneNumber: phoneNumber.value, userType: userType.value } });
        } catch (error) {
            alert("Erro ao autenticar. Tente novamente.");
        }
    };

    return {
        country,
        phoneNumber,
        errorMessage,
        userType,
        setUserType,
        validatePhoneNumber,
        submitForm,
        phoneMask
    };
}