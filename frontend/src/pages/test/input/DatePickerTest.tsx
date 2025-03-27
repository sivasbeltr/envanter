import React, { useState } from 'react';
import { DatePicker } from '../../../components/forms/DatePicker';

/**
 * Test component for DatePicker examples
 */
const DatePickerTest: React.FC = () => {
    const [dateValue, setDateValue] = useState<string>('');

    return (
        <div className="space-y-4">
            <DatePicker
                label="Tarih Seçin"
                value={dateValue}
                onChange={(e) => setDateValue(e.target.value)}
            />

            <DatePicker
                label="Yardım Metni İle"
                value={dateValue}
                onChange={(e) => setDateValue(e.target.value)}
                helperText="GG/AA/YYYY formatında giriniz"
            />

            <DatePicker
                label="Hata İle"
                value={dateValue}
                onChange={(e) => setDateValue(e.target.value)}
                error="Lütfen geçerli bir tarih giriniz"
            />

            <DatePicker
                label="Yükleniyor"
                value={dateValue}
                onChange={(e) => setDateValue(e.target.value)}
                isLoading={true}
            />
        </div>
    );
};

export default DatePickerTest;
