import React, { JSX, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    HomeIcon,
    ArchiveBoxIcon,
    BuildingOfficeIcon,
    ArrowPathIcon,
    ChartBarIcon,
    Cog6ToothIcon,
    BeakerIcon,
    DocumentDuplicateIcon,
    ArrowDownOnSquareIcon,
    ArrowUpOnSquareIcon,
    ClipboardDocumentListIcon,
    UserGroupIcon
} from '@heroicons/react/24/outline';

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
    icon: JSX.Element;
    items: NavigationItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ closeSidebar }) => {
    const location = useLocation();

    // State to track which groups are expanded/collapsed
    // Only the first group is expanded by default
    const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
        'inventoryManagement': true,
        'stockMovements': false,
        'reporting': false,
        'test': false
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
            icon: <ArchiveBoxIcon className="w-5 h-5" />,
            items: [
                {
                    name: 'Demirbaşlar',
                    path: '/demirbaslar',
                    icon: <ArchiveBoxIcon className="w-5 h-5" />
                },
                {
                    name: 'Kategoriler',
                    path: '/kategoriler',
                    icon: <DocumentDuplicateIcon className="w-5 h-5" />
                },
                {
                    name: 'Depolar',
                    path: '/depolar',
                    icon: <HomeIcon className="w-5 h-5" />
                },
            ]
        },
        {
            id: 'stockMovements',
            groupName: "Stok Hareketleri",
            icon: <ArrowPathIcon className="w-5 h-5" />,
            items: [
                {
                    name: 'Birimler',
                    path: '/birimler',
                    icon: <BuildingOfficeIcon className="w-5 h-5" />
                },
                {
                    name: 'Giriş Fişleri',
                    path: '/stok-girisleri',
                    icon: <ArrowDownOnSquareIcon className="w-5 h-5" />
                },
                {
                    name: 'Çıkış Fişleri',
                    path: '/stok-cikislari',
                    icon: <ArrowUpOnSquareIcon className="w-5 h-5" />
                },
                {
                    name: 'Sayım İşlemleri',
                    path: '/stok-hareketleri',
                    icon: <ClipboardDocumentListIcon className="w-5 h-5" />
                },
            ]
        },
        {
            id: 'reporting',
            groupName: "Raporlama ve Yönetim",
            icon: <ChartBarIcon className="w-5 h-5" />,
            items: [
                {
                    name: 'Raporlar',
                    path: '/raporlar',
                    icon: <ChartBarIcon className="w-5 h-5" />
                },
                {
                    name: 'Kullanıcılar',
                    path: '/kullanicilar',
                    icon: <UserGroupIcon className="w-5 h-5" />
                },
                {
                    name: 'Ayarlar',
                    path: '/ayarlar',
                    icon: <Cog6ToothIcon className="w-5 h-5" />
                },
            ]
        },
        {
            id: 'test',
            groupName: "Test",
            icon: <BeakerIcon className="w-5 h-5" />,
            items: [
                {
                    name: 'Test Sayfası',
                    path: '/test-page',
                    icon: <BeakerIcon className="w-5 h-5" />
                }
            ]
        }
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
                            <span className="flex items-center">
                                {group.icon}
                                <span className="ml-2">{group.groupName}</span>
                            </span>
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
