import React from 'react';
import { Badge, BadgeColor, BadgeSize } from '../../components/common/Badge';

const BadgeTest: React.FC = () => {
    const colors: BadgeColor[] = ['primary', 'gray', 'red', 'yellow', 'green', 'blue', 'indigo', 'purple', 'pink'];
    const sizes: BadgeSize[] = ['xs', 'sm', 'md', 'lg'];

    return (
        <div className="container mx-auto p-4">
            <h1 className="mb-6 text-2xl font-semibold">Badge Bileşeni Testi</h1>

            <section className="mb-8">
                <h2 className="mb-4 text-xl font-medium">Renkler</h2>
                <div className="flex flex-wrap gap-3">
                    {colors.map(color => (
                        <Badge key={color} color={color}>
                            {color.charAt(0).toUpperCase() + color.slice(1)}
                        </Badge>
                    ))}
                </div>
            </section>

            <section className="mb-8">
                <h2 className="mb-4 text-xl font-medium">Boyutlar</h2>
                <div className="flex flex-wrap items-center gap-3">
                    {sizes.map(size => (
                        <Badge key={size} color="primary" size={size}>
                            {size.toUpperCase()}
                        </Badge>
                    ))}
                </div>
            </section>

            <section className="mb-8">
                <h2 className="mb-4 text-xl font-medium">Pill Şekli</h2>
                <div className="flex flex-wrap gap-3">
                    <Badge color="primary" pill>Normal Badge</Badge>
                    <Badge color="green" pill>Başarılı</Badge>
                    <Badge color="yellow" pill>Beklemede</Badge>
                    <Badge color="red" pill>Hata</Badge>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="mb-4 text-xl font-medium">Noktalı Göstergeler</h2>
                <div className="flex flex-wrap gap-3">
                    <Badge color="primary" dot>Çevrimiçi</Badge>
                    <Badge color="green" dot>Aktif</Badge>
                    <Badge color="yellow" dot>Uzak</Badge>
                    <Badge color="red" dot>Çevrimdışı</Badge>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="mb-4 text-xl font-medium">Animasyonlu Göstergeler</h2>
                <div className="flex flex-wrap gap-3">
                    <Badge color="primary" pulse>Yeni</Badge>
                    <Badge color="red" pulse>Kritik</Badge>
                    <Badge color="yellow" pulse>Dikkat</Badge>
                    <Badge color="green" pulse>Güncellendi</Badge>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="mb-4 text-xl font-medium">Tıklanabilir Badgeler</h2>
                <div className="flex flex-wrap gap-3">
                    <Badge color="primary" onClick={() => alert('Primary badge tıklandı')}>
                        Tıkla
                    </Badge>
                    <Badge color="green" onClick={() => alert('Green badge tıklandı')}>
                        İncele
                    </Badge>
                    <Badge color="red" onClick={() => alert('Red badge tıklandı')}>
                        Sil
                    </Badge>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="mb-4 text-xl font-medium">Örnek Kullanım</h2>
                <div className="mb-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                    <div className="mb-2 flex items-center">
                        <h3 className="text-lg font-semibold">Envanter Durumu</h3>
                        <Badge color="blue" className="ml-2">Güncel</Badge>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center">
                            <span className="mr-2">Toplam Varlık:</span>
                            <Badge color="gray" pill>2450</Badge>
                        </div>
                        <div className="flex items-center">
                            <span className="mr-2">Aktif:</span>
                            <Badge color="green" pill>2100</Badge>
                        </div>
                        <div className="flex items-center">
                            <span className="mr-2">Bakımda:</span>
                            <Badge color="yellow" pill>250</Badge>
                        </div>
                        <div className="flex items-center">
                            <span className="mr-2">Arızalı:</span>
                            <Badge color="red" dot>100</Badge>
                        </div>
                        <div className="flex items-center">
                            <span className="mr-2">Yeni Eklenen:</span>
                            <Badge color="indigo" pulse>15</Badge>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BadgeTest;
