import '../styles/globals.scss';
import '../styles/mansonry.scss';
import '../styles/Nav.scss';
import ClientLayout from '@/components/ClientLayout';

export const metadata = {
    title: 'Gallery',
    description: 'Image Gallery',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <ClientLayout>
                    {children}
                </ClientLayout>
            </body>
        </html>
    );
}
