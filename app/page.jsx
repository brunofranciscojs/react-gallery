"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/contexts/AppContext';

export default function Home() {
    const { categoria, slugify } = useAppContext();
    const router = useRouter();

    useEffect(() => {
        if (categoria) {
            router.replace(`/${slugify(categoria)}`);
        } else {
            router.replace('/misc');
        }
    }, [categoria, router, slugify]);

    return null;
}
