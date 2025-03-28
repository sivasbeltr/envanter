import React, { useState } from 'react';
import { Carousel } from '../../components/common/Carousel';
import { Button } from '../../components/common/Button';

const CarouselTest: React.FC = () => {
    const [autoPlay, setAutoPlay] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [showIndicators, setShowIndicators] = useState(true);
    const [showThumbnails, setShowThumbnails] = useState(false);
    const [swipeable, setSwipeable] = useState(true);
    const [carouselHeight, setCarouselHeight] = useState('h-64');

    // Örnek slayt içerikleri
    const slides = [
        <div key="slide-1" className="flex h-full w-full items-center justify-center bg-blue-100 dark:bg-blue-900">
            <div className="text-center">
                <h2 className="mb-2 text-2xl font-bold text-blue-700 dark:text-blue-200">Hoş Geldiniz</h2>
                <p className="text-blue-600 dark:text-blue-300">Bu bir tanıtım slaytıdır.</p>
            </div>
        </div>,
        <div key="slide-2" className="flex h-full w-full items-center justify-center bg-green-100 dark:bg-green-900">
            <div className="text-center">
                <h2 className="mb-2 text-2xl font-bold text-green-700 dark:text-green-200">Özellikler</h2>
                <p className="text-green-600 dark:text-green-300">Yeni özelliklerimizi keşfedin.</p>
            </div>
        </div>,
        <div key="slide-3" className="flex h-full w-full items-center justify-center bg-yellow-100 dark:bg-yellow-900">
            <div className="text-center">
                <h2 className="mb-2 text-2xl font-bold text-yellow-700 dark:text-yellow-200">İletişim</h2>
                <p className="text-yellow-600 dark:text-yellow-300">Bize ulaşın!</p>
            </div>
        </div>,
    ];

    const captions = [
        'Bu bir hoş geldiniz mesajıdır.',
        'Yeni özelliklerimiz hakkında bilgi alın.',
        'İletişim bilgileri için son slayt.',
    ];

    // Görsel tabanlı slaytlar
    const imageSlides = [
        <img
            key="img-1"
            src="https://via.placeholder.com/800x400/3b82f6/FFFFFF?text=Görsel+1"
            alt="Görsel 1"
            className="h-full w-full object-cover"
        />,
        <img
            key="img-2"
            src="https://via.placeholder.com/800x400/10b981/FFFFFF?text=Görsel+2"
            alt="Görsel 2"
            className="h-full w-full object-cover"
        />,
        <img
            key="img-3"
            src="https://via.placeholder.com/800x400/ef4444/FFFFFF?text=Görsel+3"
            alt="Görsel 3"
            className="h-full w-full object-cover"
        />,
        <img
            key="img-4"
            src="https://via.placeholder.com/800x400/f59e0b/FFFFFF?text=Görsel+4"
            alt="Görsel 4"
            className="h-full w-full object-cover"
        />,
    ];

    const imageCaptions = [
        'Birinci görselin açıklaması.',
        'İkinci görselin açıklaması.',
        'Üçüncü görselin açıklaması.',
        'Dördüncü görselin açıklaması.',
    ];

    return (
        <div className="container mx-auto p-6">
            <h1 className="mb-6 text-3xl font-semibold text-gray-900 dark:text-white">Carousel Bileşeni Testi</h1>

            <div className="mb-8">
                <h2 className="mb-4 text-xl font-medium text-gray-800 dark:text-gray-200">Temel Kullanım</h2>
                <div className="mb-4 flex flex-wrap gap-2">
                    <Button
                        onClick={() => setAutoPlay(!autoPlay)}
                        variant={autoPlay ? 'primary' : 'outline'}
                    >
                        {autoPlay ? 'Otomatik Oynatma: Açık' : 'Otomatik Oynatma: Kapalı'}
                    </Button>
                    <Button
                        onClick={() => setShowControls(!showControls)}
                        variant={showControls ? 'primary' : 'outline'}
                    >
                        {showControls ? 'Kontroller: Görünür' : 'Kontroller: Gizli'}
                    </Button>
                    <Button
                        onClick={() => setShowIndicators(!showIndicators)}
                        variant={showIndicators ? 'primary' : 'outline'}
                    >
                        {showIndicators ? 'İndikatörler: Görünür' : 'İndikatörler: Gizli'}
                    </Button>
                    <Button
                        onClick={() => setShowThumbnails(!showThumbnails)}
                        variant={showThumbnails ? 'primary' : 'outline'}
                    >
                        {showThumbnails ? 'Küçük Resimler: Görünür' : 'Küçük Resimler: Gizli'}
                    </Button>
                    <Button
                        onClick={() => setSwipeable(!swipeable)}
                        variant={swipeable ? 'primary' : 'outline'}
                    >
                        {swipeable ? 'Kaydırma: Açık' : 'Kaydırma: Kapalı'}
                    </Button>
                </div>

                <div className="mb-4 flex flex-wrap gap-2">
                    <Button
                        onClick={() => setCarouselHeight('h-40')}
                        variant={carouselHeight === 'h-40' ? 'primary' : 'outline'}
                        size="sm"
                    >
                        Küçük Boy
                    </Button>
                    <Button
                        onClick={() => setCarouselHeight('h-64')}
                        variant={carouselHeight === 'h-64' ? 'primary' : 'outline'}
                        size="sm"
                    >
                        Orta Boy
                    </Button>
                    <Button
                        onClick={() => setCarouselHeight('h-96')}
                        variant={carouselHeight === 'h-96' ? 'primary' : 'outline'}
                        size="sm"
                    >
                        Büyük Boy
                    </Button>
                </div>

                <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <Carousel
                        autoPlay={autoPlay}
                        interval={3000}
                        controls={showControls}
                        indicators={showIndicators}
                        thumbnails={showThumbnails}
                        swipeable={swipeable}
                        fullscreen
                        height={carouselHeight}
                        captions={captions}
                    >
                        {slides}
                    </Carousel>
                </div>
            </div>

            <div className="mb-8">
                <h2 className="mb-4 text-xl font-medium text-gray-800 dark:text-gray-200">Görsel Carousel</h2>
                <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <Carousel
                        autoPlay={autoPlay}
                        interval={3000}
                        controls={showControls}
                        indicators={showIndicators}
                        thumbnails={showThumbnails}
                        swipeable={swipeable}
                        fullscreen
                        height={carouselHeight}
                        captions={imageCaptions}
                    >
                        {imageSlides}
                    </Carousel>
                </div>
            </div>

            <div className="mb-8">
                <h2 className="mb-4 text-xl font-medium text-gray-800 dark:text-gray-200">Tek Görselle Carousel</h2>
                <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <Carousel
                        controls={false}
                        indicators={false}
                        height="h-48"
                        captions={['Tek görsel açıklaması']}
                    >
                        {[imageSlides[0]]}
                    </Carousel>
                </div>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Not: Tek görsel olduğunda kontroller ve indikatörler varsayılan olarak gizlenir.
                </p>
            </div>
        </div>
    );
};

export default CarouselTest;