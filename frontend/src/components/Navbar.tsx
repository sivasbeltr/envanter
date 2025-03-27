import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

interface Notification {
    id: number;
    title: string;
    message: string;
    type: 'info' | 'warning' | 'success' | 'error';
    time: string;
    read: boolean;
}

interface NavbarProps {
    onOpenSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenSidebar }) => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: 1,
            title: 'Düşük Stok Uyarısı',
            message: 'Yazıcı kartuşu stok seviyesi kritik seviyeye düştü.',
            type: 'warning',
            time: '10 dakika önce',
            read: false
        },
        {
            id: 2,
            title: 'Yeni Demirbaş Eklendi',
            message: 'İnsan Kaynakları birimine 5 yeni bilgisayar eklendi.',
            type: 'info',
            time: '1 saat önce',
            read: false
        },
        {
            id: 3,
            title: 'Demirbaş Transfer Edildi',
            message: 'Fen İşleri biriminden Yapı Kontrol birimine yazıcı transferi yapıldı.',
            type: 'success',
            time: '3 saat önce',
            read: true
        }
    ]);

    const notificationRef = useRef<HTMLDivElement>(null);
    const userMenuRef = useRef<HTMLDivElement>(null);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
                setIsNotificationsOpen(false);
            }
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const unreadNotificationsCount = notifications.filter(n => !n.read).length;

    const markAsRead = (id: number) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const toggleNotifications = () => {
        setIsNotificationsOpen(!isNotificationsOpen);
        if (isProfileOpen) setIsProfileOpen(false);
    };

    const toggleProfile = () => {
        setIsProfileOpen(!isProfileOpen);
        if (isNotificationsOpen) setIsNotificationsOpen(false);
    };

    // Get notification badge color based on type
    const getNotificationBadgeColor = (type: 'info' | 'warning' | 'success' | 'error'): string => {
        switch (type) {
            case 'warning': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100';
            case 'success': return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
            case 'error': return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100';
            default: return 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100';
        }
    };

    // Breadcrumb path generator
    const getBreadcrumbItems = () => {
        const pathSegments = location.pathname.split('/').filter(segment => segment !== '');

        const breadcrumbs = [
            { name: 'Ana Sayfa', path: '/' }
        ];

        let currentPath = '';

        pathSegments.forEach(segment => {
            currentPath += `/${segment}`;

            // Format the segment name for display (capitalize first letter, replace hyphens with spaces)
            const formattedName = segment
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

            breadcrumbs.push({ name: formattedName, path: currentPath });
        });

        return breadcrumbs;
    };

    const breadcrumbs = getBreadcrumbItems();

    return (
        <nav className="px-4 py-3 h-16 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center h-full">
                {/* Sol kısım: Mobilde Hamburger menü ve breadcrumb */}
                <div className="flex items-center">
                    {/* Mobil hamburger menü butonu */}
                    <button
                        type="button"
                        className="md:hidden p-2 mr-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                        onClick={onOpenSidebar}
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                        <span className="sr-only">Menüyü aç</span>
                    </button>

                    {/* Breadcrumb Navigation - yalnızca desktop görünümde */}
                    <nav className="hidden md:flex" aria-label="Breadcrumb">
                        <ol className="flex items-center space-x-1">
                            {breadcrumbs.map((breadcrumb, index) => (
                                <li key={breadcrumb.path}>
                                    <div className="flex items-center">
                                        {index !== 0 && (
                                            <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                        <Link
                                            to={breadcrumb.path}
                                            className={`ml-1 text-sm font-medium ${index === breadcrumbs.length - 1
                                                ? 'text-blue-600 dark:text-blue-400'
                                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
                                                }`}
                                            aria-current={index === breadcrumbs.length - 1 ? 'page' : undefined}
                                        >
                                            {breadcrumb.name}
                                        </Link>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </nav>
                </div>

                {/* Orta kısım: Arama kutusu - hem mobilde hem desktop'ta görünür */}
                <div className="flex-1 max-w-xl mx-2">
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Stoklarda arama yap"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm dark:text-white"
                        />
                    </div>
                </div>

                {/* Sağ kısım: Tema değiştirme, Bildirimler, Kullanıcı */}
                <div className="flex items-center space-x-2 md:space-x-4">
                    {/* Mobile arama butonu kaldırıldı, üstteki arama kutusu her zaman görünür */}

                    {/* Theme toggle button */}
                    <button
                        onClick={toggleTheme}
                        aria-label={theme === 'dark' ? 'Aydınlık moda geç' : 'Karanlık moda geç'}
                        className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                    >
                        {theme === 'dark' ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                            </svg>
                        )}
                    </button>

                    {/* Notifications */}
                    <div className="relative" ref={notificationRef}>
                        <button
                            onClick={toggleNotifications}
                            aria-label="Bildirimleri göster"
                            className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                            </svg>
                            {unreadNotificationsCount > 0 && (
                                <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-red-500 text-white text-xs font-medium flex items-center justify-center">
                                    {unreadNotificationsCount}
                                </span>
                            )}
                        </button>

                        {/* Notifications dropdown */}
                        {isNotificationsOpen && (
                            <div className="absolute right-auto md:-right-2 -left-64 mt-2 w-80 max-w-[calc(100vw-1rem)] rounded-lg shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none z-50 overflow-hidden">
                                <div className="py-1" role="menu" aria-orientation="vertical">
                                    <div className="flex justify-between items-center px-4 py-2 border-b border-gray-100 dark:border-gray-600">
                                        <span className="font-medium text-gray-700 dark:text-gray-200">Bildirimler</span>
                                        {unreadNotificationsCount > 0 && (
                                            <button
                                                onClick={markAllAsRead}
                                                className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                                            >
                                                Tümünü okundu işaretle
                                            </button>
                                        )}
                                    </div>

                                    <div className="max-h-60 overflow-y-auto">
                                        {notifications.length === 0 ? (
                                            <div className="px-4 py-6 text-center text-gray-500 dark:text-gray-400">
                                                Bildirim bulunmuyor
                                            </div>
                                        ) : (
                                            notifications.map(notification => (
                                                <div
                                                    key={notification.id}
                                                    className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-600 border-l-4 cursor-pointer ${notification.read ? 'border-transparent' : getNotificationBadgeColor(notification.type).split(' ')[0].replace('bg-', 'border-')}`}
                                                    onClick={() => markAsRead(notification.id)}
                                                >
                                                    <div className="flex justify-between">
                                                        <p className="text-sm font-medium text-gray-800 dark:text-white">{notification.title}</p>
                                                        <span className={`inline-flex text-xs px-2 py-0.5 rounded-full ${getNotificationBadgeColor(notification.type)}`}>
                                                            {notification.type === 'info' && 'Bilgi'}
                                                            {notification.type === 'warning' && 'Uyarı'}
                                                            {notification.type === 'success' && 'Başarılı'}
                                                            {notification.type === 'error' && 'Hata'}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-700 dark:text-gray-200 mt-1">{notification.message}</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                                                </div>
                                            ))
                                        )}
                                    </div>

                                    <div className="border-t border-gray-100 dark:border-gray-600">
                                        <a href="#" className="block w-full text-center px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-600">
                                            Tüm Bildirimleri Gör
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* User profile */}
                    <div className="relative" ref={userMenuRef}>
                        <button
                            onClick={toggleProfile}
                            className="flex items-center space-x-2 p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                        >
                            <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                                {user?.name.charAt(0)}
                            </div>
                        </button>
                        {isProfileOpen && (
                            <div className="absolute right-auto md:-right-2 -left-32 mt-2 w-48 max-w-[calc(100vw-1rem)] rounded-lg shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 overflow-hidden z-50">
                                <div role="menu" aria-orientation="vertical">
                                    <div className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200 border-b border-gray-100 dark:border-gray-600">
                                        <p className="font-medium">{user?.name}</p>
                                        <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">{user?.role}</p>
                                    </div>
                                    <div className="py-1">
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600" role="menuitem">
                                            <div className="flex items-center">
                                                <svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                Profilim
                                            </div>
                                        </a>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600" role="menuitem">
                                            <div className="flex items-center">
                                                <svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                Ayarlar
                                            </div>
                                        </a>
                                    </div>
                                    <div className="py-1 border-t border-gray-100 dark:border-gray-600">
                                        <button
                                            onClick={logout}
                                            className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600"
                                            role="menuitem"
                                        >
                                            <div className="flex items-center">
                                                <svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                </svg>
                                                Çıkış Yap
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
