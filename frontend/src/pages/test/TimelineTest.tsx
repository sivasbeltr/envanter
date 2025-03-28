import React from 'react';
import { Panel } from '../../components/common/Panel';
import { Timeline } from '../../components/common/Timeline';
import { Button } from '../../components/common/Button';
import { TimelineItem } from '../../components/common/TimelineItem';
/**
 * Test component for Timeline examples
 */
const TimelineTest: React.FC = () => {
    return (
        <section>
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Timeline Örnekleri</h2>

            {/* Basic Vertical Timeline */}
            <Panel
                title="Temel Dikey Timeline"
                variant="elevated"
                className="mb-6"
            >
                <Timeline>
                    <TimelineItem
                        title="Başvuru Alındı"
                        date="12.06.2023, 10:30"
                        status="completed"
                    >
                        Başvurunuz başarıyla alındı ve sistem tarafından kaydedildi.
                    </TimelineItem>

                    <TimelineItem
                        title="Evraklar İnceleniyor"
                        date="14.06.2023, 14:45"
                        status="completed"
                    >
                        Başvuru evrakları inceleme sürecinde.
                    </TimelineItem>

                    <TimelineItem
                        title="Onay Süreci"
                        date="16.06.2023, 09:15"
                        status="current"
                        dotSize={28}
                    >
                        <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-md border border-blue-200 dark:border-blue-800">
                            <p className="font-medium mb-2">Başvurunuz şu anda onay aşamasındadır.</p>
                            <p>Tahmini tamamlanma süresi: 2 iş günü</p>
                        </div>
                    </TimelineItem>

                    <TimelineItem
                        title="Başvuru Tamamlandı"
                        status="pending"
                    >
                        Son aşama
                    </TimelineItem>
                </Timeline>
            </Panel>

            {/* Right Aligned Timeline */}
            <Panel
                title="Sağa Hizalanmış Timeline"
                variant="elevated"
                className="mb-6"
            >
                <Timeline align="right">
                    <TimelineItem
                        title="İlk Aşama"
                        date="10.06.2023"
                        status="completed"
                        dotColor="#8b5cf6"
                        dotBgColor="#f5f3ff"
                    >
                        Özel renklerle düzenlenmiş bir aşama
                    </TimelineItem>

                    <TimelineItem
                        title="İkinci Aşama"
                        date="15.06.2023"
                        status="completed"
                        dotColor="#8b5cf6"
                        dotBgColor="#f5f3ff"
                    >
                        Tamamlandı
                    </TimelineItem>

                    <TimelineItem
                        title="Üçüncü Aşama"
                        date="Bugün"
                        status="current"
                        dotColor="#8b5cf6"
                        dotBgColor="#f5f3ff"
                    >
                        Şu anda bu aşamadayız
                    </TimelineItem>
                </Timeline>
            </Panel>

            {/* Horizontal Timeline */}
            <Panel
                title="Yatay Timeline"
                variant="elevated"
                className="mb-6"
            >
                <Timeline orientation="horizontal">
                    <TimelineItem
                        title="İstek Alındı"
                        date="10:30"
                        status="completed"
                    >
                        Talep kaydedildi
                    </TimelineItem>

                    <TimelineItem
                        title="İşlemde"
                        date="11:45"
                        status="completed"
                    >
                        Talep işleniyor
                    </TimelineItem>

                    <TimelineItem
                        title="İncelemede"
                        date="14:20"
                        status="current"
                    >
                        Kontrol ediliyor
                    </TimelineItem>

                    <TimelineItem
                        title="Tamamlandı"
                        status="pending"
                    >
                        Son aşama
                    </TimelineItem>
                </Timeline>
            </Panel>

            {/* Interactive Timeline */}
            <Panel
                title="Etkileşimli Timeline"
                variant="elevated"
                className="mb-6"
            >
                <Timeline>
                    <TimelineItem
                        title="Sipariş Oluşturuldu"
                        date="10.06.2023"
                        status="completed"
                        clickable
                        onClick={() => alert('Sipariş detayları gösteriliyor')}
                        contentClassName="hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors"
                    >
                        <p>Sipariş #12345 başarıyla oluşturuldu</p>
                        <Button
                            size="sm"
                            variant="secondary"
                            className="mt-2"
                            onClick={(e) => {
                                e.stopPropagation();
                                alert('Sipariş detaylarına git');
                            }}
                        >
                            Detaylar
                        </Button>
                    </TimelineItem>

                    <TimelineItem
                        title="Ödeme Alındı"
                        date="11.06.2023"
                        status="completed"
                        clickable
                        onClick={() => alert('Ödeme detayları gösteriliyor')}
                        contentClassName="hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors"
                    >
                        <p>₺1,250.00 ödeme işlemi tamamlandı</p>
                        <Button
                            size="sm"
                            variant="secondary"
                            className="mt-2"
                            onClick={(e) => {
                                e.stopPropagation();
                                alert('Ödeme detaylarına git');
                            }}
                        >
                            Makbuz
                        </Button>
                    </TimelineItem>

                    <TimelineItem
                        title="Kargoya Verildi"
                        date="12.06.2023"
                        status="current"
                        clickable
                        onClick={() => alert('Kargo detayları gösteriliyor')}
                        contentClassName="hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors"
                    >
                        <p>Paket yola çıktı, tahmini varış: 15.06.2023</p>
                        <Button
                            size="sm"
                            variant="primary"
                            className="mt-2"
                            onClick={(e) => {
                                e.stopPropagation();
                                alert('Kargo takibine git');
                            }}
                        >
                            Takip Et
                        </Button>
                    </TimelineItem>

                    <TimelineItem
                        title="Teslim Edildi"
                        status="pending"
                    >
                        Bekleniyor
                    </TimelineItem>
                </Timeline>
            </Panel>

            {/* Custom Icons */}
            <Panel
                title="Özel İkonlu Timeline"
                variant="elevated"
                className="mb-6"
            >
                <Timeline>
                    <TimelineItem
                        title="Planlama"
                        date="05.06.2023"
                        status="completed"
                        icon={
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        }
                    >
                        Proje planlaması ve kaynak tahsisi tamamlandı
                    </TimelineItem>

                    <TimelineItem
                        title="Geliştirme"
                        date="10.06.2023"
                        status="completed"
                        icon={
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        }
                    >
                        Yazılım geliştirme süreci tamamlandı
                    </TimelineItem>

                    <TimelineItem
                        title="Test"
                        date="15.06.2023"
                        status="current"
                        icon={
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                            </svg>
                        }
                    >
                        Test süreci devam ediyor
                    </TimelineItem>

                    <TimelineItem
                        title="Dağıtım"
                        status="pending"
                        icon={
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z" />
                                <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
                            </svg>
                        }
                    >
                        Dağıtım için hazırlanıyor
                    </TimelineItem>
                </Timeline>
            </Panel>
            <Panel
                title="Özel Renkli Timeline"
                variant="elevated"
                className="mb-6">
                <Timeline orientation="vertical" align="left" withConnectors={true}>
                    <TimelineItem title="Başvuru Gönderildi" date="10.05.2023" status="completed">
                        Başvurunuz sisteme kaydedildi.
                    </TimelineItem>
                    <TimelineItem title="İnceleme Aşamasında" date="12.05.2023" status="current">
                        Başvurunuz değerlendiriliyor.
                    </TimelineItem>
                    <TimelineItem title="Onay Bekleniyor" date="15.05.2023" status="pending">
                        Sonuçlar yakında açıklanacak.
                    </TimelineItem>
                </Timeline>
            </Panel>
        </section>
    );
};

export default TimelineTest;
