import React, { useState } from 'react';
import { Alert, AlertType } from '../../components/common/Alert';
import { Button } from '../../components/common/Button';

const AlertTest: React.FC = () => {
    const [alerts, setAlerts] = useState<{
        id: number;
        type: AlertType;
        title?: string;
        message: string;
        dismissible: boolean;
        withIcon: boolean;
    }[]>([
        {
            id: 1,
            type: 'info',
            title: 'Bilgi',
            message: 'Bu bir bilgilendirme mesajıdır.',
            dismissible: true,
            withIcon: true,
        },
    ]);

    const addAlert = (type: AlertType, withTitle: boolean = true, dismissible: boolean = true, withIcon: boolean = true) => {
        const titles: Record<AlertType, string> = {
            info: 'Bilgi',
            success: 'Başarılı',
            warning: 'Uyarı',
            error: 'Hata',
        };

        const messages: Record<AlertType, string> = {
            info: 'Bu bir bilgilendirme mesajıdır. Sistem kullanımı hakkında bilgiler içerir.',
            success: 'İşlem başarıyla tamamlandı. Yönlendiriliyorsunuz.',
            warning: 'Dikkatli olunması gereken bir durum oluştu. Lütfen kontrol ediniz.',
            error: 'İşlem sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.',
        };

        setAlerts([...alerts, {
            id: Date.now(),
            type,
            title: withTitle ? titles[type] : undefined,
            message: messages[type],
            dismissible,
            withIcon,
        }]);
    };

    const removeAlert = (id: number) => {
        setAlerts(alerts.filter(alert => alert.id !== id));
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="mb-6 text-2xl font-semibold">Alert Bileşeni Testi</h1>

            <div className="mb-8">
                <h2 className="mb-4 text-xl font-medium">Yeni Alert Ekle</h2>
                <div className="flex flex-wrap gap-2">
                    <Button onClick={() => addAlert('info')}>Bilgi</Button>
                    <Button onClick={() => addAlert('success')}>Başarılı</Button>
                    <Button onClick={() => addAlert('warning')}>Uyarı</Button>
                    <Button onClick={() => addAlert('error')}>Hata</Button>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                    <Button onClick={() => addAlert('info', false)} variant="outline">Başlıksız</Button>
                    <Button onClick={() => addAlert('info', true, false)} variant="outline">Kapatma Düğmesiz</Button>
                    <Button onClick={() => addAlert('info', true, true, false)} variant="outline">İkonsuz</Button>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="mb-4 text-xl font-medium">Aktif Alertler</h2>

                {alerts.map(alert => (
                    <Alert
                        key={alert.id}
                        type={alert.type}
                        title={alert.title}
                        message={alert.message}
                        dismissible={alert.dismissible}
                        withIcon={alert.withIcon}
                        onDismiss={() => removeAlert(alert.id)}
                        className="mb-4"
                    />
                ))}

                {alerts.length === 0 && (
                    <p className="text-gray-500">Hiç alert yok. Yukarıdaki düğmelerden ekleyebilirsiniz.</p>
                )}
            </div>

            <div className="mt-8">
                <h2 className="mb-4 text-xl font-medium">Otomatik Kapanan Alert</h2>
                <Button
                    onClick={() => {
                        const id = Date.now();
                        setAlerts([...alerts, {
                            id,
                            type: 'success',
                            title: 'Otomatik Kapanacak',
                            message: 'Bu alert 3 saniye sonra otomatik olarak kapanacaktır.',
                            dismissible: true,
                            withIcon: true,
                        }]);

                        setTimeout(() => {
                            removeAlert(id);
                        }, 3000);
                    }}
                >
                    Otomatik Kapanan Alert Ekle
                </Button>
            </div>
        </div>
    );
};

export default AlertTest;
