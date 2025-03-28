import React, { useState } from 'react';
import { ListGroup, ListGroupItem } from '../../components/common/ListGroup';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import {
    HomeIcon, UserIcon, DocumentIcon, CogIcon, CheckCircleIcon,
    ExclamationTriangleIcon, XCircleIcon, InformationCircleIcon, ChevronRightIcon
} from '@heroicons/react/24/solid';

const ListGroupTest: React.FC = () => {
    const [selectedItem, setSelectedItem] = useState<number | null>(null);
    const [flush, setFlush] = useState(false);
    const [horizontal, setHorizontal] = useState(false);
    const [variant, setVariant] = useState<'default' | 'subtle' | 'bold'>('default');
    const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md');

    // Temel liste öğeleri
    const basicItems = [
        'Ana Sayfa',
        'Ürünler',
        'Kategoriler',
        'Kullanıcılar',
        'Ayarlar',
    ];

    // İkonlu liste öğeleri
    const iconItems = [
        { text: 'Ana Sayfa', icon: HomeIcon },
        { text: 'Kullanıcılar', icon: UserIcon },
        { text: 'Belgeler', icon: DocumentIcon },
        { text: 'Ayarlar', icon: CogIcon },
    ];

    // Badge'li liste öğeleri
    const badgeItems = [
        { text: 'Mesajlar', count: 12, color: 'blue' },
        { text: 'Bildirimler', count: 5, color: 'red' },
        { text: 'Görevler', count: 3, color: 'green' },
        { text: 'Yorumlar', count: 0, color: 'gray' },
    ];

    // Durumlu öğeler
    const statusItems = [
        { text: 'Online Kullanıcılar', status: 'success', icon: CheckCircleIcon },
        { text: 'Bekleyen İşlemler', status: 'warning', icon: ExclamationTriangleIcon },
        { text: 'Hatalar', status: 'error', icon: XCircleIcon },
        { text: 'Sistem Bilgileri', status: 'info', icon: InformationCircleIcon },
        { text: 'Bakım Modu (Devre Dışı)', status: 'disabled', icon: CogIcon },
    ];

    // Katlanabilir içerikli öğeler
    const collapsibleItems = [
        {
            text: 'Kullanıcı Detayları',
            icon: UserIcon,
            collapsibleContent: (
                <div>
                    <p>Toplam Kullanıcı: 1,245</p>
                    <p>Aktif Kullanıcı: 987</p>
                </div>
            ),
        },
        {
            text: 'Sistem Durumu',
            icon: CogIcon,
            collapsibleContent: (
                <div>
                    <p>CPU: %75</p>
                    <p>RAM: %60</p>
                </div>
            ),
        },
    ];

    return (
        <div className="container mx-auto p-6">
            <h1 className="mb-6 text-3xl font-semibold text-gray-900 dark:text-white">ListGroup Bileşeni Testi</h1>

            <div className="mb-8 space-y-4">
                <h2 className="text-xl font-medium text-gray-800 dark:text-gray-200">Seçenekler</h2>
                <div className="flex flex-wrap gap-3">
                    <Button
                        onClick={() => setFlush(!flush)}
                        variant={flush ? 'primary' : 'outline'}
                        size="sm"
                    >
                        {flush ? 'Flush: Aktif' : 'Flush: Pasif'}
                    </Button>
                    <Button
                        onClick={() => setHorizontal(!horizontal)}
                        variant={horizontal ? 'primary' : 'outline'}
                        size="sm"
                    >
                        {horizontal ? 'Yatay Düzen' : 'Dikey Düzen'}
                    </Button>
                    <Button
                        onClick={() => setVariant(variant === 'default' ? 'subtle' : variant === 'subtle' ? 'bold' : 'default')}
                        variant="outline"
                        size="sm"
                    >
                        Variant: {variant.charAt(0).toUpperCase() + variant.slice(1)}
                    </Button>
                    <Button
                        onClick={() => setSize(size === 'sm' ? 'md' : size === 'md' ? 'lg' : 'sm')}
                        variant="outline"
                        size="sm"
                    >
                        Size: {size.toUpperCase()}
                    </Button>
                </div>

                {selectedItem !== null && (
                    <div className="mt-2 rounded-md bg-gray-100 p-2 dark:bg-gray-800">
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                            Seçilen Öğe: <span className="font-medium">{selectedItem}</span>
                        </p>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                <div>
                    <h2 className="mb-4 text-xl font-medium text-gray-800 dark:text-gray-200">Temel Liste</h2>
                    <ListGroup flush={flush} horizontal={horizontal} variant={variant} size={size}>
                        {basicItems.map((item, index) => (
                            <ListGroupItem
                                key={index}
                                active={selectedItem === index}
                                onClick={() => setSelectedItem(index)}
                                className="justify-between"
                            >
                                {item}
                                <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                </div>

                <div>
                    <h2 className="mb-4 text-xl font-medium text-gray-800 dark:text-gray-200">İkonlu Liste</h2>
                    <ListGroup flush={flush} horizontal={horizontal} variant={variant} size={size}>
                        {iconItems.map((item, index) => (
                            <ListGroupItem
                                key={index}
                                icon={item.icon}
                                active={selectedItem === index + basicItems.length}
                                onClick={() => setSelectedItem(index + basicItems.length)}
                            >
                                {item.text}
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                </div>

                <div>
                    <h2 className="mb-4 text-xl font-medium text-gray-800 dark:text-gray-200">Badge ile Liste</h2>
                    <ListGroup flush={flush} horizontal={horizontal} variant={variant} size={size}>
                        {badgeItems.map((item, index) => (
                            <ListGroupItem
                                key={index}
                                active={selectedItem === index + basicItems.length + iconItems.length}
                                onClick={() => setSelectedItem(index + basicItems.length + iconItems.length)}
                                badge={
                                    <Badge color={item.color as any} pill>
                                        {item.count}
                                    </Badge>
                                }
                            >
                                {item.text}
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                </div>

                <div>
                    <h2 className="mb-4 text-xl font-medium text-gray-800 dark:text-gray-200">Durum Bildiren Liste</h2>
                    <ListGroup flush={flush} horizontal={horizontal} variant={variant} size={size}>
                        {statusItems.map((item, index) => (
                            <ListGroupItem
                                key={index}
                                icon={item.icon}
                                active={item.status === 'success'}
                                disabled={item.status === 'disabled'}
                                onClick={() => setSelectedItem(index + basicItems.length + iconItems.length + badgeItems.length)}
                            >
                                {item.text}
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                </div>

                <div>
                    <h2 className="mb-4 text-xl font-medium text-gray-800 dark:text-gray-200">Katlanabilir Liste</h2>
                    <ListGroup flush={flush} horizontal={horizontal} variant={variant} size={size}>
                        {collapsibleItems.map((item, index) => (
                            <ListGroupItem
                                key={index}
                                icon={item.icon}
                                active={selectedItem === index + basicItems.length + iconItems.length + badgeItems.length + statusItems.length}
                                onClick={() => setSelectedItem(index + basicItems.length + iconItems.length + badgeItems.length + statusItems.length)}
                                collapsibleContent={item.collapsibleContent}
                            >
                                {item.text}
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                </div>
            </div>

            <div className="mt-12">
                <h2 className="mb-4 text-xl font-medium text-gray-800 dark:text-gray-200">Özelleştirilmiş Liste Örnekleri</h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700 bg-white dark:bg-gray-800">
                        <h3 className="mb-3 text-lg font-medium text-gray-800 dark:text-gray-200">Son İşlemler</h3>
                        <ListGroup flush variant="subtle" size="sm">
                            <ListGroupItem icon={DocumentIcon}>
                                <div>
                                    <div className="font-medium">Varlık Eklendi</div>
                                    <div className="text-gray-500 dark:text-gray-400 text-xs">10 Nisan 2023, 14:30</div>
                                </div>
                            </ListGroupItem>
                            <ListGroupItem icon={UserIcon}>
                                <div>
                                    <div className="font-medium">Kullanıcı Güncellendi</div>
                                    <div className="text-gray-500 dark:text-gray-400 text-xs">10 Nisan 2023, 13:15</div>
                                </div>
                            </ListGroupItem>
                            <ListGroupItem icon={CogIcon}>
                                <div>
                                    <div className="font-medium">Ayarlar Değiştirildi</div>
                                    <div className="text-gray-500 dark:text-gray-400 text-xs">10 Nisan 2023, 11:45</div>
                                </div>
                            </ListGroupItem>
                        </ListGroup>
                    </div>

                    <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700 bg-white dark:bg-gray-800">
                        <h3 className="mb-3 text-lg font-medium text-gray-800 dark:text-gray-200">Bildirimler</h3>
                        <ListGroup flush variant="bold" size="md">
                            <ListGroupItem active>
                                <div>
                                    <div className="font-medium">Yeni mesaj aldınız</div>
                                    <div className="text-blue-400 dark:text-blue-300 text-sm">Şimdi</div>
                                </div>
                            </ListGroupItem>
                            <ListGroupItem>
                                <div>
                                    <div className="font-medium">Bakım bildirimi</div>
                                    <div className="text-gray-500 dark:text-gray-400 text-sm">1 saat önce</div>
                                </div>
                            </ListGroupItem>
                            <ListGroupItem>
                                <div>
                                    <div className="font-medium">Sistem güncellemesi</div>
                                    <div className="text-gray-500 dark:text-gray-400 text-sm">3 saat önce</div>
                                </div>
                            </ListGroupItem>
                        </ListGroup>
                    </div>

                    <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700 bg-white dark:bg-gray-800">
                        <h3 className="mb-3 text-lg font-medium text-gray-800 dark:text-gray-200">Durum</h3>
                        <ListGroup flush variant="default" size="lg">
                            <ListGroupItem
                                icon={CheckCircleIcon}
                                badge={<Badge color="green">Normal</Badge>}
                            >
                                Sistem Durumu
                            </ListGroupItem>
                            <ListGroupItem
                                icon={ExclamationTriangleIcon}
                                badge={<Badge color="yellow">Uyarı</Badge>}
                            >
                                Bellek Kullanımı
                            </ListGroupItem>
                            <ListGroupItem
                                icon={CheckCircleIcon}
                                badge={<Badge color="green">İyi</Badge>}
                            >
                                Bağlantı
                            </ListGroupItem>
                        </ListGroup>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListGroupTest;