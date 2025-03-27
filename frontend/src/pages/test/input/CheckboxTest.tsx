import React, { useState } from 'react';
import { Checkbox } from '../../../components/forms/Checkbox';

/**
 * Test component for Checkbox examples
 */
const CheckboxTest: React.FC = () => {
    const [checkboxDefault, setCheckboxDefault] = useState<boolean>(false);
    const [checkboxWithError, setCheckboxWithError] = useState<boolean>(false);
    const [checkboxWithHelper, setCheckboxWithHelper] = useState<boolean>(false);

    return (
        <div className="space-y-4">
            <Checkbox
                label="Şartları kabul ediyorum"
                checked={checkboxDefault}
                onChange={(e) => setCheckboxDefault(e.target.checked)}
            />

            <Checkbox
                label="Hata İle"
                checked={checkboxWithError}
                onChange={(e) => setCheckboxWithError(e.target.checked)}
                error="Bu alan zorunludur"
            />

            <Checkbox
                label="Devre Dışı"
                checked={true}
                disabled={true}
                onChange={() => { }} // No-op
            />

            <Checkbox
                label="Yardım Metni İle"
                checked={checkboxWithHelper}
                onChange={(e) => setCheckboxWithHelper(e.target.checked)}
                helperText="Daha fazla bilgi için buraya tıklayın"
            />
        </div>
    );
};

export default CheckboxTest;
