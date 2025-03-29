import { getStorage, ref, getDownloadURL, uploadBytes, deleteObject, getMetadata, updateMetadata } from "firebase/storage";

/**
 * Renomeia um arquivo no Firebase Storage, mantendo a estrutura de pastas original e preservando a data de criação.
 * @param {string} oldUrl - URL pública do arquivo no Firebase Storage.
 * @param {string} newFileName - Novo nome do arquivo (sem extensão).
 * @returns {Promise<string>} - Retorna a URL do novo arquivo.
 */
export async function renameFile(oldUrl, newFileName) {
    const storage = getStorage();

    // Extraindo apenas o caminho do Firebase Storage a partir da URL
    const matches = oldUrl.match(/\/o\/(.*?)\?/);
    if (!matches || matches.length < 2) {
        throw new Error("Caminho do arquivo inválido.");
    }
    
    const oldPath = decodeURIComponent(matches[1]); // Corrige caracteres especiais
    console.log("Caminho original no Storage:", oldPath); // Depuração

    // Obtém pasta e extensão correta
    const pathParts = oldPath.split('/');
    const fileExt = pathParts.pop().split('.').pop(); // Obtém a extensão do arquivo
    const folderPath = pathParts.join('/'); // Obtém a pasta

    const newPath = `${folderPath}/${newFileName}.${fileExt}`;
    console.log("Novo caminho no Storage:", newPath); // Depuração

    const oldRef = ref(storage, oldPath);
    const newRef = ref(storage, newPath);

    try {
        // Obtém metadados antigos
        const metadata = await getMetadata(oldRef);
        const timeCreated = metadata.timeCreated; // Preserva a data de criação

        // Baixa o arquivo antigo
        const oldFile = await getDownloadURL(oldRef);
        const response = await fetch(oldFile);
        const blob = await response.blob();

        // Faz o upload do novo arquivo na mesma pasta
        await uploadBytes(newRef, blob);

        // Define a data antiga como metadado personalizado
        await updateMetadata(newRef, {
            customMetadata: { originalTimeCreated: timeCreated }
        });

        // Deleta o arquivo antigo
        await deleteObject(oldRef);

        // Retorna a URL do novo arquivo
        return await getDownloadURL(newRef);
    } catch (error) {
        console.error("Erro ao renomear o arquivo:", error);
        throw error;
    }
}
