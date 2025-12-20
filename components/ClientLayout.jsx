"use client";

import { AppProvider } from '@/contexts/AppContext';
import { AuthProvider } from '@/lib/Auth';
import Nav from '@/components/Nav';
import SquircleMask from '@/components/SquircleMask';

export default function ClientLayout({ children }) {
    return (
        <AppProvider>
            <AuthProvider>
                <Nav />
                <SquircleMask />
                {children}
            </AuthProvider>
        </AppProvider>
    );
}
