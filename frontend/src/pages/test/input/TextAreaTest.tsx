import React, { useState } from 'react';
import { TextArea } from '../../../components/forms/TextArea';

/**
 * Test component for TextArea examples
 */
const TextAreaTest: React.FC = () => {
    const [textArea, setTextArea] = useState<string>('');

    return (
        <div className="space-y-4">
            <TextArea
                label="Açıklama"
                placeholder="Açıklamanızı giriniz"
                rows={4}
                value={textArea}
                onChange={(e) => setTextArea(e.target.value)}
            />

            <TextArea
                label="Hata İle"
                placeholder="Açıklamanızı giriniz"
                rows={3}
                value={textArea}
                onChange={(e) => setTextArea(e.target.value)}
                error="Açıklama en az 10 karakter olmalıdır"
            />
        </div>
    );
};

export default TextAreaTest;
