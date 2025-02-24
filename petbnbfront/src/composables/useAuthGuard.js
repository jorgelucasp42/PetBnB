import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { globalStore } from '@/store/globalStore';
import { validateToken } from '@/api/authService';

export function useAuthGuard() {
    const router = useRouter();

    onMounted(async () => {
        const token = localStorage.getItem("auth_token") || globalStore.auth_token;
        const userType = globalStore.userType;

        if (!token || token.trim() === '') {
            router.push('/');
            return;
        }

        const isValid = await validateToken(token, userType);

        if (!isValid) {
            console.log("Token inválido.");
            globalStore.auth_token = null;
            localStorage.removeItem('auth_token');
            router.push('/');
            return;
        }
        if (router.currentRoute.value.path === '/') {
            const redirectPath = userType.toLowerCase() === 'cliente'
                ? '/buscarservico'  // Página inicial do cliente
                : '/areaprestador'; // Página inicial do prestador
            router.push(redirectPath);
        }
    });
}