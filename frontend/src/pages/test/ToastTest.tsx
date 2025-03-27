import React from 'react';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';
import { Panel } from '../../components/common/Panel';

/**
 * Test component for Toast examples
 */
const ToastTest: React.FC = () => {
    const {
        showSuccess,
        showError,
        showWarning,
        showInfo,

        closeAllToasts
    } = useToast();

    return (
        <section>
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Toast Bildirimleri</h2>

            <Panel
                title="Temel Toast Bildirimleri"
                subtitle="Farklı tiplerde toast bildirimleri göstermek için aşağıdaki butonları kullanabilirsiniz."
                variant="elevated"
                className="mb-6"
            >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button
                        variant="success"
                        onClick={() => showSuccess('İşlem başarıyla tamamlandı.')}
                    >
                        Başarı
                    </Button>

                    <Button
                        variant="danger"
                        onClick={() => showError('Bir hata oluştu.')}
                    >
                        Hata
                    </Button>

                    <Button
                        variant="warning"
                        onClick={() => showWarning('Bu bir uyarı mesajıdır.')}
                    >
                        Uyarı
                    </Button>

                    <Button
                        variant="info"
                        onClick={() => showInfo('Bilgilendirme mesajı.')}
                    >
                        Bilgi
                    </Button>
                </div>
            </Panel>

            <Panel
                title="Gelişmiş Toast Seçenekleri"
                variant="elevated"
                className="mb-6"
            >
                <div className="space-y-4">
                    <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Başlıklı Toast</p>
                        <Button
                            variant="primary"
                            onClick={() => showSuccess('İşlem başarıyla tamamlandı.', { title: 'Ödeme Onayı' })}
                        >
                            Başlıklı Toast Göster
                        </Button>
                    </div>

                    <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Uzun Süreli Toast</p>
                        <Button
                            variant="primary"
                            onClick={() => showInfo('Bu bildirim 10 saniye görünecek.', {
                                duration: 10000,
                                title: 'Uzun Süreli Bildirim'
                            })}
                        >
                            10 Saniye Toast
                        </Button>
                    </div>

                    <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Kalıcı Toast</p>
                        <Button
                            variant="primary"
                            onClick={() => showWarning('Bu bildirim manuel olarak kapatılana kadar ekranda kalacak.', {
                                duration: 0,
                                title: 'Kalıcı Bildirim'
                            })}
                        >
                            Kalıcı Toast
                        </Button>
                    </div>

                    <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Tıklanabilir Toast</p>
                        <Button
                            variant="primary"
                            onClick={() => showInfo('Bu bildirime tıklayabilirsiniz.', {
                                title: 'Tıklanabilir Bildirim',
                                onClick: () => alert('Toast\'a tıklandı!')
                            })}
                        >
                            Tıklanabilir Toast
                        </Button>
                    </div>
                </div>
            </Panel>

            <Panel
                title="Çoklu Toast"
                variant="elevated"
                className="mb-6"
            >
                <div className="space-y-4">
                    <Button
                        variant="primary"
                        onClick={() => {
                            // Show multiple toasts
                            showSuccess('Birinci bildirim');
                            setTimeout(() => showInfo('İkinci bildirim'), 500);
                            setTimeout(() => showWarning('Üçüncü bildirim'), 1000);
                            setTimeout(() => showError('Dördüncü bildirim'), 1500);
                        }}
                    >
                        Çoklu Toast Göster
                    </Button>

                    <Button
                        variant="secondary"
                        onClick={closeAllToasts}
                    >
                        Tüm Toastları Kapat
                    </Button>
                </div>
            </Panel>
        </section>
    );
};

export default ToastTest;
