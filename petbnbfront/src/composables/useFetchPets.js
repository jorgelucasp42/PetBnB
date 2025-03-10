import { ref } from 'vue'
import axios from 'axios'
import { getPets } from '@/api/servicoPets'

/**
 * useFetchPets
 * @param {string} authToken - Token de autenticação do usuário
 */
export function useFetchPets(authToken) {
    const pets = ref([])
    const error = ref(null)
    const loading = ref(false)

    const fetchPets = async () => {
        loading.value = true
        error.value = null

        try {
            const data = await getPets(authToken)
            pets.value = data

        } catch (err) {
            error.value = err
            pets.value = []
        } finally {
            loading.value = false
        }
    }

    return {
        pets,
        error,
        loading,
        fetchPets,
    }
}
