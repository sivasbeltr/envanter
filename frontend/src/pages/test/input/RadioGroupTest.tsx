import React, { useState } from 'react';
import { RadioGroup } from '../../../components/forms/RadioGroup';

/**
 * Test component for RadioGroup examples
 */
const RadioGroupTest: React.FC = () => {
    const [radioVertical, setRadioVertical] = useState<string>('');
    const [radioHorizontal, setRadioHorizontal] = useState<string>('');
    const [radioError, setRadioError] = useState<string>('');

    return (
        <div className="space-y-6">
            <RadioGroup
                label="Dikey Düzen"
                name="radio-vertical"
                options={[
                    { value: 'option1', label: 'Seçenek 1' },
                    { value: 'option2', label: 'Seçenek 2' },
                    { value: 'option3', label: 'Seçenek 3' }
                ]}
                value={radioVertical}
                onChange={setRadioVertical}
            />

            <RadioGroup
                label="Yatay Düzen"
                name="radio-horizontal"
                options={[
                    { value: 'option1', label: 'Seçenek 1' },
                    { value: 'option2', label: 'Seçenek 2' }
                ]}
                value={radioHorizontal}
                onChange={setRadioHorizontal}
                direction="horizontal"
            />

            <RadioGroup
                label="Hata İle"
                name="radio-error"
                options={[
                    { value: 'option1', label: 'Seçenek 1' },
                    { value: 'option2', label: 'Seçenek 2' }
                ]}
                value={radioError}
                onChange={setRadioError}
                error="Lütfen bir seçenek seçiniz"
            />
        </div>
    );
};

export default RadioGroupTest;
