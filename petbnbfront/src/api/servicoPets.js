import api from "./axiosAdapter";



export async function getPets(token) {
    const userType = localStorage.getItem("userType");

    try {
        const response = await api.get("/pet", {
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

export async function createPet(token, petData) {
    const userType = localStorage.getItem("userType");

    try {
        const response = await api.post("/pet", petData, {
            headers: {
                "Content-Type": "multipart/form-data",
                authToken: token,
                userType: userType,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao cadastrar pet:", error);
        throw error;
    }
}