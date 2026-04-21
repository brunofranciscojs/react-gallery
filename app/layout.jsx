import '../styles/globals.scss';
import '../styles/mansonry.scss';
import '../styles/Nav.scss';
import ClientLayout from '@/components/ClientLayout';

export const metadata = {
    metadataBase: new URL('https://ilustracoes.brunofrancisco.com.br'),
    title: 'Ilustras Bruno Francisco',
    description: 'Galeria de ilustrações desenvolvida com react, supabase e tailwindcss. Ilustrações feitas por mim.',
    keywords: ['ilustrações', 'galeria', 'react', 'supabase', 'tailwindcss'],

    alternates: {
        canonical: '/',
    },

    openGraph: {
        title: 'Ilustras Bruno',
        description: 'Galeria de ilustrações desenvolvida com react, supabase e tailwindcss. Ilustrações feitas por mim.',
        type: 'website',
        locale: 'pt-BR',
        url: 'https://ilustracoes.brunofrancisco.com.br',
    },

    twitter: {
        title: 'Ilustras Bruno',
        description: 'Galeria de ilustrações desenvolvida com react, supabase e tailwindcss. Ilustrações feitas por mim.',
        card: 'summary_large_image',
    },

    themeColor: '#000000',
    colorScheme: 'dark',
    viewport: {
        width: 'device-width',
        initialScale: 1,
    },
verification: {
    google: 'p2mjsXSTpbXUcYyXfMoDrnY5NOlyKEXK8-qFYL8NzYk',
    other: {
        'msvalidate.01': '5C82E1CA55822BA2966B04EA608CCA0D',
    },
},
};

export default function RootLayout({ children }) {
    return (
        <html lang="pt-BR">
            <body>
                <ClientLayout>
                    {children}
                </ClientLayout>
            </body>
        </html>
    );
}