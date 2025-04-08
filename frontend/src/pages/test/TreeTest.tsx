import React, { useState } from 'react';
import { Panel } from '../../components/common/Panel';
import Tree from '../../components/data/Tree';
import TreeNode from '../../components/data/TreeNode';
import { TextField } from '../../components/forms/TextField';
import { Select } from '../../components/forms/Select';
import {
    FolderIcon, DocumentIcon, UsersIcon, GlobeAltIcon,
    HomeIcon, CogIcon, LockClosedIcon, ServerIcon
} from '@heroicons/react/24/outline';
import { Checkbox } from '../../components/forms/Checkbox';

/**
 * Test component for Tree examples
 */
const TreeTest: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showLines, setShowLines] = useState(true);
    const [multiSelect, setMultiSelect] = useState(true);
    const [lineColor, setLineColor] = useState('#E5E7EB');

    // Sample tree data for data-driven approach
    const treeData = [
        {
            id: 'root1',
            label: 'Varlıklar',
            icon: <FolderIcon className="h-5 w-5 text-yellow-500" />,
            expanded: true,
            children: [
                {
                    id: 'it',
                    label: 'Bilgi Teknolojileri',
                    icon: <FolderIcon className="h-5 w-5 text-blue-500" />,
                    children: [
                        {
                            id: 'computers',
                            label: 'Bilgisayarlar',
                            icon: <ServerIcon className="h-5 w-5 text-indigo-500" />,
                            children: [
                                { id: 'laptop1', label: 'Laptop HP X1', icon: <DocumentIcon className="h-5 w-5 text-gray-500" /> },
                                { id: 'laptop2', label: 'Laptop Dell XPS', icon: <DocumentIcon className="h-5 w-5 text-gray-500" /> },
                                { id: 'desktop1', label: 'Masaüstü Lenovo T3', icon: <DocumentIcon className="h-5 w-5 text-gray-500" /> }
                            ]
                        },
                        {
                            id: 'network',
                            label: 'Ağ Cihazları',
                            icon: <GlobeAltIcon className="h-5 w-5 text-green-500" />,
                            children: [
                                { id: 'router1', label: 'Router A', icon: <DocumentIcon className="h-5 w-5 text-gray-500" /> },
                                { id: 'switch1', label: 'Switch B', icon: <DocumentIcon className="h-5 w-5 text-gray-500" /> }
                            ]
                        }
                    ]
                },
                {
                    id: 'hr',
                    label: 'İnsan Kaynakları',
                    icon: <UsersIcon className="h-5 w-5 text-purple-500" />,
                    children: [
                        { id: 'furniture1', label: 'Ofis Mobilyaları', icon: <DocumentIcon className="h-5 w-5 text-gray-500" /> },
                        { id: 'supplies1', label: 'Ofis Malzemeleri', icon: <DocumentIcon className="h-5 w-5 text-gray-500" /> }
                    ]
                }
            ]
        },
        {
            id: 'root2',
            label: 'Sistem Ayarları',
            icon: <CogIcon className="h-5 w-5 text-gray-500" />,
            children: [
                { id: 'settings1', label: 'Kullanıcı Yönetimi', icon: <UsersIcon className="h-5 w-5 text-blue-500" /> },
                { id: 'settings2', label: 'Güvenlik Ayarları', icon: <LockClosedIcon className="h-5 w-5 text-red-500" /> }
            ]
        }
    ];

    // Example handler for node check event
    const handleNodeCheck = (node: any, checked: boolean) => {
        console.log(`Node ${node.label} ${checked ? 'checked' : 'unchecked'}`);
    };

    // Example handler for node expand event
    const handleNodeExpand = (node: any, expanded: boolean) => {
        console.log(`Node ${node.label} ${expanded ? 'expanded' : 'collapsed'}`);
    };

    // Example handler for node select event
    const handleNodeSelect = (node: any, selected: boolean) => {
        console.log(`Node ${node.label} ${selected ? 'selected' : 'deselected'}`);
    };

    const colorOptions = [
        { value: '#E5E7EB', label: 'Varsayılan (Gri)' },
        { value: '#DBEAFE', label: 'Mavi' },
        { value: '#D1FAE5', label: 'Yeşil' },
        { value: '#FEE2E2', label: 'Kırmızı' },
        { value: '#E5E7EB', label: 'Gri' },
    ];

    return (
        <section>
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Tree Bileşenleri</h2>

            {/* Options Panel */}
            <Panel
                title="Tree Ayarları"
                variant="elevated"
                className="mb-6"
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center">
                        <label className="mr-2 text-gray-700 dark:text-gray-300">Çizgileri Göster:</label>
                        <Checkbox
                            label="Çizgileri Göster"
                            checked={showLines}
                            onChange={(e) => setShowLines(e.target.checked)}
                        />
                    </div>

                    <div className="flex items-center">
                        <label className="mr-2 text-gray-700 dark:text-gray-300">Çoklu Seçim:</label>
                        <Checkbox
                            label="Çoklu Seçim"
                            checked={multiSelect}
                            onChange={(e) => setMultiSelect(e.target.checked)}
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-gray-700 dark:text-gray-300">Çizgi Rengi:</label>
                        <Select
                            options={colorOptions}
                            value={lineColor}
                            onChange={(e) => setLineColor(e.target.value)}
                        />
                    </div>
                </div>
            </Panel>

            {/* Data Driven Tree */}
            <Panel
                title="Veri Yapısı ile Ağaç (Checkbox ile)"
                variant="elevated"
                className="mb-6"
            >
                <div className="mb-4">
                    <TextField
                        placeholder="Ağaçta ara..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>

                <Tree
                    data={treeData}
                    showCheckbox
                    checkboxPosition="left"
                    onNodeCheck={handleNodeCheck}
                    onNodeExpand={handleNodeExpand}
                    onNodeSelect={handleNodeSelect}
                    searchable
                    searchTerm={searchTerm}
                    highlightSearch
                    showLines={showLines}
                    lineColor={lineColor}
                    multiSelect={multiSelect}
                />
            </Panel>

            {/* Nested JSX Tree */}
            <Panel
                title="JSX ile Ağaç Yapısı"
                variant="elevated"
                className="mb-6"
            >
                <Tree
                    showCheckbox
                    showLines={showLines}
                    lineColor={lineColor}
                    multiSelect={multiSelect}
                >
                    <TreeNode
                        label="Ana Dizin"
                        icon={<HomeIcon className="h-5 w-5 text-blue-500" />}
                        expanded
                    >
                        <TreeNode
                            label="Belgeler"
                            icon={<FolderIcon className="h-5 w-5 text-yellow-500" />}
                            expanded
                        >
                            <TreeNode
                                label="Projeler"
                                icon={<FolderIcon className="h-5 w-5 text-yellow-500" />}
                            >
                                <TreeNode label="Proje A" icon={<DocumentIcon className="h-5 w-5 text-gray-500" />} />
                                <TreeNode label="Proje B" icon={<DocumentIcon className="h-5 w-5 text-gray-500" />} />
                            </TreeNode>
                            <TreeNode
                                label="Raporlar"
                                icon={<FolderIcon className="h-5 w-5 text-yellow-500" />}
                            >
                                <TreeNode label="2022 Raporu" icon={<DocumentIcon className="h-5 w-5 text-gray-500" />} />
                                <TreeNode label="2023 Raporu" icon={<DocumentIcon className="h-5 w-5 text-gray-500" />} />
                            </TreeNode>
                        </TreeNode>
                        <TreeNode
                            label="Ayarlar"
                            icon={<CogIcon className="h-5 w-5 text-gray-500" />}
                        >
                            <TreeNode label="Profil" icon={<UsersIcon className="h-5 w-5 text-purple-500" />} />
                            <TreeNode label="Güvenlik" icon={<LockClosedIcon className="h-5 w-5 text-red-500" />} />
                        </TreeNode>
                    </TreeNode>
                </Tree>
            </Panel>

            {/* Different Tree Variations */}
            <Panel
                title="Farklı Ağaç Türleri"
                variant="elevated"
                className="mb-6"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sağda Checkbox</h3>
                        <Tree
                            data={treeData.slice(0, 1)}
                            showCheckbox
                            checkboxPosition="right"
                            showLines={showLines}
                            lineColor={lineColor}
                            multiSelect={multiSelect}
                        />
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Checkbox Olmayan</h3>
                        <Tree
                            data={treeData.slice(0, 1)}
                            showLines={showLines}
                            lineColor={lineColor}
                            multiSelect={multiSelect}
                        />
                    </div>
                </div>
            </Panel>
        </section>
    );
};

export default TreeTest;
