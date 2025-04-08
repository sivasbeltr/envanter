import React, { useState, useEffect, useMemo } from 'react';
import { PencilIcon, TrashIcon, PlusIcon, MagnifyingGlassIcon, ListBulletIcon, ViewColumnsIcon } from '@heroicons/react/24/outline';
import { FolderIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { LoadingDialog } from '../components/dialogs/LoadingDialog';
import { ProgressDialog } from '../components/dialogs/ProgressDialog';
import { ConfirmDialog } from '../components/dialogs/ConfirmDialog';
import Tree from '../components/data/Tree';
import { TreeNodeItemData } from '../components/data/TreeNode';

// Category model
interface Category {
    id: number;
    name: string;
    description: string;
    parentCategoryId: number | null;
    isActive: boolean;
    createdAt: string;
}

// Filter interface
interface CategoryFilters {
    searchTerm: string;
    showInactive: boolean;
    parentCategoryId: number | null;
}

// Mock data
const mockCategories: Category[] = [
    {
        id: 1,
        name: 'Elektronik Cihazlar',
        description: 'Bilgisayarlar, tabletler ve diğer elektronik cihazlar',
        parentCategoryId: null,
        isActive: true,
        createdAt: '2023-01-15'
    },
    {
        id: 2,
        name: 'Mobilya',
        description: 'Masalar, sandalyeler ve dolaplar',
        parentCategoryId: null,
        isActive: true,
        createdAt: '2023-02-10'
    },
    {
        id: 3,
        name: 'Bilgisayarlar',
        description: 'Masaüstü ve dizüstü bilgisayarlar',
        parentCategoryId: 1,
        isActive: true,
        createdAt: '2023-01-20'
    },
    {
        id: 4,
        name: 'Tabletler',
        description: 'Tablet bilgisayarlar',
        parentCategoryId: 1,
        isActive: false,
        createdAt: '2023-03-05'
    },
    {
        id: 5,
        name: 'Ofis Mobilyaları',
        description: 'Ofis için masalar ve sandalyeler',
        parentCategoryId: 2,
        isActive: true,
        createdAt: '2023-04-12'
    }
];

const Categories: React.FC = () => {
    // State management
    const [categories, setCategories] = useState<Category[]>(mockCategories);
    const [filteredCategories, setFilteredCategories] = useState<Category[]>(mockCategories);
    const [filters, setFilters] = useState<CategoryFilters>({
        searchTerm: '',
        showInactive: false,
        parentCategoryId: null
    });

    // View mode state
    const [viewMode, setViewMode] = useState<'table' | 'tree'>('table');

    // Loading and dialog states
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [loadingMessage, setLoadingMessage] = useState<string>('');
    const [showLoadingDialog, setShowLoadingDialog] = useState<boolean>(false);

    // Progress dialog states
    const [showProgressDialog, setShowProgressDialog] = useState<boolean>(false);
    const [progressValue, setProgressValue] = useState<number>(0);
    const [progressMessage, setProgressMessage] = useState<string>('');

    // Confirm dialog states
    const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);
    const [confirmTitle, setConfirmTitle] = useState<string>('');
    const [confirmMessage, setConfirmMessage] = useState<string>('');
    const [confirmCallback, setConfirmCallback] = useState<() => void>(() => { });

    // Form states
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [formData, setFormData] = useState<Omit<Category, 'id' | 'createdAt'>>({
        name: '',
        description: '',
        parentCategoryId: null,
        isActive: true
    });

    // Apply filters whenever filters or categories change
    useEffect(() => {
        filterCategories();
    }, [filters, categories]);

    // Initialize form data when selectedCategory changes
    useEffect(() => {
        if (selectedCategory) {
            setFormData({
                name: selectedCategory.name,
                description: selectedCategory.description,
                parentCategoryId: selectedCategory.parentCategoryId,
                isActive: selectedCategory.isActive
            });
        } else {
            setFormData({
                name: '',
                description: '',
                parentCategoryId: null,
                isActive: true
            });
        }
    }, [selectedCategory]);

    // Filter categories based on current filters
    const filterCategories = () => {
        let filtered = [...categories];

        // Filter by search term
        if (filters.searchTerm) {
            const searchLower = filters.searchTerm.toLowerCase();
            filtered = filtered.filter(cat =>
                cat.name.toLowerCase().includes(searchLower) ||
                cat.description.toLowerCase().includes(searchLower)
            );
        }

        // Filter by active status
        if (!filters.showInactive) {
            filtered = filtered.filter(cat => cat.isActive);
        }

        // Filter by parent category
        if (filters.parentCategoryId !== null) {
            filtered = filtered.filter(cat => cat.parentCategoryId === filters.parentCategoryId);
        }

        setFilteredCategories(filtered);
    };

    // Convert flat category list to tree structure
    const categoryTreeData = useMemo((): TreeNodeItemData[] => {
        // First filter the categories
        let filtered = [...filteredCategories];

        // Group categories by parent ID
        const categoryMap = new Map<number | null, Category[]>();

        filtered.forEach(cat => {
            if (!categoryMap.has(cat.parentCategoryId)) {
                categoryMap.set(cat.parentCategoryId, []);
            }
            categoryMap.get(cat.parentCategoryId)?.push(cat);
        });

        // Recursive function to build tree
        const buildTree = (parentId: number | null): TreeNodeItemData[] => {
            const children = categoryMap.get(parentId) || [];

            return children.map(cat => ({
                id: cat.id.toString(),
                label: cat.name,
                icon: cat.parentCategoryId === null ?
                    <FolderIcon className="h-5 w-5 text-yellow-500" /> :
                    <DocumentTextIcon className="h-5 w-5 text-gray-500" />,
                expanded: parentId === null, // Expand root nodes by default
                disabled: !cat.isActive,
                children: buildTree(cat.id),
                // Store the full category object for easy access
                data: cat
            }));
        };

        // Start with root categories (parentCategoryId === null)
        return buildTree(null);
    }, [filteredCategories]);

    // Handle form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData({
                ...formData,
                [name]: checked
            });
        } else {
            setFormData({
                ...formData,
                [name]: name === 'parentCategoryId' ? (value === '' ? null : Number(value)) : value
            });
        }
    };

    // Simulated progress for async operations
    const simulateProgress = (operation: string, callback: () => void) => {
        setProgressValue(0);
        setProgressMessage(`${operation} işlemi gerçekleştiriliyor...`);
        setShowProgressDialog(true);

        // Simulate progress intervals
        let progress = 0;
        const interval = setInterval(() => {
            progress += 20;
            setProgressValue(Math.min(progress, 100));

            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    setShowProgressDialog(false);
                    callback();
                }, 500);
            }
        }, 400);
    };

    // CRUD operations
    const handleAddCategory = () => {
        // Use progress dialog for add operation
        simulateProgress('Kategori ekleme', () => {
            const newCategory: Category = {
                ...formData,
                id: Math.max(...categories.map(c => c.id), 0) + 1,
                createdAt: new Date().toISOString().split('T')[0]
            };

            setCategories([...categories, newCategory]);
            setIsModalOpen(false);
        });
    };

    const handleEditCategory = () => {
        if (!selectedCategory) return;

        // Use progress dialog for update operation
        simulateProgress('Kategori güncelleme', () => {
            const updatedCategories = categories.map(cat =>
                cat.id === selectedCategory.id ? { ...selectedCategory, ...formData } : cat
            );

            setCategories(updatedCategories);
            setIsModalOpen(false);
            setSelectedCategory(null);
        });
    };

    const handleDeleteCategory = (id: number) => {
        // Setup confirm dialog data
        setConfirmTitle('Kategori Silme İşlemi');
        setConfirmMessage('Bu kategoriyi silmek istediğinize emin misiniz? Bu işlem geri alınamaz.');
        setConfirmCallback(() => () => {
            // Show loading dialog during deletion
            setLoadingMessage('Kategori siliniyor...');
            setShowLoadingDialog(true);

            setTimeout(() => {
                setCategories(categories.filter(cat => cat.id !== id));
                setShowLoadingDialog(false);
            }, 1000);
        });
        setShowConfirmDialog(true);
    };

    // UI event handlers
    const handleOpenAddModal = () => {
        setSelectedCategory(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (category: Category) => {
        // Show loading briefly when opening edit modal
        setLoadingMessage('Kategori bilgileri yükleniyor...');
        setShowLoadingDialog(true);

        // Simulate API fetch delay
        setTimeout(() => {
            setSelectedCategory(category);
            setIsModalOpen(true);
            setShowLoadingDialog(false);
        }, 500);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedCategory) {
            handleEditCategory();
        } else {
            handleAddCategory();
        }
    };

    // Tree node event handlers
    const handleTreeNodeSelect = (node: TreeNodeItemData) => {
        // Cast the stored data back to Category type
        const category = node.data as Category;
        handleOpenEditModal(category);
    };

    const handleNodeContextMenu = (e: React.MouseEvent, node: TreeNodeItemData) => {
        e.preventDefault();
        // For now, we'll just open edit modal on right-click
        // In a real app, this could be a context menu
        handleTreeNodeSelect(node);
    };

    // Helper for rendering parent category name
    const getParentCategoryName = (parentId: number | null): string => {
        if (parentId === null) return '-';
        const parent = categories.find(cat => cat.id === parentId);
        return parent ? parent.name : '-';
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Kategoriler</h1>
                    <p className="text-gray-600 dark:text-gray-300">
                        Bu sayfada demirbaş kategorilerini görüntüleyebilir, ekleyebilir, düzenleyebilir ve silebilirsiniz.
                    </p>
                </div>
                <div className="flex gap-2 mt-4 sm:mt-0">
                    {/* View toggle buttons */}
                    <div className="mr-2 bg-gray-100 dark:bg-gray-700 rounded-md flex">
                        <button
                            onClick={() => setViewMode('table')}
                            className={`p-2 rounded-l-md ${viewMode === 'table' ? 'bg-blue-500 text-white' : 'text-gray-700 dark:text-gray-300'}`}
                            aria-label="Tablo Görünümü"
                            title="Tablo Görünümü"
                        >
                            <ListBulletIcon className="h-5 w-5" />
                        </button>
                        <button
                            onClick={() => setViewMode('tree')}
                            className={`p-2 rounded-r-md ${viewMode === 'tree' ? 'bg-blue-500 text-white' : 'text-gray-700 dark:text-gray-300'}`}
                            aria-label="Ağaç Görünümü"
                            title="Ağaç Görünümü"
                        >
                            <ViewColumnsIcon className="h-5 w-5" />
                        </button>
                    </div>
                    <button
                        onClick={handleOpenAddModal}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        disabled={isLoading}
                    >
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Yeni Kategori Ekle
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Kategori adı veya açıklama ara..."
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            value={filters.searchTerm}
                            onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
                        />
                    </div>

                    {viewMode === 'table' && (
                        <div>
                            <select
                                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                                value={filters.parentCategoryId === null ? '' : filters.parentCategoryId}
                                onChange={(e) => setFilters({ ...filters, parentCategoryId: e.target.value === '' ? null : Number(e.target.value) })}
                            >
                                <option value="">Tüm Kategoriler</option>
                                <option value={0}>Ana Kategoriler</option>
                                {categories.filter(cat => cat.parentCategoryId === null).map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name} Alt Kategorileri</option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div className="flex items-center">
                        <input
                            id="show-inactive"
                            name="showInactive"
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            checked={filters.showInactive}
                            onChange={(e) => setFilters({ ...filters, showInactive: e.target.checked })}
                        />
                        <label htmlFor="show-inactive" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                            Pasif Kategorileri Göster
                        </label>
                    </div>
                </div>
            </div>

            {/* Categories Table/Tree View */}
            {viewMode === 'table' ? (
                /* Table View */
                <div className="overflow-x-auto">
                    <div className="align-middle inline-block min-w-full">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Kategori Adı
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Açıklama
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Üst Kategori
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Durum
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Eklenme Tarihi
                                        </th>
                                        <th scope="col" className="relative px-6 py-3">
                                            <span className="sr-only">İşlemler</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-600">
                                    {isLoading && !showLoadingDialog ? (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-4 text-center">
                                                <div className="flex justify-center">
                                                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : filteredCategories.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                                                Arama kriterlerinize uygun kategori bulunamadı.
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredCategories.map(category => (
                                            <tr key={category.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">{category.name}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-500 dark:text-gray-300">{category.description}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500 dark:text-gray-300">
                                                        {getParentCategoryName(category.parentCategoryId)}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                        ${category.isActive
                                                            ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                                                            : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'}`}>
                                                        {category.isActive ? 'Aktif' : 'Pasif'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                                    {new Date(category.createdAt).toLocaleDateString('tr-TR')}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button
                                                        onClick={() => handleOpenEditModal(category)}
                                                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-4"
                                                        aria-label="Düzenle"
                                                    >
                                                        <PencilIcon className="h-5 w-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteCategory(category.id)}
                                                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                                        aria-label="Sil"
                                                    >
                                                        <TrashIcon className="h-5 w-5" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            ) : (
                /* Tree View */
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                    <div className="p-4">
                        {categoryTreeData.length === 0 ? (
                            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                                Arama kriterlerinize uygun kategori bulunamadı.
                            </div>
                        ) : (
                            <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                                Düzenlemek için bir kategoriye tıklayın.
                            </div>
                        )}

                        <div className="max-h-[60vh] overflow-y-auto pr-2">
                            <Tree
                                data={categoryTreeData}
                                showLines={true}
                                lineColor="#E5E7EB"
                                onNodeSelect={(node) => handleTreeNodeSelect(node)}
                                searchable
                                searchTerm={filters.searchTerm}
                                highlightSearch
                            />
                        </div>
                    </div>

                    {/* Tree context menu - placeholder for future enhancement */}
                    {/* For now, we're just using click events */}
                </div>
            )}

            {/* Modal for add/edit */}
            {isModalOpen && (
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <form onSubmit={handleFormSubmit}>
                                <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">
                                        {selectedCategory ? 'Kategori Düzenle' : 'Yeni Kategori Ekle'}
                                    </h3>

                                    <div className="mb-4">
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Kategori Adı
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            placeholder="Kategori adını girin"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Açıklama
                                        </label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            rows={3}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            placeholder="Kategori açıklaması girin"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                        ></textarea>
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="parentCategoryId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Üst Kategori
                                        </label>
                                        <select
                                            id="parentCategoryId"
                                            name="parentCategoryId"
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            value={formData.parentCategoryId === null ? '' : formData.parentCategoryId}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Ana Kategori</option>
                                            {categories
                                                .filter(cat => cat.id !== selectedCategory?.id && cat.parentCategoryId === null)
                                                .map(cat => (
                                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>

                                    <div className="mb-4">
                                        <div className="flex items-center">
                                            <input
                                                id="isActive"
                                                name="isActive"
                                                type="checkbox"
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                checked={formData.isActive}
                                                onChange={handleInputChange}
                                            />
                                            <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                                                Aktif Kategori
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="submit"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'İşleniyor...' : (selectedCategory ? 'Güncelle' : 'Kaydet')}
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                                        onClick={() => setIsModalOpen(false)}
                                        disabled={isLoading}
                                    >
                                        İptal
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Loading Dialog */}
            <LoadingDialog
                isOpen={showLoadingDialog}
                message={loadingMessage}
            />

            {/* Progress Dialog */}
            <ProgressDialog
                isOpen={showProgressDialog}
                title="İşlem Sürüyor"
                message={progressMessage}
                progress={progressValue}
            />

            {/* Confirm Dialog */}
            <ConfirmDialog
                isOpen={showConfirmDialog}
                onClose={() => setShowConfirmDialog(false)}
                title={confirmTitle}
                message={confirmMessage}
                onConfirm={() => {
                    setShowConfirmDialog(false);
                    confirmCallback();
                }}
                confirmVariant="danger"
            />
        </div>
    );
};

export default Categories;
