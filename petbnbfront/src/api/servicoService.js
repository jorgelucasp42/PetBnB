import { globalStore } from "@/store/globalStore";
import api from "./axiosAdapter";

export async function createServico(servicoData) {
    const token = localStorage.getItem("auth_token") || globalStore.auth_token;
    const userType = localStorage.getItem("userType") || globalStore.userType;

    try {
        const response = await api.post("/servico", servicoData, {
            headers: {
                "Content-Type": "application/json",
                "authToken": token,
                "userType": userType,
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao criar serviço:", error);
        throw error;
    }
}

export async function createGaleria(galeriaFormData) {
    const token = localStorage.getItem("auth_token") || globalStore.auth_token;
    const userType = localStorage.getItem("userType") || globalStore.userType;
    console.log("Enviando FormData para Galeria:", [...galeriaFormData.entries()]);
    try {
        const response = await api.post("/galeria", galeriaFormData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "authToken": token,
                "userType": userType,
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao criar galeria:", error);
        throw error;
    }
}

export async function getServicos() {
    const token = localStorage.getItem("auth_token");
    const userType = localStorage.getItem("userType");

    try {
        const response = await api.get("/servico", {
            headers: {
                "Content-Type": "application/json",
                "authToken": token,
                "userType": userType,
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar serviços:", error);
        throw error;
    }
}