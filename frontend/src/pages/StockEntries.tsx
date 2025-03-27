import React from 'react';

const StockEntries: React.FC = () => {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Giriş Fişleri Yönetimi</h1>
            <p className="text-gray-600 dark:text-gray-300">
                Bu sayfada envantere yeni giriş fişleri oluşturabilir, mevcut fişleri düzenleyebilir ve geçmiş giriş fişlerini görüntüleyebilirsiniz.
            </p>

            <div className="mt-8 text-center text-gray-500 dark:text-gray-400">
                <p>Bu bölümün içeriği yakında eklenecektir.</p>
            </div>
        </div>
    );
};

export default StockEntries;
