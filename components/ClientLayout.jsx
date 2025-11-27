"use client";

import { AppProvider } from '@/contexts/AppContext';
import { AuthProvider } from '@/lib/Auth';
import Nav from '@/components/Nav';
import SquircleMask from '@/components/SquircleMask';

export default function ClientLayout({ children }) {
    return (
        <AppProvider>
            <AuthProvider>
                <SquircleMask />
                {/* Nav needs to be updated to use context internally */}
                <Nav />
                {children}
            </AuthProvider>
        </AppProvider>
    );
}
