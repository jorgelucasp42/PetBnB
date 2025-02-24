/* eslint-disable no-unused-vars */
import { createEndereco } from "@/api/enderecoService";
import { createGaleria, createServico } from "@/api/servicoService";
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

export function useEnderecoForm() {
    const router = useRouter();

    // Campos do formulário
    const logradouro = ref("");
    const numero = ref("");
    const bairro = ref("");
    const complemento = ref("");
    const cep = ref("");
    const cidade = ref("");
    const estado = ref("");
    const valorPorNoite = ref("");
    // Galeria de Area 
    const nomeArea = ref("");
    const descricao = ref("");
    const imagePreview = ref(null);
    const selectedFile = ref(null);

    const cepFetchError = ref("");

    // Array para armazenar os itens da galeria
    const galleryItems = ref([]);


    // Função para processar o upload de imagem
    const onImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            selectedFile.value = file;
            console.log("Arquivo selecionado:", file);
            const reader = new FileReader();
            reader.onload = function (e) {
                imagePreview.value = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    const buscarCep = async () => {
        const cepLimpo = cep.value.replace(/\D/g, "");
        if (cepLimpo.length !== 8) {
            cepFetchError.value = "";
            return;
        }

        try {
            const response = await axios.get(`https://brasilapi.com.br/api/cep/v2/${cepLimpo}`);
            if (response.data.erro) {
                cepFetchError.value = "CEP não encontrado.";
                return;
            }

            logradouro.value = logradouro.value || (response.data.street || "");
            bairro.value = bairro.value || (response.data.neighborhood || "");
            cidade.value = cidade.value || (response.data.city || "");
            estado.value = estado.value || (response.data.state || "");
        } catch (error) {
            console.error("Erro ao buscar CEP:", error);
        }
    };

    const addGalleryItem = () => {
        if (!selectedFile.value || !nomeArea.value || !descricao.value) {
            alert("Preencha todos os campos da galeria.");
            return;
        }

        galleryItems.value.push({
            nome: nomeArea.value,
            descricao: descricao.value,
            imagem: selectedFile.value, // Aqui você pode optar por salvar o arquivo ou o caminho/base64
        });

        // Limpa os campos da galeria para o próximo item
        nomeArea.value = "";
        descricao.value = "";
        imagePreview.value = null;
        selectedFile.value = null;
    };

    const submitForm = async () => {
        if (!logradouro.value || !numero.value || !bairro.value || !valorPorNoite.value) {
            alert("Preencha todos os campos obrigatórios.");
            return;
        }

        const enderecoData = {
            cep: cep.value,
            logradouro: logradouro.value,
            numero: numero.value,
            bairro: bairro.value,
            complemento: complemento.value,
            cidade: cidade.value,
            estado: estado.value,
        };


        try {
            const data = await createEndereco(enderecoData);
            const servicoData = {
                tipo: "cuidador",
                preco: parsePreco(valorPorNoite.value),
            };
            await createServico(servicoData);

            await enviarImagensSeparadas(galleryItems.value);

            router.push("/areaprestador");
        } catch (error) {
            alert("Erro ao criar o endereço.");
        }
    };
    async function enviarImagensSeparadas(galeriaItems) {
        for (let i = 0; i < galeriaItems.length; i++) {
            const item = galeriaItems[i];
            const formData = new FormData();
            formData.append('nome', item.nome);
            formData.append('descricao', item.descricao);
            formData.append('imagem', item.imagem);
            // A cada imagem, faz uma requisição individual
            await createGaleria(formData);
            console.log(`Imagem ${item.nome} enviada com sucesso`);
        }
    }
    function parsePreco(valor) {
        const valorStr = String(valor);

        // Remove o símbolo "R$", espaços e troca a vírgula por ponto
        const valorLimpo = valorStr.replace(/R\$\s?/, '').replace(/\s/g, '').replace(',', '.');
        return parseFloat(valorLimpo);
    }


    return {
        // campos form principal
        logradouro,
        numero,
        bairro,
        complemento,
        cep,
        cidade,
        estado,
        valorPorNoite,
        // campos da galeria
        nomeArea,
        descricao,
        imagePreview,
        onImageChange,
        // funções
        submitForm,
        buscarCep,
        addGalleryItem,
        // auxiliares
        galleryItems,
        cepFetchError
    };
}
