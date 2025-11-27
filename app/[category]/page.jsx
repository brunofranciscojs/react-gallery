import Mansonry from '@/components/mansonry';
import { getImagesByCategory } from '@/lib/ImagesDB';

export default async function CategoryPage({ params }) {
    const { category } = await params;
    const initialImages = await getImagesByCategory(category);
    return <Mansonry category={category} initialImages={initialImages} />;
}
