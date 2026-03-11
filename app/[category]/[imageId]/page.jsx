import Imagem from '@/components/Imagem';
import { getImageById } from '@/lib/ImagesDB';

export async function generateMetadata({ params }) {
    const { imageId, category } = await params;
    const image = await getImageById(imageId);
    const extRm = (string) => string.replace('.webp', '').replace('.avif', '').replace('.jpg', '').replace('.png', '')
    const nome = image.nome;

    if (!image) {
        return {
            title: 'Imagem não encontrada',
            description: 'A imagem que você procura não existe ou foi removida.',
        };
    }
    const getSupabaseUrl = (url, w) => {
        return url
            .replace('/storage/v1/object/', '/storage/v1/render/image/')
            .split('?')[0] + `?width=${w}&quality=75`;
    };
    return {
        title: extRm(nome) + ' - Ilustras Bruno' || ' Galeria de Imagens',
        description: `Visualizar imagem na categoria ${category}`,
        openGraph: {
            title: extRm(nome) + ' - Ilustras Bruno' || ' Galeria de Imagens',
            description: `Visualizar imagem na categoria ${category}`,
            images: [
                {
                    url: getSupabaseUrl(image.url, 1200),
                    width: 1200,
                    height: 630,
                    alt: extRm(nome) || ' Imagem da galeria',
                },
            ],
        },
    };
}

export default function ImagePage() {
    return <Imagem />;
}
