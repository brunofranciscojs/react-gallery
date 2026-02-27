import '../styles/globals.scss';
import '../styles/mansonry.scss';
import '../styles/Nav.scss';
import ClientLayout from '@/components/ClientLayout';

export const metadata = {
    title: 'Ilustras Bruno',
    description: 'Galeria de ilustrações desenvolvida com react, supabase e tailwindcss. Ilustrações feitas por mim.',
    keywords: ['ilustrações', 'galeria', 'react', 'supabase', 'tailwindcss'],
    openGraph: {
        title: 'Ilustras Bruno',
        description: 'Galeria de ilustrações desenvolvida com react, supabase e tailwindcss. Ilustrações feitas por mim.',
        type: 'website',
        locale: 'pt-BR',
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
};

export default function RootLayout({ children }) {
    return (
        <html lang="pt-BR">
            <head>
                <meta name="google-site-verification" content="p2mjsXSTpbXUcYyXfMoDrnY5NOlyKEXK8-qFYL8NzYk" />
                <meta name="msvalidate.01" content="5C82E1CA55822BA2966B04EA608CCA0D" />
            </head>
            <body>
                <ClientLayout>
                    {children}
                </ClientLayout>
            </body>
        </html>
    );
}
