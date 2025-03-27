import React, { useState } from 'react';
import { TextField } from '../../../components/forms/TextField';

/**
 * Test component for TextField examples
 */
const TextFieldTest: React.FC = () => {
    const [text, setText] = useState<string>('');

    return (
        <div className="space-y-4">
            <TextField
                label="Standart Metin Girişi"
                placeholder="Metin girin"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <TextField
                label="Yardım Metni İle"
                placeholder="Metin girin"
                helperText="Bu bir yardım metnidir"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <TextField
                label="Hata Durumu"
                placeholder="Metin girin"
                value={text}
                onChange={(e) => setText(e.target.value)}
                error="Bu alan gereklidir"
            />

            <TextField
                label="Başlangıç İkon"
                placeholder="Email girin"
                startAdornment={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                }
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <TextField
                label="Bitiş İkon"
                placeholder="Şifre girin"
                type="password"
                endAdornment={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                    </svg>
                }
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <TextField
                label="Yükleme Durumu"
                placeholder="Yükleniyor..."
                isLoading={true}
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
        </div>
    );
};

export default TextFieldTest;
