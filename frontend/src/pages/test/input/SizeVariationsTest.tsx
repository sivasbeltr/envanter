import React from 'react';
import { TextField } from '../../../components/forms/TextField';
import { Select } from '../../../components/forms/Select';

/**
 * Test component for form element size variations
 */
const SizeVariationsTest: React.FC = () => {
    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <p className="text-sm text-gray-600 dark:text-gray-400">Küçük (sm)</p>
                <div className="flex gap-2 flex-wrap">
                    <TextField customSize="sm" placeholder="Metin girişi" />
                    <Select
                        customSize="sm"
                        options={[
                            { value: '1', label: 'Seçenek 1' },
                            { value: '2', label: 'Seçenek 2' },
                        ]}
                        placeholder="Seçin"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <p className="text-sm text-gray-600 dark:text-gray-400">Orta (md - varsayılan)</p>
                <div className="flex gap-2 flex-wrap">
                    <TextField customSize="md" placeholder="Metin girişi" />
                    <Select
                        customSize="md"
                        options={[
                            { value: '1', label: 'Seçenek 1' },
                            { value: '2', label: 'Seçenek 2' },
                        ]}
                        placeholder="Seçin"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <p className="text-sm text-gray-600 dark:text-gray-400">Büyük (lg)</p>
                <div className="flex gap-2 flex-wrap">
                    <TextField customSize="lg" placeholder="Metin girişi" />
                    <Select
                        customSize="lg"
                        options={[
                            { value: '1', label: 'Seçenek 1' },
                            { value: '2', label: 'Seçenek 2' },
                        ]}
                        placeholder="Seçin"
                    />
                </div>
            </div>
        </div>
    );
};

export default SizeVariationsTest;
