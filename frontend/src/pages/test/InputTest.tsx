import React from 'react';
import { Panel } from '../../components/common/Panel';
import TextFieldTest from './input/TextFieldTest';
import TextAreaTest from './input/TextAreaTest';
import SelectTest from './input/SelectTest';
import CheckboxTest from './input/CheckboxTest';
import RadioGroupTest from './input/RadioGroupTest';
import SwitchTest from './input/SwitchTest';
import DatePickerTest from './input/DatePickerTest';
import PickerDialogTest from './input/PickerDialogTest';
import AutoCompleteTest from './input/AutoCompleteTest';
import SizeVariationsTest from './input/SizeVariationsTest';

/**
 * Test component for Form Input examples
 */
const InputTest: React.FC = () => {
    return (
        <section>
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Form Bileşen Örnekleri</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Text Input Examples */}
                <Panel
                    title="Metin Girişi (TextField)"
                    variant="elevated"
                >
                    <TextFieldTest />
                </Panel>

                {/* TextArea Example */}
                <Panel
                    title="Çoklu Satır Girişi (TextArea)"
                    variant="elevated"
                >
                    <TextAreaTest />
                </Panel>

                {/* Select Example */}
                <Panel
                    title="Seçim Kutusu (Select)"
                    variant="elevated"
                >
                    <SelectTest />
                </Panel>

                {/* Checkbox Example */}
                <Panel
                    title="Onay Kutusu (Checkbox)"
                    variant="elevated"
                >
                    <CheckboxTest />
                </Panel>

                {/* Radio Group Example */}
                <Panel
                    title="Radyo Düğmeleri (RadioGroup)"
                    variant="elevated"
                >
                    <RadioGroupTest />
                </Panel>

                {/* Switch Example */}
                <Panel
                    title="Anahtar (Switch)"
                    variant="elevated"
                >
                    <SwitchTest />
                </Panel>

                {/* DatePicker Example */}
                <Panel
                    title="Tarih Seçici (DatePicker)"
                    variant="elevated"
                >
                    <DatePickerTest />
                </Panel>

                {/* Size variations for form elements */}
                <Panel
                    title="Boyut Seçenekleri"
                    variant="elevated"
                >
                    <SizeVariationsTest />
                </Panel>

                {/* Picker Dialog Examples */}
                <Panel
                    title="Seçici Dialog"
                    variant="elevated"
                >
                    <PickerDialogTest />
                </Panel>

            </div>

            {/* AutoComplete Examples */}
            <Panel
                title="Otomatik Tamamlama (AutoComplete)"
                subtitle="Farklı özelliklerde otomatik tamamlama örnekleri"
                variant="elevated"
                className="mb-6"
            >
                <AutoCompleteTest />
            </Panel>
        </section>
    );
};

export default InputTest;
