import React, { useState, useEffect, useMemo } from 'react';
import Dialog from '../components/dialogs/Dialog';

interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    stock: number;
    sku: string;
    supplier: string;
    lastUpdated: string;
    description: string;
    threshold: number;
    status: 'active' | 'inactive' | 'discontinued';
}

interface Supplier {
    id: string;
    name: string;
}



const ProductManagement: React.FC = () => {
    // More comprehensive product data with additional fields
    const [products, setProducts] = useState<Product[]>([
        { id: 1, name: 'Laptop', category: 'Elektronik', price: 8999, stock: 23, sku: 'EL-LAP-001', supplier: 'TechCo', lastUpdated: '2023-11-20', description: '15.6" FHD, i7, 16GB RAM, 512GB SSD', threshold: 10, status: 'active' },
        { id: 2, name: 'Telefon', category: 'Elektronik', price: 5499, stock: 45, sku: 'EL-TEL-002', supplier: 'MobileTech', lastUpdated: '2023-11-18', description: '6.2" AMOLED, 128GB, 8GB RAM', threshold: 15, status: 'active' },
        { id: 3, name: 'Monitor', category: 'Elektronik', price: 2799, stock: 12, sku: 'EL-MON-003', supplier: 'TechCo', lastUpdated: '2023-11-15', description: '27" 4K, IPS Panel, 5ms', threshold: 8, status: 'active' },
        { id: 4, name: 'Klavye', category: 'Bilgisayar Bileşenleri', price: 899, stock: 67, sku: 'PC-KEY-001', supplier: 'PCParts', lastUpdated: '2023-11-10', description: 'Mekanik, RGB, Türkçe Q', threshold: 20, status: 'active' },
        { id: 5, name: 'Mouse', category: 'Bilgisayar Bileşenleri', price: 349, stock: 89, sku: 'PC-MOU-002', supplier: 'PCParts', lastUpdated: '2023-11-05', description: 'Kablosuz, 16000 DPI, RGB', threshold: 25, status: 'active' },
        { id: 6, name: 'Kulaklık', category: 'Ses Sistemleri', price: 1299, stock: 34, sku: 'SS-HEAD-001', supplier: 'AudioTech', lastUpdated: '2023-11-17', description: 'Kablosuz, Gürültü Engelleme', threshold: 10, status: 'active' },
        { id: 7, name: 'Yazıcı', category: 'Ofis Ekipmanları', price: 1899, stock: 7, sku: 'OF-PRT-001', supplier: 'OfficeSup', lastUpdated: '2023-11-12', description: 'Renkli Lazer, Wifi', threshold: 5, status: 'inactive' },
        { id: 8, name: 'Tablet', category: 'Elektronik', price: 3599, stock: 19, sku: 'EL-TAB-001', supplier: 'MobileTech', lastUpdated: '2023-11-14', description: '10.2", 64GB, Wifi', threshold: 10, status: 'active' },
    ]);

    // Sample suppliers and categories (would come from API in real scenario)
    const suppliers: Supplier[] = [
        { id: 'TechCo', name: 'TechCo Electronics' },
        { id: 'MobileTech', name: 'Mobile Technology Inc.' },
        { id: 'PCParts', name: 'PC Parts Supply Co.' },
        { id: 'AudioTech', name: 'Audio Technology Ltd.' },
        { id: 'OfficeSup', name: 'Office Supplies Corp.' }
    ];

    // State for filters
    const [filters, setFilters] = useState({
        search: '',
        category: '',
        supplier: '',
        stockStatus: '',
        priceRange: { min: '', max: '' }
    });

    // State for sorting
    const [sorting, setSorting] = useState({
        field: 'name',
        direction: 'asc'
    });

    // States for dialogs
    const [detailsDialog, setDetailsDialog] = useState<{
        isOpen: boolean;
        product: Product | null;
    }>({
        isOpen: false,
        product: null
    });

    const [formDialog, setFormDialog] = useState<{
        isOpen: boolean;
        mode: 'add' | 'edit';
        product: Partial<Product>;
    }>({
        isOpen: false,
        mode: 'add',
        product: {}
    });

    const [batchActionDialog, setBatchActionDialog] = useState({
        isOpen: false,
        action: '',
        selectedProducts: [] as number[]
    });

    // State for selected products (for batch actions)
    const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
    const [selectAll, setSelectAll] = useState(false);

    // Calculate categories and their counts
    const categories = useMemo(() => {
        const categoryMap = new Map<string, number>();
        products.forEach(product => {
            const count = categoryMap.get(product.category) || 0;
            categoryMap.set(product.category, count + 1);
        });

        return Array.from(categoryMap.entries()).map(([name, count]) => ({
            id: name,
            name,
            count
        }));
    }, [products]);

    // Calculate stock metrics
    const stockMetrics = useMemo(() => {
        const total = products.length;
        const lowStock = products.filter(p => p.stock <= p.threshold).length;
        const outOfStock = products.filter(p => p.stock === 0).length;
        const healthy = total - lowStock - outOfStock;

        return {
            total,
            lowStock,
            outOfStock,
            healthy,
            healthyPercent: Math.round((healthy / total) * 100),
            lowStockPercent: Math.round((lowStock / total) * 100),
            outOfStockPercent: Math.round((outOfStock / total) * 100)
        };
    }, [products]);

    // Apply filters and sorting to products
    const filteredProducts = useMemo(() => {
        return products
            .filter(product => {
                // Text search
                if (filters.search && !product.name.toLowerCase().includes(filters.search.toLowerCase()) &&
                    !product.description.toLowerCase().includes(filters.search.toLowerCase()) &&
                    !product.sku.toLowerCase().includes(filters.search.toLowerCase())) {
                    return false;
                }

                // Category filter
                if (filters.category && product.category !== filters.category) {
                    return false;
                }

                // Supplier filter
                if (filters.supplier && product.supplier !== filters.supplier) {
                    return false;
                }

                // Stock status filter
                if (filters.stockStatus) {
                    if (filters.stockStatus === 'low' && product.stock > product.threshold) {
                        return false;
                    } else if (filters.stockStatus === 'out' && product.stock !== 0) {
                        return false;
                    } else if (filters.stockStatus === 'ok' && (product.stock <= product.threshold || product.stock === 0)) {
                        return false;
                    }
                }

                // Price range filter
                const minPrice = filters.priceRange.min ? parseFloat(filters.priceRange.min) : 0;
                const maxPrice = filters.priceRange.max ? parseFloat(filters.priceRange.max) : Infinity;
                if (product.price < minPrice || product.price > maxPrice) {
                    return false;
                }

                return true;
            })
            .sort((a, b) => {
                const field = sorting.field as keyof Product;
                const direction = sorting.direction === 'asc' ? 1 : -1;

                if (typeof a[field] === 'string') {
                    return direction * (a[field] as string).localeCompare(b[field] as string);
                }

                return direction * ((a[field] as number) - (b[field] as number));
            });
    }, [products, filters, sorting]);

    // Handle checkbox selection
    useEffect(() => {
        if (selectAll) {
            setSelectedProducts(filteredProducts.map(p => p.id));
        } else if (selectedProducts.length === filteredProducts.length) {
            setSelectedProducts([]);
        }
    }, [selectAll]);

    // Update selectAll when all items are manually selected/deselected
    useEffect(() => {
        if (selectedProducts.length === filteredProducts.length && filteredProducts.length > 0) {
            setSelectAll(true);
        } else if (selectAll && selectedProducts.length !== filteredProducts.length) {
            setSelectAll(false);
        }
    }, [selectedProducts, filteredProducts]);

    // Handle filter changes
    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === 'min' || name === 'max') {
            setFilters({
                ...filters,
                priceRange: {
                    ...filters.priceRange,
                    [name]: value
                }
            });
        } else {
            setFilters({
                ...filters,
                [name]: value
            });
        }
    };

    // Handle sorting changes
    const handleSortChange = (field: string) => {
        setSorting(prevSort => ({
            field,
            direction: prevSort.field === field && prevSort.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    // Open product form dialog for adding/editing
    const openProductForm = (mode: 'add' | 'edit', product?: Product) => {
        setFormDialog({
            isOpen: true,
            mode,
            product: mode === 'edit' && product ? { ...product } : {
                name: '',
                category: '',
                price: 0,
                stock: 0,
                sku: '',
                supplier: '',
                description: '',
                threshold: 10,
                status: 'active' as const
            }
        });
    };

    // Handle form input changes
    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        setFormDialog(prev => ({
            ...prev,
            product: {
                ...prev.product,
                [name]: type === 'number' ? parseFloat(value) : value
            }
        }));
    };

    // Save product (add new or update existing)
    const saveProduct = () => {
        const now = new Date().toISOString().split('T')[0];

        if (formDialog.mode === 'add') {
            const maxId = products.reduce((max, p) => Math.max(max, p.id), 0);
            const newProduct = {
                ...(formDialog.product as Omit<Product, 'id' | 'lastUpdated'>),
                id: maxId + 1,
                lastUpdated: now
            };

            setProducts([...products, newProduct as Product]);
        } else {
            setProducts(products.map(p =>
                p.id === formDialog.product.id
                    ? { ...formDialog.product as Product, lastUpdated: now }
                    : p
            ));
        }

        setFormDialog({ isOpen: false, mode: 'add', product: {} });
    };

    // Delete products (single or batch)
    const deleteProducts = (ids: number[]) => {
        setProducts(products.filter(p => !ids.includes(p.id)));
        setSelectedProducts(selectedProducts.filter(id => !ids.includes(id)));
    };

    // Handle batch actions
    const executeBatchAction = () => {
        const { action, selectedProducts: productIds } = batchActionDialog;

        switch (action) {
            case 'delete':
                deleteProducts(productIds);
                break;
            case 'category':
                // Would update category for all selected products
                break;
            case 'status':
                // Would update status for all selected products
                break;
        }

        setBatchActionDialog({ isOpen: false, action: '', selectedProducts: [] });
    };

    // Toggle selection of a single product
    const toggleProductSelection = (id: number) => {
        if (selectedProducts.includes(id)) {
            setSelectedProducts(selectedProducts.filter(productId => productId !== id));
        } else {
            setSelectedProducts([...selectedProducts, id]);
        }
    };

    // Format currency
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(amount);
    };

    // Get stock status class
    const getStockStatusClass = (stock: number, threshold: number) => {
        if (stock === 0) return 'bg-red-100 text-red-800';
        if (stock <= threshold) return 'bg-yellow-100 text-yellow-800';
        return 'bg-green-100 text-green-800';
    };

    // Get stock status text
    const getStockStatusText = (stock: number, threshold: number) => {
        if (stock === 0) return 'Stokta Yok';
        if (stock <= threshold) return 'Düşük Stok';
        return 'Yeterli';
    };

    // Reset all filters
    const resetFilters = () => {
        setFilters({
            search: '',
            category: '',
            supplier: '',
            stockStatus: '',
            priceRange: { min: '', max: '' }
        });
    };

    return (
        <div className="flex flex-col h-full">
            <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                <h1 className="text-2xl font-bold text-gray-800">Ürün Yönetimi</h1>
                <p className="text-gray-600">Ürünleri yönetin, filtreleyin ve analiz edin</p>
            </div>

            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-500">Toplam Ürün</p>
                            <p className="text-xl font-bold">{stockMetrics.total}</p>
                        </div>
                        <div className="bg-blue-100 p-3 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-500">Yeterli Stok</p>
                            <p className="text-xl font-bold">{stockMetrics.healthy} <span className="text-sm text-gray-500">({stockMetrics.healthyPercent}%)</span></p>
                        </div>
                        <div className="bg-green-100 p-3 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-yellow-500">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-500">Düşük Stok</p>
                            <p className="text-xl font-bold">{stockMetrics.lowStock} <span className="text-sm text-gray-500">({stockMetrics.lowStockPercent}%)</span></p>
                        </div>
                        <div className="bg-yellow-100 p-3 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-500">Stokta Yok</p>
                            <p className="text-xl font-bold">{stockMetrics.outOfStock} <span className="text-sm text-gray-500">({stockMetrics.outOfStockPercent}%)</span></p>
                        </div>
                        <div className="bg-red-100 p-3 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
                {/* Left sidebar with filters and categories */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                        <h3 className="font-semibold text-lg mb-3">Filtreler</h3>

                        {/* Search filter */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-medium mb-1">Ara</label>
                            <input
                                type="text"
                                name="search"
                                value={filters.search}
                                onChange={handleFilterChange}
                                placeholder="Ürün adı, SKU, açıklama..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Category filter */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-medium mb-1">Kategori</label>
                            <select
                                name="category"
                                value={filters.category}
                                onChange={handleFilterChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Tümü</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.name}>
                                        {category.name} ({category.count})
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Supplier filter */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-medium mb-1">Tedarikçi</label>
                            <select
                                name="supplier"
                                value={filters.supplier}
                                onChange={handleFilterChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Tümü</option>
                                {suppliers.map(supplier => (
                                    <option key={supplier.id} value={supplier.id}>
                                        {supplier.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Stock status filter */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-medium mb-1">Stok Durumu</label>
                            <select
                                name="stockStatus"
                                value={filters.stockStatus}
                                onChange={handleFilterChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Tümü</option>
                                <option value="ok">Yeterli Stok</option>
                                <option value="low">Düşük Stok</option>
                                <option value="out">Stokta Yok</option>
                            </select>
                        </div>

                        {/* Price range filter */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-medium mb-1">Fiyat Aralığı (₺)</label>
                            <div className="flex space-x-2">
                                <input
                                    type="number"
                                    name="min"
                                    value={filters.priceRange.min}
                                    onChange={handleFilterChange}
                                    placeholder="Min"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    type="number"
                                    name="max"
                                    value={filters.priceRange.max}
                                    onChange={handleFilterChange}
                                    placeholder="Max"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <button
                                onClick={resetFilters}
                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                            >
                                Sıfırla
                            </button>

                            <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-md">
                                {filteredProducts.length} ürün
                            </span>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-4">
                        <h3 className="font-semibold text-lg mb-3">Kategoriler</h3>
                        <div className="space-y-2">
                            {categories.map(category => (
                                <div
                                    key={category.id}
                                    className="flex justify-between items-center p-2 hover:bg-gray-50 rounded cursor-pointer"
                                    onClick={() => setFilters({ ...filters, category: category.name })}
                                >
                                    <span>{category.name}</span>
                                    <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">{category.count}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main content area with product table */}
                <div className="lg:col-span-3">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        {/* Table actions */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                            <div className="w-full md:w-auto">
                                <button
                                    onClick={() => openProductForm('add')}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                    </svg>
                                    Yeni Ürün Ekle
                                </button>
                            </div>

                            {/* Batch actions (visible when items are selected) */}
                            {selectedProducts.length > 0 && (
                                <div className="flex items-center bg-blue-50 px-3 py-2 rounded-lg">
                                    <span className="text-sm mr-2">
                                        <b>{selectedProducts.length}</b> ürün seçildi
                                    </span>
                                    <button
                                        onClick={() => setBatchActionDialog({
                                            isOpen: true,
                                            action: 'delete',
                                            selectedProducts
                                        })}
                                        className="text-red-600 hover:text-red-800 ml-2"
                                    >
                                        Sil
                                    </button>
                                    <button className="text-blue-600 hover:text-blue-800 ml-2">
                                        Kategori Değiştir
                                    </button>
                                    <button className="text-green-600 hover:text-green-800 ml-2">
                                        Dışa Aktar
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Products table */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                                                    checked={selectAll}
                                                    onChange={() => setSelectAll(!selectAll)}
                                                />
                                            </div>
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                            onClick={() => handleSortChange('name')}
                                        >
                                            <div className="flex items-center">
                                                Ürün Adı
                                                {sorting.field === 'name' && (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                                        {sorting.direction === 'asc' ? (
                                                            <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L10 4.414 6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                                        ) : (
                                                            <path fillRule="evenodd" d="M5.293 12.293a1 1 0 011.414 0L10 15.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                        )}
                                                    </svg>
                                                )}
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Kategori
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                            onClick={() => handleSortChange('price')}
                                        >
                                            <div className="flex items-center">
                                                Fiyat
                                                {sorting.field === 'price' && (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                                        {sorting.direction === 'asc' ? (
                                                            <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L10 4.414 6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                                        ) : (
                                                            <path fillRule="evenodd" d="M5.293 12.293a1 1 0 011.414 0L10 15.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                        )}
                                                    </svg>
                                                )}
                                            </div>
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                            onClick={() => handleSortChange('stock')}
                                        >
                                            <div className="flex items-center">
                                                Stok
                                                {sorting.field === 'stock' && (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                                        {sorting.direction === 'asc' ? (
                                                            <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L10 4.414 6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                                        ) : (
                                                            <path fillRule="evenodd" d="M5.293 12.293a1 1 0 011.414 0L10 15.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                        )}
                                                    </svg>
                                                )}
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            SKU
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Durum
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            İşlemler
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredProducts.map(product => (
                                        <tr key={product.id} className={selectedProducts.includes(product.id) ? 'bg-blue-50' : 'hover:bg-gray-50'}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <input
                                                    type="checkbox"
                                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                                                    checked={selectedProducts.includes(product.id)}
                                                    onChange={() => toggleProductSelection(product.id)}
                                                />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900" onClick={() => setDetailsDialog({ isOpen: true, product })}>
                                                <div className="flex items-center">
                                                    <div className="h-10 w-10 flex-shrink-0 bg-gray-100 rounded-md mr-3 flex items-center justify-center text-gray-500">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900 cursor-pointer hover:text-blue-600">
                                                            {product.name}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {product.supplier}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                                    {product.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {formatCurrency(product.price)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStockStatusClass(product.stock, product.threshold)}`}>
                                                        {product.stock}
                                                    </span>
                                                    {product.stock <= product.threshold && product.stock > 0 && (
                                                        <span className="ml-2 text-yellow-500">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                            </svg>
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {product.sku}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${product.status === 'active' ? 'bg-green-100 text-green-800' :
                                                    product.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                                                        'bg-red-100 text-red-800'
                                                    }`}>
                                                    {product.status === 'active' ? 'Aktif' :
                                                        product.status === 'inactive' ? 'Pasif' :
                                                            'Üretimi Durduruldu'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button
                                                    onClick={() => openProductForm('edit', product)}
                                                    className="text-blue-600 hover:text-blue-900 mr-3"
                                                >
                                                    Düzenle
                                                </button>
                                                <button
                                                    onClick={() => deleteProducts([product.id])}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    Sil
                                                </button>
                                            </td>
                                        </tr>
                                    ))}

                                    {filteredProducts.length === 0 && (
                                        <tr>
                                            <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                                                Eşleşen ürün bulunamadı
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Details Dialog */}
            <Dialog
                isOpen={detailsDialog.isOpen}
                onClose={() => setDetailsDialog({ isOpen: false, product: null })}
                title="Ürün Detayları"
                size="lg"
                actions={
                    <div className="flex space-x-2">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => {
                                if (detailsDialog.product) {
                                    setDetailsDialog({ isOpen: false, product: null });
                                    openProductForm('edit', detailsDialog.product);
                                }
                            }}
                        >
                            Düzenle
                        </button>
                        <button
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                            onClick={() => setDetailsDialog({ isOpen: false, product: null })}
                        >
                            Kapat
                        </button>
                    </div>
                }
            >
                {detailsDialog.product && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Ürün ID</h3>
                                <p>{detailsDialog.product.id}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Ürün Adı</h3>
                                <p className="text-lg font-semibold">{detailsDialog.product.name}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Kategori</h3>
                                <p>{detailsDialog.product.category}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">SKU</h3>
                                <p>{detailsDialog.product.sku}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Açıklama</h3>
                                <p>{detailsDialog.product.description}</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Fiyat</h3>
                                <p className="text-lg font-semibold">{formatCurrency(detailsDialog.product.price)}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Stok Durumu</h3>
                                <div className="flex items-center">
                                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStockStatusClass(detailsDialog.product.stock, detailsDialog.product.threshold)}`}>
                                        {getStockStatusText(detailsDialog.product.stock, detailsDialog.product.threshold)}
                                    </span>
                                    <span className="ml-2">{detailsDialog.product.stock} adet</span>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Stok Uyarı Eşiği</h3>
                                <p>{detailsDialog.product.threshold} adet</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Tedarikçi</h3>
                                <p>{detailsDialog.product.supplier}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Son Güncelleme</h3>
                                <p>{detailsDialog.product.lastUpdated}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Durum</h3>
                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${detailsDialog.product.status === 'active' ? 'bg-green-100 text-green-800' :
                                    detailsDialog.product.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                                        'bg-red-100 text-red-800'
                                    }`}>
                                    {detailsDialog.product.status === 'active' ? 'Aktif' :
                                        detailsDialog.product.status === 'inactive' ? 'Pasif' :
                                            'Üretimi Durduruldu'}
                                </span>
                            </div>
                        </div>

                        <div className="col-span-1 md:col-span-2 pt-4 border-t">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-sm font-medium text-gray-700">Stok Seviyesi</h3>
                                <span className="text-xs text-gray-500">Eşik: {detailsDialog.product.threshold}</span>
                            </div>
                            <div className="w-full h-3 bg-gray-200 rounded-full">
                                <div
                                    className={`h-3 rounded-full ${detailsDialog.product.stock === 0 ? 'bg-red-500' :
                                        detailsDialog.product.stock <= detailsDialog.product.threshold ? 'bg-yellow-500' :
                                            'bg-green-500'
                                        }`}
                                    style={{ width: `${Math.min((detailsDialog.product.stock / (detailsDialog.product.threshold * 2)) * 100, 100)}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                )}
            </Dialog>

            {/* Product Form Dialog */}
            <Dialog
                isOpen={formDialog.isOpen}
                onClose={() => setFormDialog({ isOpen: false, mode: 'add', product: {} })}
                title={formDialog.mode === 'add' ? 'Yeni Ürün Ekle' : 'Ürünü Düzenle'}
                size="lg"
                actions={
                    <div className="flex space-x-2">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={saveProduct}
                        >
                            {formDialog.mode === 'add' ? 'Ekle' : 'Kaydet'}
                        </button>
                        <button
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                            onClick={() => setFormDialog({ isOpen: false, mode: 'add', product: {} })}
                        >
                            İptal
                        </button>
                    </div>
                }
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Ürün Adı *</label>
                        <input
                            type="text"
                            name="name"
                            value={formDialog.product.name || ''}
                            onChange={handleFormChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Kategori *</label>
                        <input
                            type="text"
                            name="category"
                            value={formDialog.product.category || ''}
                            onChange={handleFormChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">SKU *</label>
                        <input
                            type="text"
                            name="sku"
                            value={formDialog.product.sku || ''}
                            onChange={handleFormChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Fiyat (₺) *</label>
                        <input
                            type="number"
                            name="price"
                            value={formDialog.product.price || ''}
                            onChange={handleFormChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            min="0"
                            step="0.01"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Stok Miktarı *</label>
                        <input
                            type="number"
                            name="stock"
                            value={formDialog.product.stock || ''}
                            onChange={handleFormChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            min="0"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tedarikçi *</label>
                        <select
                            name="supplier"
                            value={formDialog.product.supplier || ''}
                            onChange={handleFormChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                        >
                            <option value="">Seçiniz</option>
                            {suppliers.map(supplier => (
                                <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Stok Uyarı Eşiği</label>
                        <input
                            type="number"
                            name="threshold"
                            value={formDialog.product.threshold || ''}
                            onChange={handleFormChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            min="0"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Durum</label>
                        <select
                            name="status"
                            value={formDialog.product.status || 'active'}
                            onChange={handleFormChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                            <option value="active">Aktif</option>
                            <option value="inactive">Pasif</option>
                            <option value="discontinued">Üretimi Durduruldu</option>
                        </select>
                    </div>

                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Açıklama</label>
                        <textarea
                            name="description"
                            value={formDialog.product.description || ''}
                            onChange={handleFormChange}
                            rows={3}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        ></textarea>
                    </div>
                </div>
            </Dialog>

            {/* Batch Action Dialog */}
            <Dialog
                isOpen={batchActionDialog.isOpen}
                onClose={() => setBatchActionDialog({ isOpen: false, action: '', selectedProducts: [] })}
                title={
                    batchActionDialog.action === 'delete' ? 'Ürünleri Sil' :
                        batchActionDialog.action === 'category' ? 'Kategori Değiştir' :
                            'Toplu İşlem'
                }
                size="md"
                actions={
                    <div className="flex space-x-2">
                        <button
                            className={`${batchActionDialog.action === 'delete' ? 'bg-red-500 hover:bg-red-700' : 'bg-blue-500 hover:bg-blue-700'} text-white font-bold py-2 px-4 rounded`}
                            onClick={executeBatchAction}
                        >
                            {batchActionDialog.action === 'delete' ? 'Sil' : 'Uygula'}
                        </button>
                        <button
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                            onClick={() => setBatchActionDialog({ isOpen: false, action: '', selectedProducts: [] })}
                        >
                            İptal
                        </button>
                    </div>
                }
            >
                {batchActionDialog.action === 'delete' && (
                    <div>
                        <p className="text-gray-700">
                            <b>{batchActionDialog.selectedProducts.length}</b> ürünü silmek istediğinize emin misiniz? Bu işlem geri alınamaz.
                        </p>
                    </div>
                )}
            </Dialog>
        </div>
    );
};

export default ProductManagement;
