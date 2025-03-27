import React, { useState } from 'react';
import { Panel } from '../../components/common/Panel';
import { Button } from '../../components/common/Button';
import { Stepper } from '../../components/common/Stepper';
import { StepperItem } from '../../components/common/StepperItem';

/**
 * Test component for Stepper examples
 */
const StepperTest: React.FC = () => {
    const [activeStep, setActiveStep] = useState(1);
    const [verticalStep, setVerticalStep] = useState(0);
    const [interactiveStep, setInteractiveStep] = useState(0);

    // Content for interactive stepper
    const stepContent = [
        <div key="step1" className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h3 className="text-lg font-medium">Adım 1: Başlangıç</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
                Bu işleme başlamak için devam butonuna tıklayın.
            </p>
        </div>,
        <div key="step2" className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h3 className="text-lg font-medium">Adım 2: Bilgileriniz</h3>
            <div className="mt-4 space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Ad Soyad</label>
                        <input type="text" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm dark:bg-gray-700 dark:text-white" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">E-posta</label>
                        <input type="email" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm dark:bg-gray-700 dark:text-white" />
                    </div>
                </div>
            </div>
        </div>,
        <div key="step3" className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-red-300 dark:border-red-800">
            <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Adım 3: Hata!</h3>
            <p className="mt-2 text-red-600 dark:text-red-400">
                Doğrulama işlemi sırasında bir hata oluştu. Lütfen bilgilerinizi kontrol edip tekrar deneyin.
            </p>
        </div>,
        <div key="step4" className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h3 className="text-lg font-medium text-green-600 dark:text-green-400">Adım 4: Tamamlandı!</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
                İşlem başarıyla tamamlandı. Teşekkür ederiz.
            </p>
            <div className="mt-4 flex items-center">
                <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="ml-2 text-green-600 dark:text-green-400">Başarıyla kaydedildi</span>
            </div>
        </div>
    ];

    return (
        <section>
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Stepper Örnekleri</h2>

            {/* Basic Horizontal Stepper */}
            <Panel
                title="Temel Yatay Stepper"
                variant="elevated"
                className="mb-6"
            >
                <div className="mb-6">
                    <Stepper activeStep={activeStep}>
                        <StepperItem label="Kişisel Bilgiler" />
                        <StepperItem label="İletişim Bilgileri" />
                        <StepperItem label="Ödeme Detayları" />
                        <StepperItem label="Onay" />
                    </Stepper>
                </div>

                <div className="flex justify-between">
                    <Button
                        variant="secondary"
                        onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                        disabled={activeStep === 0}
                    >
                        Geri
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => setActiveStep(prev => Math.min(3, prev + 1))}
                        disabled={activeStep === 3}
                    >
                        İleri
                    </Button>
                </div>
            </Panel>

            {/* Vertical Stepper */}
            <Panel
                title="Dikey Stepper"
                variant="elevated"
                className="mb-6"
            >
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 mb-4 md:mb-0">
                        <Stepper
                            activeStep={verticalStep}
                            orientation="vertical"
                            variant="outlined"
                        >
                            <StepperItem
                                label="Başvuru Formu"
                                description="Başvuru formunu doldurun ve gerekli belgeleri yükleyin."
                            />
                            <StepperItem
                                label="Belge İncelemesi"
                                description="Belgeleriniz yetkili birimler tarafından inceleniyor."
                            />
                            <StepperItem
                                label="Ödeme İşlemi"
                                description="Başvuru ücretini ödeyin."
                                optional
                            />
                            <StepperItem
                                label="Başvuru Onayı"
                                description="Başvurunuz onaylandı ve işleminiz tamamlandı."
                            />
                        </Stepper>
                    </div>

                    <div className="md:w-2/3 md:pl-6 space-y-4">
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
                            <h3 className="font-medium">
                                {verticalStep === 0 && "Başvuru Formu"}
                                {verticalStep === 1 && "Belge İncelemesi"}
                                {verticalStep === 2 && "Ödeme İşlemi"}
                                {verticalStep === 3 && "Başvuru Onayı"}
                            </h3>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                                {verticalStep === 0 && "Başvuru formunu doldurun ve gerekli belgeleri yükleyin."}
                                {verticalStep === 1 && "Belgeleriniz yetkili birimler tarafından inceleniyor."}
                                {verticalStep === 2 && "Başvuru ücretini ödeyin."}
                                {verticalStep === 3 && "Başvurunuz onaylandı ve işleminiz tamamlandı."}
                            </p>
                        </div>

                        <div className="flex justify-between">
                            <Button
                                variant="secondary"
                                onClick={() => setVerticalStep(prev => Math.max(0, prev - 1))}
                                disabled={verticalStep === 0}
                            >
                                Geri
                            </Button>
                            <Button
                                variant="primary"
                                onClick={() => setVerticalStep(prev => Math.min(3, prev + 1))}
                                disabled={verticalStep === 3}
                            >
                                İleri
                            </Button>
                        </div>
                    </div>
                </div>
            </Panel>

            {/* Stepper Variations */}
            <Panel
                title="Stepper Çeşitleri"
                variant="elevated"
                className="mb-6"
            >
                <div className="space-y-8">
                    <div>
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Varsayılan</h3>
                        <Stepper activeStep={1} variant="default">
                            <StepperItem label="Adım 1" />
                            <StepperItem label="Adım 2" />
                            <StepperItem label="Adım 3" />
                        </Stepper>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Çizgili (Outlined)</h3>
                        <Stepper activeStep={1} variant="outlined">
                            <StepperItem label="Adım 1" />
                            <StepperItem label="Adım 2" />
                            <StepperItem label="Adım 3" />
                        </Stepper>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Dolgulu (Contained)</h3>
                        <Stepper activeStep={1} variant="contained">
                            <StepperItem label="Adım 1" />
                            <StepperItem label="Adım 2" />
                            <StepperItem label="Adım 3" />
                        </Stepper>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Numarasız</h3>
                        <Stepper activeStep={1} showStepNumbers={false}>
                            <StepperItem label="Adım 1" />
                            <StepperItem label="Adım 2" />
                            <StepperItem label="Adım 3" />
                        </Stepper>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bağlantısız</h3>
                        <Stepper activeStep={1} withConnectors={false}>
                            <StepperItem label="Adım 1" />
                            <StepperItem label="Adım 2" />
                            <StepperItem label="Adım 3" />
                        </Stepper>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Farklı Boyutlar</h3>
                        <div className="space-y-4">
                            <Stepper activeStep={1} size="sm">
                                <StepperItem label="Küçük" />
                                <StepperItem label="Boyut" />
                                <StepperItem label="SM" />
                            </Stepper>

                            <Stepper activeStep={1} size="md">
                                <StepperItem label="Orta" />
                                <StepperItem label="Boyut" />
                                <StepperItem label="MD" />
                            </Stepper>

                            <Stepper activeStep={1} size="lg">
                                <StepperItem label="Büyük" />
                                <StepperItem label="Boyut" />
                                <StepperItem label="LG" />
                            </Stepper>
                        </div>
                    </div>
                </div>
            </Panel>

            {/* Interactive Stepper Example */}
            <Panel
                title="Etkileşimli Stepper Örneği"
                subtitle="Tıklanabilir adımlar ve adım içerikleri"
                variant="elevated"
                className="mb-6"
            >
                <div className="space-y-6">
                    <Stepper
                        activeStep={interactiveStep}
                        clickable
                        onStepClick={(step) => setInteractiveStep(step)}
                    >
                        <StepperItem
                            label="Başla"
                            description="Sürece başlayın"
                            icon={
                                <svg className="w-full h-full p-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                            }
                        />
                        <StepperItem
                            label="Bilgiler"
                            description="Gerekli bilgileri doldurun"
                        />
                        <StepperItem
                            label="Doğrulama"
                            description="Bilgilerinizi doğrulayın"
                            status={interactiveStep === 2 ? 'error' : undefined}
                        />
                        <StepperItem
                            label="Tamamlandı"
                            description="İşlem tamamlandı"
                        />
                    </Stepper>

                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        {stepContent[interactiveStep]}
                    </div>

                    <div className="flex justify-between">
                        <Button
                            variant="secondary"
                            onClick={() => setInteractiveStep(prev => Math.max(0, prev - 1))}
                            disabled={interactiveStep === 0}
                        >
                            Geri
                        </Button>
                        <Button
                            variant={interactiveStep === 2 ? "danger" : "primary"}
                            onClick={() => setInteractiveStep(prev => Math.min(3, prev + 1))}
                            disabled={interactiveStep === 3}
                        >
                            {interactiveStep === 2 ? "Hata Düzelt" : "İleri"}
                        </Button>
                    </div>
                </div>
            </Panel>
        </section>
    );
};

export default StepperTest;
