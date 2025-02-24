import api from "./axiosAdapter";


export async function registerCliente(clienteData) {
    try {
        const response = await api.post("/cliente", clienteData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao registrar cliente:", error);
        throw error;
    }
}

export async function registerPrestador(prestadorData) {
    try {
        const response = await api.post("/prestador", prestadorData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao registrar prestador:", error);
        throw error;
    }
}