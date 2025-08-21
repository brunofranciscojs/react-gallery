import { supabase } from './supabaseClient';

export async function uploadFn(files, category) {
    const uploadedFiles = [];

    for (const file of files) {
        const filePath = `${category}/${file.name}`;
        const { data, error } = await supabase.storage
            .from("ilustras")
            .upload(filePath, file);
        if (error) {
            console.error("Erro ao fazer upload:", error);
            continue; 
        }
        const url = `https://utyaegtlratnhymumqjm.supabase.co/storage/v1/object/public/ilustras/${filePath}`;
        const { error: dbError } = await supabase.from("imagens").insert([
            { nome: file.name, url, categoria: category }
        ]);
        if (dbError) {
            console.error("Erro ao salvar no banco:", dbError);
            continue; 
        }
        uploadedFiles.push({ url, name: file.name });
    }
    return uploadedFiles; 
}


export async function getImagesByCategory(category) {
    const { data, error } = await supabase
        .from("imagens")
        .select("*")
        .eq("categoria", category);

    if (error) {
        console.error("Erro ao buscar imagens:", error);
        return [];
    }

    return data;
}


  