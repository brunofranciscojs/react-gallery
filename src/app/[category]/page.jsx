import Mansonry from '../../mansonry';
import { getImagesByCategory } from '../../contexto/ImagesDB';

export default async function CategoryPage({ params }) {
    const { category } = await params;
    const initialImages = await getImagesByCategory(category);
    return <Mansonry category={category} initialImages={initialImages} />;
}
