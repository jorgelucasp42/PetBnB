import api from "./axiosAdapter";


export async function registerCliente(clienteData) {
    try {
        const response = await api.post("/cliente", clienteData);
        return response.data;
    } catch (error) {
        console.error("Erro ao registrar cliente:", error);
        throw error;
    }
}

export async function registerPrestador(prestadorData) {
    try {
        const response = await api.post("/prestador", prestadorData);
        return response.data;
    } catch (error) {
        console.error("Erro ao registrar prestador:", error);
        throw error;
    }
}