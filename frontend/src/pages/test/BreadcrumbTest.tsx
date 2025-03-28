import React, { useState } from 'react';
import { Breadcrumb, BreadcrumbItem } from '../../components/common/Breadcrumb';
import { DocumentIcon, HomeIcon, UserIcon, CogIcon } from '@heroicons/react/24/solid';
import { Button } from '../../components/common/Button';

const BreadcrumbTest: React.FC = () => {
    const [selectedExample, setSelectedExample] = useState<string>('basic');

    // Temel kullanım örneği
    const basicBreadcrumbs: BreadcrumbItem[] = [
        { name: 'Ana Sayfa', path: '/' },
        { name: 'Varlıklar', path: '/varliklar' },
        { name: 'Bilgisayarlar', path: '/varliklar/bilgisayarlar' },
        { name: 'MacBook Pro', path: '/varliklar/bilgisayarlar/123', current: true },
    ];

    // İkon içeren örnek
    const iconBreadcrumbs: BreadcrumbItem[] = [
        { name: 'Ana Sayfa', path: '/', icon: HomeIcon },
        { name: 'Kullanıcılar', path: '/kullanicilar', icon: UserIcon },
        { name: 'Ayarlar', path: '/ayarlar', icon: CogIcon },
        { name: 'Profil Ayarları', path: '/ayarlar/profil', icon: DocumentIcon, current: true },
    ];

    // Uzun yol örneği
    const longBreadcrumbs: BreadcrumbItem[] = [
        { name: 'Ana Sayfa', path: '/' },
        { name: 'Birimler', path: '/birimler' },
        { name: 'Fen İşleri', path: '/birimler/fen-isleri' },
        { name: 'Projeler', path: '/birimler/fen-isleri/projeler' },
        { name: '2023', path: '/birimler/fen-isleri/projeler/2023' },
        { name: 'Alt Yapı', path: '/birimler/fen-isleri/projeler/2023/alt-yapi' },
        { name: 'Su Şebekesi', path: '/birimler/fen-isleri/projeler/2023/alt-yapi/su-sebekesi', current: true },
    ];

    // Özel ayraç kullanımı
    const customSeparatorBreadcrumbs: BreadcrumbItem[] = [
        { name: 'Gösterge Paneli', path: '/' },
        { name: 'Raporlar', path: '/raporlar' },
        { name: 'Aylık Rapor', path: '/raporlar/aylik', current: true },
    ];

    const customSeparator = (
        <span className="mx-1 text-gray-400">/</span>
    );

    // Dinamik breadcrumb için
    const dynamicPaths = [
        { name: 'Ana Sayfa', path: '/' },
        { name: 'Varlıklar', path: '/varliklar' },
        { name: 'Kategoriler', path: '/varliklar/kategoriler' },
        { name: 'Mobilyalar', path: '/varliklar/kategoriler/mobilyalar' },
        { name: 'Sandalyeler', path: '/varliklar/kategoriler/mobilyalar/sandalyeler' },
    ];

    const [currentPathDepth, setCurrentPathDepth] = useState(2);

    const dynamicBreadcrumbs: BreadcrumbItem[] = dynamicPaths.slice(0, currentPathDepth).map((item, index) => ({
        ...item,
        current: index === currentPathDepth - 1
    }));

    const renderSelectedExample = () => {
        switch (selectedExample) {
            case 'basic':
                return <Breadcrumb items={basicBreadcrumbs} />;
            case 'icons':
                return <Breadcrumb items={iconBreadcrumbs} homeIcon={false} />;
            case 'long':
                return <Breadcrumb items={longBreadcrumbs} />;
            case 'separator':
                return <Breadcrumb items={customSeparatorBreadcrumbs} separator={customSeparator} />;
            case 'dynamic':
                return (
                    <>
                        <div className="mb-4 flex gap-2">
                            <Button
                                onClick={() => setCurrentPathDepth(prev => Math.max(1, prev - 1))}
                                disabled={currentPathDepth <= 1}
                                size="sm"
                            >
                                Yukarı
                            </Button>
                            <Button
                                onClick={() => setCurrentPathDepth(prev => Math.min(dynamicPaths.length, prev + 1))}
                                disabled={currentPathDepth >= dynamicPaths.length}
                                size="sm"
                            >
                                Derinleştir
                            </Button>
                        </div>
                        <Breadcrumb items={dynamicBreadcrumbs} />
                    </>
                );
            default:
                return <Breadcrumb items={basicBreadcrumbs} />;
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="mb-6 text-2xl font-semibold">Breadcrumb Bileşeni Testi</h1>

            <div className="mb-6 flex flex-wrap gap-2">
                <Button
                    onClick={() => setSelectedExample('basic')}
                    variant={selectedExample === 'basic' ? 'primary' : 'outline'}
                >
                    Temel Kullanım
                </Button>
                <Button
                    onClick={() => setSelectedExample('icons')}
                    variant={selectedExample === 'icons' ? 'primary' : 'outline'}
                >
                    İkonlu
                </Button>
                <Button
                    onClick={() => setSelectedExample('long')}
                    variant={selectedExample === 'long' ? 'primary' : 'outline'}
                >
                    Uzun Yol
                </Button>
                <Button
                    onClick={() => setSelectedExample('separator')}
                    variant={selectedExample === 'separator' ? 'primary' : 'outline'}
                >
                    Özel Ayraç
                </Button>
                <Button
                    onClick={() => setSelectedExample('dynamic')}
                    variant={selectedExample === 'dynamic' ? 'primary' : 'outline'}
                >
                    Dinamik
                </Button>
            </div>

            <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
                {renderSelectedExample()}
            </div>
        </div>
    );
};

export default BreadcrumbTest;
