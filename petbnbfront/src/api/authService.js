import api from './axiosAdapter';

export const auth = async (userType, phoneNumber, verificationCode) => {
    try {
        const response = await api.post('/auth', {
            userType,
            phoneNumber,
            verificationCode
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao autenticar:', error);
        throw error;
    }
};

export const validateToken = async (authToken, userType) => {
    try {
        const response = await api.post('/auth/validateAuthToken', { authToken, userType });
        return response.data.valid;
    } catch (error) {
        console.error('Erro ao validar o token:', error);
        return false;
    }
}

export const generateValNumCode = async (phoneNumber, userType) => {
    try {
        const response = await api.post('/auth/generateValNumCode', {
            phoneNumber,
            userType
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao gerar código de validação:', error);
        throw error;
    }
};


export const validateNumberCode = async (userType, phoneNumber, verificationCode) => {
    try {
        const response = await api.post('/auth/validateNumberCode', {
            userType,
            phoneNumber,
            verificationCode
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao validar código de verificação:', error);
        throw error;
    }
};