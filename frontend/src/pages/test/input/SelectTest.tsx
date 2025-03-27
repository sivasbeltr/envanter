import React, { useState } from 'react';
import { Select } from '../../../components/forms/Select';

/**
 * Test component for Select examples
 */
const SelectTest: React.FC = () => {
    const [selectValue, setSelectValue] = useState<string>('');

    return (
        <div className="space-y-4">
            <Select
                label="Standart Seçim"
                options={[
                    { value: 'option1', label: 'Seçenek 1' },
                    { value: 'option2', label: 'Seçenek 2' },
                    { value: 'option3', label: 'Seçenek 3' }
                ]}
                placeholder="Bir seçenek seçiniz"
                value={selectValue}
                onChange={(e) => setSelectValue(e.target.value)}
            />

            <Select
                label="Hata İle"
                options={[
                    { value: 'option1', label: 'Seçenek 1' },
                    { value: 'option2', label: 'Seçenek 2' },
                    { value: 'option3', label: 'Seçenek 3' }
                ]}
                placeholder="Bir seçenek seçiniz"
                value={selectValue}
                onChange={(e) => setSelectValue(e.target.value)}
                error="Lütfen bir seçenek seçiniz"
            />

            <Select
                label="Yükleniyor"
                options={[
                    { value: 'option1', label: 'Seçenek 1' },
                    { value: 'option2', label: 'Seçenek 2' },
                    { value: 'option3', label: 'Seçenek 3' }
                ]}
                placeholder="Yükleniyor..."
                value={selectValue}
                onChange={(e) => setSelectValue(e.target.value)}
                isLoading={true}
            />
        </div>
    );
};

export default SelectTest;
