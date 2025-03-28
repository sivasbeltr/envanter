import React, { useState } from 'react';
import { Button, ButtonVariant, ButtonSize } from '../../components/common/Button';
import {
    PlusIcon, ChevronRightIcon, ChevronDownIcon,
    DocumentArrowDownIcon, TrashIcon, PencilIcon, ArrowPathIcon
} from '@heroicons/react/24/solid';

const ButtonTest: React.FC = () => {
    const [loading, setLoading] = useState(false);

    // Simüle edilmiş yükleme efekti
    const handleLoadingClick = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };

    const variants: ButtonVariant[] = [
        'primary', 'secondary', 'success', 'danger',
        'warning', 'info', 'light', 'dark', 'outline', 'link'
    ];

    const sizes: ButtonSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

    return (
        <div className="container mx-auto p-4">
            <h1 className="mb-6 text-2xl font-semibold">Button Bileşeni Testi</h1>

            <section className="mb-8">
                <h2 className="mb-4 text-xl font-medium">Varyasyonlar</h2>
                <div className="flex flex-wrap gap-4">
                    {variants.map((variant) => (
                        <Button key={variant} variant={variant}>
                            {variant.charAt(0).toUpperCase() + variant.slice(1)}
                        </Button>
                    ))}
                </div>
            </section>

            <section className="mb-8">
                <h2 className="mb-4 text-xl font-medium">Boyutlar</h2>
                <div className="flex flex-wrap items-center gap-4">
                    {sizes.map((size) => (
                        <Button key={size} size={size}>
                            {size.toUpperCase()}
                        </Button>
                    ))}
                </div>
            </section>

            <section className="mb-8">
                <h2 className="mb-4 text-xl font-medium">İkonlu Düğmeler</h2>
                <div className="flex flex-wrap gap-4">
                    <Button leftIcon={PlusIcon}>Ekle</Button>
                    <Button rightIcon={ChevronRightIcon}>İlerle</Button>
                    <Button variant="success" leftIcon={DocumentArrowDownIcon}>Kaydet</Button>
                    <Button variant="danger" leftIcon={TrashIcon}>Sil</Button>
                    <Button variant="warning" leftIcon={PencilIcon}>Düzenle</Button>
                    <Button variant="info" leftIcon={ArrowPathIcon} rightIcon={ChevronDownIcon}>Yenile</Button>
                    <Button variant="outline" leftIcon={PlusIcon}>Yeni</Button>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="mb-4 text-xl font-medium">Tam Genişlik</h2>
                <div className="space-y-2">
                    <Button fullWidth>Tam Genişlik Düğme</Button>
                    <Button fullWidth variant="success">Tam Genişlik Başarı Düğmesi</Button>
                    <Button fullWidth variant="outline">Tam Genişlik Ana Hat Düğmesi</Button>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="mb-4 text-xl font-medium">Yuvarlak</h2>
                <div className="flex flex-wrap gap-4">
                    <Button rounded>Yuvarlak Düğme</Button>
                    <Button rounded variant="success" leftIcon={PlusIcon}>İkonlu Yuvarlak</Button>
                    <Button rounded variant="outline">Yuvarlak Ana Hat</Button>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="mb-4 text-xl font-medium">Durum Düğmeleri</h2>
                <div className="flex flex-wrap gap-4">
                    <Button disabled>Devre Dışı</Button>
                    <Button loading>Yükleniyor</Button>
                    <Button loading={loading} onClick={handleLoadingClick}>
                        {loading ? 'Yükleniyor...' : 'Yükleme Simülasyonu'}
                    </Button>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="mb-4 text-xl font-medium">Uygulama Örnekleri</h2>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
                        <h3 className="mb-4 text-lg font-medium">Form Düğmeleri</h3>
                        <div className="flex flex-wrap justify-end gap-2">
                            <Button variant="light">İptal</Button>
                            <Button>Kaydet</Button>
                        </div>
                    </div>

                    <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
                        <h3 className="mb-4 text-lg font-medium">İşlem Düğmeleri</h3>
                        <div className="flex flex-wrap gap-2">
                            <Button variant="outline" leftIcon={PencilIcon}>Düzenle</Button>
                            <Button variant="danger" leftIcon={TrashIcon}>Sil</Button>
                            <Button variant="success" leftIcon={ArrowPathIcon}>Yenile</Button>
                        </div>
                    </div>

                    <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
                        <h3 className="mb-4 text-lg font-medium">Adım Kontrolleri</h3>
                        <div className="flex justify-between">
                            <Button variant="outline" leftIcon={ChevronRightIcon}>Önceki</Button>
                            <Button rightIcon={ChevronRightIcon}>Sonraki</Button>
                        </div>
                    </div>

                    <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
                        <h3 className="mb-4 text-lg font-medium">Filtre Düğmeleri</h3>
                        <div className="flex flex-wrap gap-2">
                            <Button size="sm" variant="light">Tümü</Button>
                            <Button size="sm" variant="primary">Aktif</Button>
                            <Button size="sm" variant="light">Bekleyen</Button>
                            <Button size="sm" variant="light">İptal Edildi</Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ButtonTest;
