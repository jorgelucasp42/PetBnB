import { globalStore } from "@/store/globalStore";
import api from "./axiosAdapter";

export async function createEndereco(enderecoData) {
    const token = localStorage.getItem("auth_token") || globalStore.auth_token;
    const userType = localStorage.getItem("userType") || globalStore.userType;
    // console.log(token, userType, enderecoData);

    try {
        const response = await api.post("/endereco", enderecoData, {
            headers: {
                "Content-Type": "application/json",
                // Envie também os headers de autenticação, se necessário:
                "authToken": token,
                "userType": userType
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao criar endereço:", error);
        throw error;
    }
}