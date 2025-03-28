import React, { useState } from 'react';
import { Dropdown, DropdownItem } from '../../components/common/Dropdown';
import { Button } from '../../components/common/Button';
import {
    CogIcon, UserIcon, DocumentIcon, PlusIcon,
    TrashIcon, PencilIcon, ArrowDownIcon, LockClosedIcon, ChevronDownIcon,
    ArrowRightStartOnRectangleIcon as LogoutIcon
} from '@heroicons/react/24/solid';

const DropdownTest: React.FC = () => {
    const [selectedAction, setSelectedAction] = useState<string | null>(null);
    const [align, setAlign] = useState<'left' | 'right'>('left');
    const [width, setWidth] = useState<'auto' | 'sm' | 'md' | 'lg' | 'xl'>('md');
    const [disabled, setDisabled] = useState<boolean>(false);
    const [showHeader, setShowHeader] = useState<boolean>(false);
    const [showFooter, setShowFooter] = useState<boolean>(false);

    // Örnek menü öğeleri
    const basicItems: DropdownItem[] = [
        { label: 'Profil', onClick: () => setSelectedAction('Profil tıklandı') },
        { label: 'Ayarlar', onClick: () => setSelectedAction('Ayarlar tıklandı') },
        { divider: true },
        { label: 'Çıkış Yap', onClick: () => setSelectedAction('Çıkış Yap tıklandı') },
    ];

    // İkonlu menü öğeleri
    const iconItems: DropdownItem[] = [
        { label: 'Profil', icon: UserIcon, onClick: () => setSelectedAction('Profil tıklandı') },
        { label: 'Ayarlar', icon: CogIcon, onClick: () => setSelectedAction('Ayarlar tıklandı') },
        { divider: true },
        { label: 'Çıkış Yap', icon: LogoutIcon, onClick: () => setSelectedAction('Çıkış Yap tıklandı') },
    ];

    // Devre dışı öğeler
    const disabledItems: DropdownItem[] = [
        { label: 'Yeni Belge', icon: DocumentIcon, onClick: () => setSelectedAction('Yeni Belge tıklandı') },
        { label: 'Ekle', icon: PlusIcon, onClick: () => setSelectedAction('Ekle tıklandı') },
        { label: 'Düzenle', icon: PencilIcon, disabled: true, onClick: () => setSelectedAction('Düzenle tıklandı') },
        { divider: true },
        { label: 'Sil', icon: TrashIcon, disabled: true, onClick: () => setSelectedAction('Sil tıklandı') },
    ];

    // Özel CSS sınıflarıyla menü öğeleri
    const customItems: DropdownItem[] = [
        { label: 'Normal Öğe', onClick: () => setSelectedAction('Normal öğe tıklandı') },
        {
            label: 'Önemli Öğe',
            className: 'font-bold text-blue-600 dark:text-blue-400',
            onClick: () => setSelectedAction('Önemli öğe tıklandı')
        },
        {
            label: 'Uyarı',
            className: 'text-yellow-600 dark:text-yellow-400',
            icon: LockClosedIcon,
            onClick: () => setSelectedAction('Uyarı tıklandı')
        },
        {
            label: 'Hata',
            className: 'text-red-600 dark:text-red-400',
            onClick: () => setSelectedAction('Hata tıklandı')
        },
    ];


    return (
        <div className="container mx-auto p-4">
            <h1 className="mb-6 text-2xl font-semibold">Dropdown Bileşeni Testi</h1>

            <div className="mb-8 space-y-4">
                <h2 className="text-xl font-medium">Seçenekler</h2>

                <div className="flex flex-wrap gap-3">
                    <Button
                        onClick={() => setAlign(align === 'left' ? 'right' : 'left')}
                        variant="outline"
                        size="sm"
                    >
                        Hizalama: {align}
                    </Button>

                    <Button
                        onClick={() => {
                            const sizes: ('auto' | 'sm' | 'md' | 'lg' | 'xl')[] = ['auto', 'sm', 'md', 'lg', 'xl'];
                            const currentIndex = sizes.indexOf(width);
                            const nextIndex = (currentIndex + 1) % sizes.length;
                            setWidth(sizes[nextIndex]);
                        }}
                        variant="outline"
                        size="sm"
                    >
                        Genişlik: {width}
                    </Button>

                    <Button
                        onClick={() => setDisabled(!disabled)}
                        variant={disabled ? 'primary' : 'outline'}
                        size="sm"
                    >
                        {disabled ? 'Devre Dışı' : 'Etkin'}
                    </Button>

                    <Button
                        onClick={() => setShowHeader(!showHeader)}
                        variant={showHeader ? 'primary' : 'outline'}
                        size="sm"
                    >
                        {showHeader ? 'Başlık: Görünür' : 'Başlık: Gizli'}
                    </Button>

                    <Button
                        onClick={() => setShowFooter(!showFooter)}
                        variant={showFooter ? 'primary' : 'outline'}
                        size="sm"
                    >
                        {showFooter ? 'Alt Bilgi: Görünür' : 'Alt Bilgi: Gizli'}
                    </Button>
                </div>

                {selectedAction && (
                    <div className="mt-2 rounded-md bg-gray-100 p-2 dark:bg-gray-800">
                        <p className="text-sm">Son Eylem: <span className="font-medium">{selectedAction}</span></p>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="space-y-6">
                    <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                        <h3 className="mb-4 border-b border-gray-200 pb-2 text-lg font-medium dark:border-gray-700">Temel Dropdown</h3>
                        <Dropdown
                            trigger="Kullanıcı İşlemleri"
                            items={basicItems}
                            align={align}
                            width={width}
                            disabled={disabled}
                            header={showHeader ? 'Kullanıcı' : undefined}
                            footer={showFooter ? 'Diğer işlemler için yöneticinize başvurun' : undefined}
                        />
                    </div>

                    <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                        <h3 className="mb-4 border-b border-gray-200 pb-2 text-lg font-medium dark:border-gray-700">İkonlu Dropdown</h3>
                        <Dropdown
                            trigger="İkonlu Menü"
                            items={iconItems}
                            align={align}
                            width={width}
                            disabled={disabled}
                            header={showHeader ? 'Kullanıcı İşlemleri' : undefined}
                            footer={showFooter ? 'Son Giriş: 10.04.2023' : undefined}
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                        <h3 className="mb-4 border-b border-gray-200 pb-2 text-lg font-medium dark:border-gray-700">Devre Dışı Öğeler</h3>
                        <Dropdown
                            trigger="Belge İşlemleri"
                            items={disabledItems}
                            align={align}
                            width={width}
                            disabled={disabled}
                            header={showHeader ? 'Belge Yönetimi' : undefined}
                            footer={showFooter ? 'Bazı işlemler için yeterli izniniz yok' : undefined}
                        />
                    </div>

                    <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                        <h3 className="mb-4 border-b border-gray-200 pb-2 text-lg font-medium dark:border-gray-700">Özel Stilli Öğeler</h3>
                        <Dropdown
                            trigger="Özel Menü"
                            items={customItems}
                            align={align}
                            width={width}
                            disabled={disabled}
                            header={showHeader ? 'Özel Stiller' : undefined}
                            footer={showFooter ? 'Dikkatle kullanın' : undefined}
                        />
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="mb-4 text-xl font-medium">Özel Tetikleyicilerle Dropdown</h2>
                <div className="flex flex-wrap gap-4">
                    <Dropdown
                        trigger={
                            <Button rightIcon={ChevronDownIcon}>
                                Özel Düğme
                            </Button>
                        }
                        items={iconItems}
                        align="left"
                        disabled={disabled}
                    />

                    <Dropdown
                        trigger={
                            <div className="flex cursor-pointer items-center rounded-full bg-gray-200 p-2 dark:bg-gray-700">
                                <UserIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                                <ArrowDownIcon className="ml-1 h-4 w-4 text-gray-700 dark:text-gray-300" />
                            </div>
                        }
                        items={iconItems}
                        align="right"
                        disabled={disabled}
                    />
                </div>
            </div>
        </div>
    );
};

export default DropdownTest;
