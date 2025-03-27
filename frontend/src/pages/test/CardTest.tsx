import React from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Panel } from '../../components/common/Panel';

/**
 * Test component for Card examples
 */
const CardTest: React.FC = () => {
    return (
        <section>
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Kart Bileşeni Örnekleri</h2>

            {/* Basic Cards */}
            <Panel
                title="Temel Kartlar"
                variant="elevated"
                className="mb-6"
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Basic Card */}
                    <Card title="Temel Kart" subtitle="Alt başlık">
                        <p className="text-gray-700 dark:text-gray-300">
                            Bu basit bir kart bileşenidir. Başlık, alt başlık ve içerik alanları bulunur.
                        </p>
                    </Card>

                    {/* Card with Image */}
                    <Card
                        title="Resimli Kart"
                        image="https://images.unsplash.com/photo-1522770179533-24471fcdba45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                        imageAlt="Örnek Resim"
                    >
                        <p className="text-gray-700 dark:text-gray-300">
                            Bu kartta bir resim bulunmaktadır. Resimler kartın üstünde veya altında konumlandırılabilir.
                        </p>
                    </Card>

                    {/* Card with Footer */}
                    <Card
                        title="Alt Bilgili Kart"
                        footer={
                            <div className="flex justify-end">
                                <Button variant="secondary" size="sm" className="mr-2">İptal</Button>
                                <Button variant="primary" size="sm">Kaydet</Button>
                            </div>
                        }
                    >
                        <p className="text-gray-700 dark:text-gray-300">
                            Bu kartta alt bilgi alanı bulunmaktadır. Alt bilgi genellikle işlem butonları içerir.
                        </p>
                    </Card>
                </div>
            </Panel>

            {/* Card Variants */}
            <Panel
                title="Kart Varyantları"
                variant="elevated"
                className="mb-6"
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <Card title="Varsayılan" variant="default">
                        <p className="text-gray-700 dark:text-gray-300">Varsayılan kart stili.</p>
                    </Card>
                    <Card title="Birincil" variant="primary">
                        <p className="text-gray-700 dark:text-gray-300">Birincil varyant.</p>
                    </Card>
                    <Card title="İkincil" variant="secondary">
                        <p className="text-gray-700 dark:text-gray-300">İkincil varyant.</p>
                    </Card>
                    <Card title="Başarı" variant="success">
                        <p className="text-gray-700 dark:text-gray-300">Başarı varyantı.</p>
                    </Card>
                    <Card title="Tehlike" variant="danger">
                        <p className="text-gray-700 dark:text-gray-300">Tehlike varyantı.</p>
                    </Card>
                    <Card title="Uyarı" variant="warning">
                        <p className="text-gray-700 dark:text-gray-300">Uyarı varyantı.</p>
                    </Card>
                    <Card title="Bilgi" variant="info">
                        <p className="text-gray-700 dark:text-gray-300">Bilgi varyantı.</p>
                    </Card>
                </div>
            </Panel>

            {/* Card Styles */}
            <Panel
                title="Kart Stilleri ve Görünümleri"
                variant="elevated"
                className="mb-6"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Shadow Variations */}
                    <Card title="Gölgeli (lg)" shadow="lg">
                        <p className="text-gray-700 dark:text-gray-300">Büyük gölgeli kart.</p>
                    </Card>

                    {/* Borderless */}
                    <Card title="Kenarlıksız" bordered={false} shadow="md">
                        <p className="text-gray-700 dark:text-gray-300">Kenarlığı olmayan kart.</p>
                    </Card>

                    {/* Hoverable */}
                    <Card title="Üzerine Gelince" hoverable>
                        <p className="text-gray-700 dark:text-gray-300">
                            Fare üzerine geldiğinde hafifçe yükselen kart.
                        </p>
                    </Card>
                </div>
            </Panel>

            {/* Horizontal Cards */}
            <Panel
                title="Yatay Kartlar"
                variant="elevated"
                className="mb-6"
            >
                <div className="space-y-4">
                    <Card
                        horizontal
                        title="Yatay Kart"
                        image="https://images.unsplash.com/photo-1590479773265-7464e5d48118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                        imageAlt="Örnek Resim"
                    >
                        <p className="text-gray-700 dark:text-gray-300">
                            Yatay kartlar, genellikle liste görünümlerinde kullanılır. Resim sol tarafta, içerik sağ tarafta yer alır.
                            Bu düzen özellikle mobil görünümlerde otomatik olarak dikey düzene dönüşür.
                        </p>
                    </Card>

                    <Card
                        horizontal
                        title="İşlevsel Kart"
                        subtitle="Tıklanabilir"
                        image="https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                        imageAlt="Örnek Resim"
                        onClick={() => alert('Kart tıklandı!')}
                        hoverable
                        footer={
                            <div className="flex justify-end">
                                <Button variant="primary" size="sm">Detaylar</Button>
                            </div>
                        }
                    >
                        <p className="text-gray-700 dark:text-gray-300">
                            Bu kart tıklanabilirdir ve üzerine gelindiğinde hafifçe yükselir.
                            Butonlar eklenerek daha fazla işlev kazandırılabilir.
                        </p>
                    </Card>
                </div>
            </Panel>

            {/* Compound Component API */}
            <Panel
                title="Bileşik Komponent API Kullanımı"
                variant="elevated"
                className="mb-6"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                        <Card.Header>
                            <Card.Title>Bileşik Komponent</Card.Title>
                            <Card.Subtitle>Farklı bir kullanım şekli</Card.Subtitle>
                        </Card.Header>
                        <Card.Body>
                            <p className="text-gray-700 dark:text-gray-300">
                                Bu kart, bileşik komponent API'si kullanılarak oluşturuldu.
                                Bu yöntem, daha esnek bir yapı sağlar ve özel içerik düzenlemeleri yapmayı kolaylaştırır.
                            </p>
                        </Card.Body>
                        <Card.Footer>
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-500">Son güncelleme: Bugün</span>
                                <Button variant="primary" size="sm">İşlem</Button>
                            </div>
                        </Card.Footer>
                    </Card>

                    <Card>
                        <Card.Image
                            src="https://images.unsplash.com/photo-1497215842964-222b430dc094?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                            alt="Örnek Resim"
                        />
                        <Card.Body>
                            <Card.Title>Resimli Bileşik Kart</Card.Title>
                            <Card.Subtitle className="mb-2">Resim ve içerik</Card.Subtitle>
                            <p className="text-gray-700 dark:text-gray-300">
                                Bileşik komponent API'si ile resimler ve içerik kombinasyonları kolayca oluşturulabilir.
                            </p>
                        </Card.Body>
                    </Card>
                </div>
            </Panel>
        </section>
    );
};

export default CardTest;
