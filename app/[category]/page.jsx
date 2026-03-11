import Mansonry from '@/components/mansonry';
import { getImagesByCategory } from '@/lib/ImagesDB';

export async function generateMetadata({ params }) {
    const { category } = await params;
    const images = await getImagesByCategory(category);

    const getSupabaseUrl = (url, w) => {
        return url
            .replace('/storage/v1/object/', '/storage/v1/render/image/')
            .split('?')[0] + `?width=${w}&quality=75`;
    };

    const randomImage = images.length > 0
        ? images[Math.floor(Math.random() * images.length)]
        : null;

    const title = `${category.charAt(0).toUpperCase() + category.slice(1)} - Ilustras Bruno`;
    const description = `Confira alguns estudos e rabiscos de categoria ${category}. ${images.length} imagens disponíveis.`;

    const metadata = {
        title,
        description,
        openGraph: {
            title,
            description,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
        }
    };

    if (randomImage) {
        metadata.openGraph.images = [
            {
                url: getSupabaseUrl(randomImage.url, 1200),
                width: randomImage.width || 1200,
                height: randomImage.height || 630,
                alt: randomImage.nome,
            }
        ];
        metadata.twitter.images = [getSupabaseUrl(randomImage.url, 1200)];
    }

    return metadata;
}

export default async function CategoryPage({ params }) {
    const { category } = await params;
    const initialImages = await getImagesByCategory(category);
    return <Mansonry category={category} initialImages={initialImages} />;
}
