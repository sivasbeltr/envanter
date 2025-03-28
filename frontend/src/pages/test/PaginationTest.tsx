import React, { useState } from 'react';
import { Pagination } from '../../components/common/Pagination';
import { Button } from '../../components/common/Button';

const PaginationTest: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(10);
    const [siblingCount, setSiblingCount] = useState(1);
    const [showEndButtons, setShowEndButtons] = useState(true);
    const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md');

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleTotalPagesChange = (change: number) => {
        const newTotal = Math.max(1, totalPages + change);
        setTotalPages(newTotal);
        if (currentPage > newTotal) {
            setCurrentPage(newTotal);
        }
    };

    const handleSiblingCountChange = (change: number) => {
        setSiblingCount(Math.max(0, siblingCount + change));
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="mb-6 text-2xl font-semibold">Pagination Bileşeni Testi</h1>

            <div className="mb-8">
                <h2 className="mb-4 text-xl font-medium">Kontrol Paneli</h2>

                <div className="mb-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <h3 className="mb-2 font-medium">Toplam Sayfa</h3>
                        <div className="flex items-center">
                            <Button
                                onClick={() => handleTotalPagesChange(-1)}
                                disabled={totalPages <= 1}
                                size="sm"
                            >
                                -
                            </Button>
                            <span className="mx-2 px-2 font-medium">{totalPages}</span>
                            <Button
                                onClick={() => handleTotalPagesChange(1)}
                                size="sm"
                            >
                                +
                            </Button>
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-2 font-medium">Gösterilen Düğme Sayısı</h3>
                        <div className="flex items-center">
                            <Button
                                onClick={() => handleSiblingCountChange(-1)}
                                disabled={siblingCount <= 0}
                                size="sm"
                            >
                                -
                            </Button>
                            <span className="mx-2 px-2 font-medium">{siblingCount}</span>
                            <Button
                                onClick={() => handleSiblingCountChange(1)}
                                size="sm"
                            >
                                +
                            </Button>
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-2 font-medium">Uç Düğmeleri</h3>
                        <Button
                            onClick={() => setShowEndButtons(!showEndButtons)}
                            variant={showEndButtons ? 'primary' : 'outline'}
                        >
                            {showEndButtons ? 'Göster' : 'Gizle'}
                        </Button>
                    </div>

                    <div>
                        <h3 className="mb-2 font-medium">Boyut</h3>
                        <div className="flex flex-wrap gap-2">
                            <Button
                                onClick={() => setSize('sm')}
                                variant={size === 'sm' ? 'primary' : 'outline'}
                                size="sm"
                            >
                                Küçük
                            </Button>
                            <Button
                                onClick={() => setSize('md')}
                                variant={size === 'md' ? 'primary' : 'outline'}
                                size="sm"
                            >
                                Orta
                            </Button>
                            <Button
                                onClick={() => setSize('lg')}
                                variant={size === 'lg' ? 'primary' : 'outline'}
                                size="sm"
                            >
                                Büyük
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="rounded-md bg-blue-50 p-2 dark:bg-blue-900/20">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                        Şu an <span className="font-bold">{totalPages}</span> sayfadan <span className="font-bold">{currentPage}.</span> sayfadasınız.
                    </p>
                </div>
            </div>

            <div className="space-y-12">
                <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
                    <h2 className="mb-6 text-xl font-medium">Standart Pagination</h2>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        siblingCount={siblingCount}
                        showEndButtons={showEndButtons}
                        size={size}
                    />
                </div>

                <div className="space-y-8">
                    <h2 className="text-xl font-medium">Özel Kullanım Örnekleri</h2>

                    <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
                        <h3 className="mb-4 text-lg font-medium">Az Sayfalı Liste</h3>
                        <Pagination
                            currentPage={1}
                            totalPages={3}
                            onPageChange={() => { }}
                            size="sm"
                        />
                    </div>

                    <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
                        <h3 className="mb-4 text-lg font-medium">Çok Sayfalı Liste</h3>
                        <Pagination
                            currentPage={5}
                            totalPages={50}
                            onPageChange={() => { }}
                            siblingCount={2}
                        />
                    </div>

                    <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
                        <h3 className="mb-4 text-lg font-medium">Tablo ile Kullanım</h3>
                        <div className="mb-4 overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-800">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                            ID
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                            Ad
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                            Kategori
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                            Durum
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <tr key={i}>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <div className="text-sm text-gray-900 dark:text-gray-100">{i}</div>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <div className="text-sm text-gray-900 dark:text-gray-100">Ürün {i}</div>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <div className="text-sm text-gray-900 dark:text-gray-100">Kategori {i}</div>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <div className="text-sm text-gray-900 dark:text-gray-100">
                                                    {i % 2 === 0 ? 'Aktif' : 'Beklemede'}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                            <div className="text-sm text-gray-700 dark:text-gray-300">
                                1-5 / 15 kayıt gösteriliyor
                            </div>
                            <Pagination
                                currentPage={1}
                                totalPages={3}
                                onPageChange={() => { }}
                                size="sm"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaginationTest;
