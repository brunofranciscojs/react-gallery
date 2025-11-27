"use client";

import { AppProvider } from '../context/AppContext';
import Nav from '../Nav';
import SquircleMask from '../components/SquircleMask';

export default function ClientLayout({ children }) {
    return (
        <AppProvider>
            <SquircleMask />
            {/* Nav needs to be updated to use context internally */}
            <Nav />
            {children}
        </AppProvider>
    );
}
