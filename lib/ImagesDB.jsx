import { supabase } from './supabaseClient';
import { slugify } from '@/lib/utils';

export async function uploadFn(filesData, category) {
    const uploadedFiles = [];

    for (const item of filesData) {
        const { file, width, height } = item;
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
            { nome: file.name, url, categoria: category, width, height }
        ]);
        if (dbError) {
            console.error("Erro ao salvar no banco:", dbError);
            continue;
        }
        uploadedFiles.push({ url, name: file.name });
    }
    return uploadedFiles;
}


export async function getImagesByCategory(slug) {
    // 1. Fetch all distinct categories to find the real name
    const { data: categoriesData, error: catError } = await supabase
        .from("imagens")
        .select("categoria");

    if (catError) {
        console.error("Erro ao buscar categorias:", catError);
        return [];
    }

    const uniqueCategories = [...new Set(categoriesData.map(item => item.categoria))];

    // 2. Find the category that matches the slug
    // Try exact match first (if slug is already the category name)
    let realCategory = uniqueCategories.find(c => c === slug);

    if (!realCategory) {
        // Try matching slugified version
        realCategory = uniqueCategories.find(c => slugify(c) === slug);
    }

    // Fallback: try replacing hyphens with spaces if still not found
    if (!realCategory) {
        const potentialName = slug.replace(/-/g, ' ');
        // Case-insensitive check against potential name
        realCategory = uniqueCategories.find(c => c.toLowerCase() === potentialName.toLowerCase());

        // If still not found, use potentialName as last resort for the query
        if (!realCategory) realCategory = potentialName;
    }

    console.log(`Slug: ${slug} -> Real Category: ${realCategory}`);

    const { data, error } = await supabase
        .from("imagens")
        .select("*")
        .eq("categoria", realCategory); // Use eq with the real name

    if (error) {
        console.error("Erro ao buscar imagens:", error);
        return [];
    }

    return data;
}

export async function getImageById(id) {
    const { data, error } = await supabase
        .from("imagens")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        console.error("Erro ao buscar imagem por id:", error);
        return null;
    }

    return data;
}