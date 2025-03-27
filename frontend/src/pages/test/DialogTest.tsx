import React, { useState } from 'react';
import { Button } from '../../components/common/Button';
import { AlertDialog, AlertType } from '../../components/dialogs/AlertDialog';
import { LoadingDialog } from '../../components/dialogs/LoadingDialog';
import { ConfirmDialog } from '../../components/dialogs/ConfirmDialog';
import { ProgressDialog } from '../../components/dialogs/ProgressDialog';
import { CountdownDialog } from '../../components/dialogs/CountdownDialog';

/**
 * Test component for Dialog examples
 */
const DialogTest: React.FC = () => {
    // State for alert dialog
    const [alertOpen, setAlertOpen] = useState<boolean>(false);
    const [alertType, setAlertType] = useState<AlertType>('info');
    const [alertTitle, setAlertTitle] = useState<string>('');
    const [alertMessage, setAlertMessage] = useState<string>('');

    // States for loading dialog
    const [loadingOpen, setLoadingOpen] = useState<boolean>(false);
    const [loadingMessage, setLoadingMessage] = useState<string>('Yükleniyor...');

    // States for confirm dialog
    const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
    const [confirmTitle, setConfirmTitle] = useState<string>('');
    const [confirmMessage, setConfirmMessage] = useState<string>('');
    const [confirmVariant, setConfirmVariant] = useState<'primary' | 'danger' | 'success' | 'warning'>('primary');
    const [isConfirmLoading, setIsConfirmLoading] = useState<boolean>(false);

    // States for progress dialog
    const [progressOpen, setProgressOpen] = useState<boolean>(false);
    const [progressValue, setProgressValue] = useState<number>(0);
    const [isIndeterminate, setIsIndeterminate] = useState<boolean>(false);

    // States for countdown dialog
    const [countdownOpen, setCountdownOpen] = useState<boolean>(false);
    const [countdownDuration, setCountdownDuration] = useState<number>(30); // seconds

    // Helper function to open alerts with different types
    const openAlert = (type: AlertType, title: string, message: string) => {
        setAlertType(type);
        setAlertTitle(title);
        setAlertMessage(message);
        setAlertOpen(true);
    };

    // Helper function to simulate a task with loading dialog
    const simulateLoadingTask = (duration: number = 2000) => {
        setLoadingOpen(true);
        setTimeout(() => {
            setLoadingOpen(false);
            openAlert('success', 'İşlem Tamamlandı', 'Yükleme işlemi başarıyla tamamlandı.');
        }, duration);
    };

    // Helper function to simulate a confirm action
    const simulateConfirmAction = () => {
        setIsConfirmLoading(true);
        setTimeout(() => {
            setIsConfirmLoading(false);
            setConfirmOpen(false);
            openAlert('success', 'İşlem Tamamlandı', 'Onaylanan işlem başarıyla gerçekleştirildi.');
        }, 1500);
    };

    // Helper function to simulate progress
    const simulateProgress = (indeterminate: boolean = false) => {
        setIsIndeterminate(indeterminate);
        setProgressValue(0);
        setProgressOpen(true);

        if (!indeterminate) {
            const interval = setInterval(() => {
                setProgressValue(prevValue => {
                    const newValue = prevValue + 10;
                    if (newValue >= 100) {
                        clearInterval(interval);
                        setTimeout(() => {
                            setProgressOpen(false);
                            openAlert('success', 'İşlem Tamamlandı', 'İlerleme işlemi başarıyla tamamlandı.');
                        }, 500);
                        return 100;
                    }
                    return newValue;
                });
            }, 500);
        } else {
            // For indeterminate progress, just show for a while then complete
            setTimeout(() => {
                setProgressOpen(false);
                openAlert('success', 'İşlem Tamamlandı', 'Belirsiz ilerleme işlemi tamamlandı.');
            }, 5000);
        }
    };

    // Helper function to handle countdown timeout
    const handleCountdownTimeout = () => {
        setCountdownOpen(false);
        openAlert('warning', 'Süre Doldu', 'Belirlenen süre doldu ve işlem otomatik olarak sonlandırıldı.');
    };

    return (
        <section>
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Uyarı Diyalog Örnekleri</h2>

            {/* Alert Dialog Examples */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
                <h3 className="font-medium mb-2 text-gray-800 dark:text-gray-200">Temel Uyarı Diyalogları</h3>
                <p className="mb-4 text-gray-700 dark:text-gray-300">Farklı türlerde uyarı diyalogları açmak için aşağıdaki butonları kullanabilirsiniz:</p>

                <div className="flex flex-wrap gap-2">
                    <Button
                        variant="info"
                        onClick={() => openAlert('info', 'Bilgi', 'Bu bir bilgilendirme mesajıdır.')}
                    >
                        Bilgi
                    </Button>

                    <Button
                        variant="warning"
                        onClick={() => openAlert('warning', 'Uyarı', 'Bu bir uyarı mesajıdır. Dikkatli olunuz.')}
                    >
                        Uyarı
                    </Button>

                    <Button
                        variant="success"
                        onClick={() => openAlert('success', 'Başarılı', 'İşlem başarıyla tamamlandı.')}
                    >
                        Başarı
                    </Button>

                    <Button
                        variant="danger"
                        onClick={() => openAlert('error', 'Hata', 'Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.')}
                    >
                        Hata
                    </Button>

                    <Button
                        variant="primary"
                        onClick={() => openAlert(
                            'info',
                            'Otomatik Kapanma',
                            'Bu diyalog 3 saniye sonra otomatik olarak kapanacaktır.'
                        )}
                    >
                        Otomatik Kapanma
                    </Button>

                    <Button
                        variant="secondary"
                        onClick={() => {
                            setAlertType('warning');
                            setAlertTitle('Onay Gerekiyor');
                            setAlertMessage('Bu işlemi yapmak istediğinizden emin misiniz?');
                            setAlertOpen(true);
                        }}
                    >
                        Aksiyonlu Uyarı
                    </Button>
                </div>
            </div>

            {/* Loading Dialog Examples */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
                <h3 className="font-medium mb-2 text-gray-800 dark:text-gray-200">Yükleniyor Diyaloğu</h3>
                <p className="mb-4 text-gray-700 dark:text-gray-300">Uzun süren işlemler için yükleme durumu göstermek amacıyla kullanılır:</p>

                <div className="flex flex-wrap gap-2">
                    <Button
                        variant="primary"
                        onClick={() => simulateLoadingTask(2000)}
                    >
                        Yükleme Göster (2 saniye)
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            setLoadingMessage('Veriler işleniyor, lütfen bekleyiniz...');
                            simulateLoadingTask(4000);
                        }}
                    >
                        Özel Mesaj ile Yükleme
                    </Button>
                </div>
            </div>

            {/* Confirm Dialog Examples */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
                <h3 className="font-medium mb-2 text-gray-800 dark:text-gray-200">Onay Diyaloğu</h3>
                <p className="mb-4 text-gray-700 dark:text-gray-300">Kullanıcıdan bir işlemi onaylamasını istemek için kullanılır:</p>

                <div className="flex flex-wrap gap-2">
                    <Button
                        variant="primary"
                        onClick={() => {
                            setConfirmTitle('Onay Gerekiyor');
                            setConfirmMessage('Bu işlemi gerçekleştirmek istediğinizden emin misiniz?');
                            setConfirmVariant('primary');
                            setConfirmOpen(true);
                        }}
                    >
                        Normal Onay
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => {
                            setConfirmTitle('Silme İşlemi');
                            setConfirmMessage('Bu öğeyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.');
                            setConfirmVariant('danger');
                            setConfirmOpen(true);
                        }}
                    >
                        Tehlikeli İşlem
                    </Button>
                </div>
            </div>

            {/* Progress Dialog Examples */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
                <h3 className="font-medium mb-2 text-gray-800 dark:text-gray-200">İlerleme Diyaloğu</h3>
                <p className="mb-4 text-gray-700 dark:text-gray-300">Uzun süren işlemlerin ilerlemesini göstermek için kullanılır:</p>

                <div className="flex flex-wrap gap-2">
                    <Button
                        variant="primary"
                        onClick={() => simulateProgress(false)}
                    >
                        İlerleme Göster
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => simulateProgress(true)}
                    >
                        Belirsiz İlerleme
                    </Button>
                </div>
            </div>

            {/* Countdown Dialog Examples */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <h3 className="font-medium mb-2 text-gray-800 dark:text-gray-200">Geri Sayım Diyaloğu</h3>
                <p className="mb-4 text-gray-700 dark:text-gray-300">Belirli bir süre sonra otomatik olarak gerçekleşecek işlemler için kullanılır:</p>

                <div className="flex flex-wrap gap-2">
                    <Button
                        variant="primary"
                        onClick={() => {
                            setCountdownDuration(10);
                            setCountdownOpen(true);
                        }}
                    >
                        Kısa Geri Sayım (10s)
                    </Button>
                    <Button
                        variant="warning"
                        onClick={() => {
                            setCountdownDuration(30);
                            setCountdownOpen(true);
                        }}
                    >
                        Oturum Zaman Aşımı (30s)
                    </Button>
                </div>
            </div>

            {/* Alert Dialog Component */}
            <AlertDialog
                isOpen={alertOpen}
                onClose={() => setAlertOpen(false)}
                title={alertTitle}
                message={alertMessage}
                type={alertType}
                autoCloseMs={alertTitle === 'Otomatik Kapanma' ? 3000 : undefined}
                actions={alertTitle === 'Onay Gerekiyor' ? (
                    <>
                        <Button variant="secondary" size="sm" onClick={() => setAlertOpen(false)}>
                            İptal
                        </Button>
                        <Button
                            variant="danger"
                            size="sm"
                            onClick={() => {
                                setAlertOpen(false);
                                setTimeout(() => {
                                    openAlert('success', 'İşlem Tamamlandı', 'İşlem başarıyla tamamlandı.');
                                }, 500);
                            }}
                        >
                            Onayla
                        </Button>
                    </>
                ) : undefined}
            />

            {/* Loading Dialog Component */}
            <LoadingDialog
                isOpen={loadingOpen}
                message={loadingMessage}
            />

            {/* Confirm Dialog Component */}
            <ConfirmDialog
                isOpen={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                title={confirmTitle}
                message={confirmMessage}
                onConfirm={simulateConfirmAction}
                confirmVariant={confirmVariant}
                isConfirmLoading={isConfirmLoading}
            />

            {/* Progress Dialog Component */}
            <ProgressDialog
                isOpen={progressOpen}
                title="İşlem İlerlemesi"
                message="İşlem devam ediyor, lütfen bekleyin..."
                progress={progressValue}
                indeterminate={isIndeterminate}
            />

            {/* Countdown Dialog Component */}
            <CountdownDialog
                isOpen={countdownOpen}
                onClose={() => setCountdownOpen(false)}
                title="Otomatik İşlem"
                message={countdownDuration === 30 ?
                    "Oturumunuz zaman aşımına uğramak üzere. Devam etmek istiyor musunuz?" :
                    "Bu işlem belirtilen sürenin sonunda otomatik olarak tamamlanacak."
                }
                durationSeconds={countdownDuration}
                onTimeout={handleCountdownTimeout}
                showCancelButton={true}
                cancelText={countdownDuration === 30 ? "Oturumu Koru" : "İptal"}
            />
        </section>
    );
};

export default DialogTest;
