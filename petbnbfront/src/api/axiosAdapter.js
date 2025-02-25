import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});
api.interceptors.response.use(
    response => response, // Retorna a resposta normalmente se estiver ok
    error => {
        // Verifica se há uma mensagem de erro na resposta do backend
        const errorMessage = error.response?.data?.message || "Ocorreu um erro inesperado.";

        alert(errorMessage);

        // Retorna a rejeição para que os `catch` das chamadas ainda possam tratá-lo
        return Promise.reject(error);
    }
);
export default api;