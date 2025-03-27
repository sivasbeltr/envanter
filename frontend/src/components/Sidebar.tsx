import React, { JSX, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
    closeSidebar: () => void;
}

interface NavigationItem {
    name: string;
    path: string;
    icon: JSX.Element;
}

interface NavigationGroup {
    id: string;
    groupName: string;
    items: NavigationItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ closeSidebar }) => {
    const location = useLocation();

    // State to track which groups are expanded/collapsed
    const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
        'inventoryManagement': true,
        'stockMovements': true,
        'reporting': true
    });

    // Toggle group expansion state
    const toggleGroup = (groupId: string) => {
        setExpandedGroups(prev => ({
            ...prev,
            [groupId]: !prev[groupId]
        }));
    };

    const navigationGroups: NavigationGroup[] = [
        {
            id: 'inventoryManagement',
            groupName: "Envanter Yönetimi",
            items: [
                {
                    name: 'Demirbaşlar',
                    path: '/demirbaslar',
                    icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m-8-4l8 4m8 4l-8 4m8-4l-8-4m8-4v12a4 4 0 01-4 4H8a4 4 0 01-4-4V7a4 4 0 014-4h8a4 4 0 014 4v12z" />
                        </svg>
                    ),
                },
                {
                    name: 'Kategoriler',
                    path: '/kategoriler',
                    icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                    ),
                },
                {
                    name: 'Depolar',
                    path: '/depolar',
                    icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                        </svg>
                    ),
                },
            ]
        },
        {
            id: 'stockMovements',
            groupName: "Stok Hareketleri",
            items: [
                {
                    name: 'Birimler',
                    path: '/birimler',
                    icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    ),
                },
                {
                    name: 'Giriş Fişleri',
                    path: '/stok-girisleri',
                    icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                        </svg>
                    ),
                },
                {
                    name: 'Çıkış Fişleri',
                    path: '/stok-cikislari',
                    icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                        </svg>
                    ),
                },
                {
                    name: 'Sayım İşlemleri',
                    path: '/stok-hareketleri',
                    icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                    ),
                },
            ]
        },
        {
            id: 'reporting',
            groupName: "Raporlama ve Yönetim",
            items: [
                {
                    name: 'Raporlar',
                    path: '/raporlar',
                    icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    ),
                },
                {
                    name: 'Kullanıcılar',
                    path: '/kullanicilar',
                    icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    ),
                },
                {
                    name: 'Ayarlar',
                    path: '/ayarlar',
                    icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    ),
                },
            ]
        },
    ];

    // Check if the current path is in a specific group to highlight the group header
    const isGroupActive = (group: NavigationGroup) => {
        return group.items.some(item => item.path === location.pathname);
    };

    return (
        <div className="flex flex-col h-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white">
            {/* Başlık - Navbar ile aynı yükseklikte - Kapatma butonu yanına eklendi */}
            <div className="flex items-center justify-between px-4 h-16 border-b border-gray-200 dark:border-gray-700">
                <Link to="/" className="flex-shrink-0 flex items-center">
                    <span className="text-xl font-bold text-gray-800 dark:text-white">Envanter Sistemi</span>
                </Link>

                {/* Kapatma butonu - sadece mobilde görünür */}
                <button
                    onClick={closeSidebar}
                    className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="sr-only">Menüyü kapat</span>
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-4 px-2">
                {navigationGroups.map((group) => (
                    <div key={group.id} className="mb-4">
                        {/* Group header - clickable to toggle */}
                        <button
                            onClick={() => toggleGroup(group.id)}
                            className={`
                                flex items-center justify-between w-full px-3 py-2 text-sm font-semibold 
                                rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-700
                                ${isGroupActive(group) ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}
                            `}
                        >
                            <span>{group.groupName}</span>
                            <svg
                                className={`w-4 h-4 transition-transform duration-200 ${expandedGroups[group.id] ? 'transform rotate-180' : ''}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Group items with animation */}
                        <div className={`
                            mt-1 space-y-1 overflow-hidden transition-all duration-200 ease-in-out
                            ${expandedGroups[group.id] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                        `}>
                            {group.items.map((item) => {
                                const isActive = location.pathname === item.path;
                                return (
                                    <Link
                                        key={item.name}
                                        to={item.path}
                                        className={`
                                            flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
                                            ml-2 border-l-2 ${isActive
                                                ? 'bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900/40 dark:border-blue-500 dark:text-blue-200'
                                                : 'border-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}
                                        `}
                                        onClick={() => {
                                            if (window.innerWidth < 768) {
                                                closeSidebar();
                                            }
                                        }}
                                    >
                                        <span className="flex items-center">
                                            {item.icon}
                                            <span className="ml-2">{item.name}</span>
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>
            {/* App info footer */}
            <div className="p-4 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
                <p>Belediye Envanter Yönetim Sistemi v1.0</p>
                <p className="mt-1">© {new Date().getFullYear()} Tüm Hakları Saklıdır</p>
            </div>
        </div>
    );
};

export default Sidebar;
