import React from 'react';
import { Button } from '../../components/common/Button';

/**
 * Test component for Button examples
 */
const ButtonTest: React.FC = () => {
    return (
        <section>
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Buton Örnekleri</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Button Variants */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                    <h3 className="font-medium mb-2 text-gray-800 dark:text-gray-200">Buton Varyantları</h3>
                    <div className="flex flex-wrap gap-2">
                        <Button variant="primary">Primary</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="success">Success</Button>
                        <Button variant="danger">Danger</Button>
                        <Button variant="warning">Warning</Button>
                        <Button variant="info">Info</Button>
                    </div>
                </div>

                {/* Button Sizes */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                    <h3 className="font-medium mb-2 text-gray-800 dark:text-gray-200">Buton Boyutları</h3>
                    <div className="flex flex-wrap items-center gap-2">
                        <Button size="sm">Küçük</Button>
                        <Button size="md">Orta</Button>
                        <Button size="lg">Büyük</Button>
                    </div>
                </div>

                {/* Button States */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                    <h3 className="font-medium mb-2 text-gray-800 dark:text-gray-200">Buton Durumları</h3>
                    <div className="flex flex-wrap gap-2">
                        <Button disabled>Devre Dışı</Button>
                        <Button isLoading>Yükleniyor</Button>
                        <Button fullWidth>Tam Genişlik</Button>
                    </div>
                </div>

                {/* Button with Icons */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                    <h3 className="font-medium mb-2 text-gray-800 dark:text-gray-200">İkonlu Butonlar</h3>
                    <div className="flex flex-wrap gap-2">
                        <Button
                            variant="primary"
                            startIcon={
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                            }
                        >
                            Ekle
                        </Button>

                        <Button
                            variant="secondary"
                            endIcon={
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                            }
                        >
                            İleri
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ButtonTest;
