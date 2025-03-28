import React, { useState, useEffect } from 'react';
import { Progress, ProgressColor, ProgressSize } from '../../components/common/Progress';
import { Button } from '../../components/common/Button';

const ProgressTest: React.FC = () => {
    const [value, setValue] = useState(45);
    const [color, setColor] = useState<ProgressColor>('blue');
    const [size, setSize] = useState<ProgressSize>('md');
    const [showLabel, setShowLabel] = useState(true);
    const [labelInside, setLabelInside] = useState(false);
    const [animated, setAnimated] = useState(false);
    const [striped, setStriped] = useState(false);
    const [indeterminate, setIndeterminate] = useState(false);

    // Demo için otomatik ilerleyen ilerleme çubuğu
    const [autoProgress, setAutoProgress] = useState(false);
    const [autoProgressValue, setAutoProgressValue] = useState(0);

    useEffect(() => {
        let timer: number | undefined;
        if (autoProgress) {
            timer = window.setInterval(() => {
                setAutoProgressValue(prev => {
                    if (prev >= 100) {
                        return 0;
                    }
                    return prev + 1;
                });
            }, 100);
        }
        return () => {
            if (timer !== undefined) {
                window.clearInterval(timer);
            }
        };
    }, [autoProgress]);

    const colors: ProgressColor[] = ['blue', 'red', 'green', 'yellow', 'indigo', 'purple', 'pink', 'gray'];
    const sizes: ProgressSize[] = ['xs', 'sm', 'md', 'lg'];

    // Demoyu sıfırla
    const resetDemo = () => {
        setValue(45);
        setColor('blue');
        setSize('md');
        setShowLabel(true);
        setLabelInside(false);
        setAnimated(false);
        setStriped(false);
        setIndeterminate(false);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="mb-6 text-2xl font-semibold">Progress Bileşeni Testi</h1>

            <div className="mb-8">
                <h2 className="mb-4 text-xl font-medium">Ayarlar</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <div>
                        <h3 className="mb-2 font-medium">İlerleme Değeri</h3>
                        <div className="flex items-center">
                            <Button
                                onClick={() => setValue(Math.max(0, value - 10))}
                                size="sm"
                            >
                                -10
                            </Button>
                            <span className="mx-2 w-16 text-center font-medium">{value}%</span>
                            <Button
                                onClick={() => setValue(Math.min(100, value + 10))}
                                size="sm"
                            >
                                +10
                            </Button>
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-2 font-medium">Renk</h3>
                        <div className="flex flex-wrap gap-2">
                            {colors.map(c => (
                                <Button
                                    key={c}
                                    onClick={() => setColor(c)}
                                    variant={color === c ? 'primary' : 'outline'}
                                    size="sm"
                                >
                                    {c}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-2 font-medium">Boyut</h3>
                        <div className="flex flex-wrap gap-2">
                            {sizes.map(s => (
                                <Button
                                    key={s}
                                    onClick={() => setSize(s)}
                                    variant={size === s ? 'primary' : 'outline'}
                                    size="sm"
                                >
                                    {s}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <div>
                        <h3 className="mb-2 font-medium">Etiket</h3>
                        <div className="flex flex-wrap gap-2">
                            <Button
                                onClick={() => setShowLabel(!showLabel)}
                                variant={showLabel ? 'primary' : 'outline'}
                                size="sm"
                            >
                                {showLabel ? 'Etiket Görünür' : 'Etiket Gizli'}
                            </Button>
                            <Button
                                onClick={() => setLabelInside(!labelInside)}
                                variant={labelInside ? 'primary' : 'outline'}
                                size="sm"
                                disabled={!showLabel || size === 'xs' || size === 'sm'}
                            >
                                {labelInside ? 'Etiket İçeride' : 'Etiket Dışarıda'}
                            </Button>
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-2 font-medium">Efektler</h3>
                        <div className="flex flex-wrap gap-2">
                            <Button
                                onClick={() => setAnimated(!animated)}
                                variant={animated ? 'primary' : 'outline'}
                                size="sm"
                                disabled={indeterminate}
                            >
                                {animated ? 'Animasyon Açık' : 'Animasyon Kapalı'}
                            </Button>
                            <Button
                                onClick={() => setStriped(!striped)}
                                variant={striped ? 'primary' : 'outline'}
                                size="sm"
                                disabled={indeterminate}
                            >
                                {striped ? 'Çizgiler Açık' : 'Çizgiler Kapalı'}
                            </Button>
                            <Button
                                onClick={() => setIndeterminate(!indeterminate)}
                                variant={indeterminate ? 'primary' : 'outline'}
                                size="sm"
                            >
                                {indeterminate ? 'Belirsiz Mod' : 'Belirli Mod'}
                            </Button>
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-2 font-medium">Diğer</h3>
                        <div className="flex flex-wrap gap-2">
                            <Button
                                onClick={() => resetDemo()}
                                variant="outline"
                                size="sm"
                            >
                                Sıfırla
                            </Button>
                            <Button
                                onClick={() => setAutoProgress(!autoProgress)}
                                variant={autoProgress ? 'primary' : 'outline'}
                                size="sm"
                            >
                                {autoProgress ? 'Oto İlerleme: Açık' : 'Oto İlerleme: Kapalı'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-8 rounded-lg border border-gray-200 p-6 dark:border-gray-700">
                <h2 className="mb-4 text-xl font-medium">Önizleme</h2>
                <Progress
                    value={value}
                    color={color}
                    size={size}
                    showLabel={showLabel}
                    labelInside={labelInside}
                    animated={animated}
                    striped={striped}
                    indeterminate={indeterminate}
                />
            </div>

            {autoProgress && (
                <div className="mb-8 rounded-lg border border-gray-200 p-6 dark:border-gray-700">
                    <h2 className="mb-4 text-xl font-medium">Otomatik İlerleme Demo</h2>
                    <Progress
                        value={autoProgressValue}
                        color="green"
                        showLabel
                        labelInside
                        size="md"
                    />
                </div>
            )}

            <div className="space-y-8">
                <h2 className="text-xl font-medium">Örnek Kullanımlar</h2>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
                        <h3 className="mb-4 text-lg font-medium">Farklı Boyutlar</h3>
                        <div className="space-y-4">
                            {sizes.map(s => (
                                <div key={s} className="space-y-1">
                                    <div className="text-sm font-medium">{s.toUpperCase()}</div>
                                    <Progress
                                        value={75}
                                        size={s}
                                        showLabel={s !== 'xs'}
                                        labelInside={s === 'lg'}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
                        <h3 className="mb-4 text-lg font-medium">Farklı Renkler</h3>
                        <div className="space-y-4">
                            {colors.map((c, index) => (
                                <Progress
                                    key={c}
                                    value={30 + index * 10}
                                    color={c}
                                    showLabel
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
                        <h3 className="mb-4 text-lg font-medium">Stil Varyasyonları</h3>
                        <div className="space-y-6">
                            <div className="space-y-1">
                                <div className="text-sm font-medium">Normal</div>
                                <Progress value={60} />
                            </div>
                            <div className="space-y-1">
                                <div className="text-sm font-medium">Çizgili</div>
                                <Progress value={60} striped />
                            </div>
                            <div className="space-y-1">
                                <div className="text-sm font-medium">Animasyonlu</div>
                                <Progress value={60} animated />
                            </div>
                            <div className="space-y-1">
                                <div className="text-sm font-medium">Çizgili ve Animasyonlu</div>
                                <Progress value={60} striped animated />
                            </div>
                            <div className="space-y-1">
                                <div className="text-sm font-medium">Belirsiz</div>
                                <Progress value={60} indeterminate />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
                        <h3 className="mb-4 text-lg font-medium">Örnek Kullanım Senaryoları</h3>
                        <div className="space-y-6">
                            <div>
                                <div className="mb-2 flex items-center justify-between">
                                    <span className="text-sm font-medium">Dosya Yükleniyor</span>
                                    <span className="text-sm text-gray-500">15.4MB / 20MB</span>
                                </div>
                                <Progress
                                    value={77}
                                    color="blue"
                                    striped
                                    animated
                                    labelFormat={(v) => `${v}%`}
                                    showLabel
                                    labelInside
                                />
                            </div>

                            <div>
                                <div className="mb-2 flex items-center justify-between">
                                    <span className="text-sm font-medium">Disk Kullanımı</span>
                                    <span className="text-sm text-gray-500">45GB / 100GB</span>
                                </div>
                                <Progress
                                    value={45}
                                    color={45 > 80 ? 'red' : 45 > 60 ? 'yellow' : 'green'}
                                    showLabel
                                />
                            </div>

                            <div>
                                <div className="mb-2 flex items-center justify-between">
                                    <span className="text-sm font-medium">Form Tamamlama</span>
                                </div>
                                <div className="space-y-2">
                                    <Progress
                                        value={100}
                                        color="green"
                                        size="sm"
                                        showLabel
                                        labelFormat={() => "Kişisel Bilgiler"}
                                    />
                                    <Progress
                                        value={50}
                                        color="yellow"
                                        size="sm"
                                        showLabel
                                        labelFormat={() => "Adres Bilgileri"}
                                    />
                                    <Progress
                                        value={0}
                                        color="gray"
                                        size="sm"
                                        showLabel
                                        labelFormat={() => "Ödeme Bilgileri"}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProgressTest;
