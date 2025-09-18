// src/utils/uploadAndConvert.ts
export async function uploadAndConvert(file: File, categoriaAtual: string, supabase: any) {
  try {
    // 1. Converte para AVIF via função no Supabase
    const response = await fetch("/functions/v1/convert-to-avif", {
      method: "POST",
      body: file,
    });

    if (!response.ok) throw new Error("Falha ao converter para AVIF");

    const avifBlob = await response.blob();
    const avifFile = new File([avifBlob], file.name.replace(/\.\w+$/, ".avif"), {
      type: "image/avif",
    });

    // 2. Monta caminho único
    const timestamp = Date.now();
    const novoFilePath = `${categoriaAtual}/${timestamp}.avif`;

    // 3. Upload no Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("ilustras")
      .upload(novoFilePath, avifFile);

    if (uploadError) throw uploadError;

    // 4. Retorna URL pública
    return `https://utyaegtlratnhymumqjm.supabase.co/storage/v1/object/public/ilustras/${novoFilePath}`;
  } catch (err) {
    console.error("Erro no uploadAndConvert:", err);
    throw err;
  }
}
