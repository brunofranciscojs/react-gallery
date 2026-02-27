import { getAllCategories, getAllImages } from '@/lib/ImagesDB';
import { slugify } from '@/lib/utils';
import { headers } from 'next/headers';

export default async function sitemap() {
    const headersList = await headers();
    const domain = headersList.get('host') || 'ilustrasbruno.com.br';
    const protocol = domain.includes('localhost') ? 'http' : 'https';
    const baseUrl = `${protocol}://${domain}`;

    // Get all categories
    const categories = await getAllCategories();

    // Get all images
    const images = await getAllImages();

    // Route: Home
    const routes = [
        {
            url: `${baseUrl}`,
            lastModified: new Date(),
        },
    ];

    // Route: Categories
    const categoryRoutes = categories.map((category) => ({
        url: `${baseUrl}/${slugify(category)}`,
        lastModified: new Date(),
    }));

    // Route: Images (assuming individual image pages are at /[category]/[imageId] as seen in API redirect)
    const imageRoutes = images.map((image) => {
        // Constructing the same slugify logic to match the URLs
        const imageCategoriaSlug = slugify(image.categoria);
        return {
            url: `${baseUrl}/${imageCategoriaSlug}/${image.id}`,
            lastModified: new Date(image.created_at || new Date()),
        };
    });

    return [...routes, ...categoryRoutes, ...imageRoutes];
}
