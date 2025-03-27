import React, { useState } from 'react';
import { Switch } from '../../../components/forms/Switch';

/**
 * Test component for Switch examples
 */
const SwitchTest: React.FC = () => {
    const [switchNotifications, setSwitchNotifications] = useState<boolean>(false);
    const [switchSmall, setSwitchSmall] = useState<boolean>(false);
    const [switchLarge, setSwitchLarge] = useState<boolean>(false);
    const [switchError, setSwitchError] = useState<boolean>(false);

    return (
        <div className="space-y-4">
            <Switch
                label="Bildirimleri aktifleştir"
                checked={switchNotifications}
                onChange={(checked) => setSwitchNotifications(checked)}
            />

            <Switch
                label="Küçük Boyut"
                size="sm"
                checked={switchSmall}
                onChange={(checked) => setSwitchSmall(checked)}
            />

            <Switch
                label="Büyük Boyut"
                size="lg"
                checked={switchLarge}
                onChange={(checked) => setSwitchLarge(checked)}
            />

            <Switch
                label="Hata İle"
                checked={switchError}
                onChange={(checked) => setSwitchError(checked)}
                error="Bu alanı aktifleştirmelisiniz"
            />

            <Switch
                label="Devre Dışı"
                checked={true}
                onChange={() => { }} // No-op
                disabled={true}
            />
        </div>
    );
};

export default SwitchTest;
