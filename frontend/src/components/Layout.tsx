import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import OfflineIndicator from './OfflineIndicator';
import { useAuth } from '../context/AuthContext';

const Layout: React.FC = () => {
    const { isLoggedIn } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
            {/* Sidebar - tam yükseklikte solda */}
            <aside
                className={`
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} 
                    fixed md:relative w-64 h-full bg-white dark:bg-gray-800 shadow-md
                    z-30 md:z-auto transition-transform duration-300 ease-in-out
                `}
            >
                <Sidebar closeSidebar={() => setSidebarOpen(false)} />
            </aside>

            {/* Overlay to close sidebar on mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main content area - includes navbar and content */}
            <div className="flex flex-col flex-1 w-0 overflow-hidden">
                {/* Navbar */}
                <header className="z-10 bg-white dark:bg-gray-800 shadow-sm">
                    <Navbar onOpenSidebar={() => setSidebarOpen(true)} />
                </header>

                {/* Page content */}
                <main className="flex-1 overflow-auto p-4 md:p-6">
                    <Outlet />
                </main>

                {/* Offline indicator */}
                <OfflineIndicator />
            </div>
        </div>
    );
};

export default Layout;
