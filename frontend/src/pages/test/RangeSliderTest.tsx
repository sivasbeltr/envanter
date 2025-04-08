import React, { useState } from 'react';
import { Panel } from '../../components/common/Panel';
import { Button } from '../../components/common/Button';
import { useTheme } from '../../context/ThemeContext';

// Import both old and new range components for comparison
import DateRangeSlider from '../../components/forms/DateRangeSlider';
import TimeRangeSlider from '../../components/forms/TimeRangeSlider';
import DateRangeBrush from '../../components/forms/DateRangeBrush';
import TimeRangeBrush from '../../components/forms/TimeRangeBrush';

// Import for mini chart mock
import { LineChart } from '../../components/charts';

/**
 * Test component for Range Selector examples
 */
const RangeSliderTest: React.FC = () => {
    const { theme } = useTheme();

    // Example date range (3 months)
    const [dateRange, setDateRange] = useState<[Date, Date]>([
        new Date(2023, 0, 15), // Jan 15, 2023
        new Date(2023, 3, 15)  // Apr 15, 2023
    ]);

    // Example date range for the current year
    const today = new Date();
    const currentYear = today.getFullYear();
    const startOfYear = new Date(currentYear, 0, 1);
    const endOfYear = new Date(currentYear, 11, 31);

    const [yearDateRange, setYearDateRange] = useState<[Date, Date]>([
        new Date(currentYear, today.getMonth() - 1, 1),
        new Date(currentYear, today.getMonth() + 1, 0)
    ]);

    // Example time range (9 AM to 5 PM in seconds)
    const [timeRange, setTimeRange] = useState<[number, number]>([32400, 61200]); // 9:00:00 AM to 5:00:00 PM

    // Example custom time range (work hours in seconds)
    const [workHours, setWorkHours] = useState<[number, number]>([28800, 64800]); // 8:00:00 AM to 6:00:00 PM

    // Mock chart data for LineChart used as background
    // Generate random data for the mock chart
    const mockChartData = {
        labels: Array.from({ length: 12 }, (_) => {
            const date = new Date(currentYear);
            return date.toLocaleString('tr-TR', { month: 'short' });
        }),
        datasets: [{
            label: 'Veri',
            data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 100) + 20), // Random values between 20 and 120
            borderColor: 'rgba(75, 192, 192, 0.8)',
            tension: 0.4,
            fill: true,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
        }]
    };

    // Zamanı saniyeden HH:MM:SS formatına çeviren yardımcı fonksiyon
    const formatTimeFromSeconds = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    return (
        <section>
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Aralık Seçiciler
            </h2>

            {/* Chart Range Selector Examples */}
            <Panel
                title="Grafik Tarih Aralığı Seçici"
                variant="elevated"
                className="mb-6"
            >
                <div className="space-y-10">
                    {/* Date Range With Chart Background */}
                    <div>
                        <h3 className="text-base font-medium text-gray-800 dark:text-gray-200 mb-2">
                            Grafik Altında Tarih Aralığı Seçici
                        </h3>

                        {/* Chart Display Area */}
                        <div className="mb-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                            <LineChart
                                data={mockChartData}
                                height={200}
                                title="Aylık Veri İstatistikleri"
                            />
                        </div>

                        {/* Range Brush Selector */}
                        <DateRangeBrush
                            minDate={startOfYear}
                            maxDate={endOfYear}
                            value={yearDateRange}
                            onChangeEnd={setYearDateRange}
                            height={60}
                            selectionColor={theme === 'dark' ? 'rgba(56, 189, 248, 0.3)' : 'rgba(14, 165, 233, 0.2)'}
                        />

                        <div className="mt-2 flex justify-between text-sm text-gray-600 dark:text-gray-400">
                            <div>Seçilen Tarih Aralığı: <span className="font-medium">{yearDateRange[0].toLocaleDateString('tr-TR')}</span> - <span className="font-medium">{yearDateRange[1].toLocaleDateString('tr-TR')}</span></div>
                            <Button size="sm" variant="secondary" onClick={() => setYearDateRange([startOfYear, endOfYear])}>
                                Tümünü Göster
                            </Button>
                        </div>
                    </div>

                    {/* Basic Date Range Brush */}
                    <div>
                        <h3 className="text-base font-medium text-gray-800 dark:text-gray-200 mb-2">
                            Basit Tarih Aralığı Seçici
                        </h3>
                        <DateRangeBrush
                            minDate={new Date(2023, 0, 1)}
                            maxDate={new Date(2023, 11, 31)}
                            value={dateRange}
                            onChange={setDateRange}
                            height={80}
                        />
                    </div>
                </div>
            </Panel>

            {/* Time Range Examples */}
            <Panel
                title="Zaman Aralığı Seçici"
                variant="elevated"
                className="mb-6"
            >
                <div className="space-y-10">
                    {/* Time Range Brush */}
                    <div>
                        <h3 className="text-base font-medium text-gray-800 dark:text-gray-200 mb-2">
                            Gün İçi Saat Aralığı
                        </h3>
                        <TimeRangeBrush
                            value={timeRange}
                            onChange={setTimeRange}
                            onChangeEnd={(finalRange) => console.log('Time range finalized:', finalRange)} // Opsiyonel
                            height={60}
                        />
                        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Seçilen Saat Aralığı:
                            <span className="font-medium ml-1">
                                {formatTimeFromSeconds(timeRange[0])} - {formatTimeFromSeconds(timeRange[1])}
                            </span>
                        </div>
                    </div>

                    {/* Custom Time Range */}
                    <div>
                        <h3 className="text-base font-medium text-gray-800 dark:text-gray-200 mb-2">
                            12 Saat Formatında Zaman Aralığı
                        </h3>
                        <TimeRangeBrush
                            value={workHours}
                            onChange={setWorkHours}
                            onChangeEnd={(finalRange) => console.log('Work hours finalized:', finalRange)} // Opsiyonel
                            height={60}
                            use24Hour={false}
                            selectionColor={theme === 'dark' ? 'rgba(139, 92, 246, 0.3)' : 'rgba(124, 58, 237, 0.2)'}
                        />
                        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Seçilen Saat Aralığı:
                            <span className="font-medium ml-1">
                                {formatTimeFromSeconds(workHours[0])} - {formatTimeFromSeconds(workHours[1])}
                            </span>
                        </div>
                    </div>
                </div>
            </Panel>

            {/* Original Range Slider Examples (for comparison) */}
            <Panel
                title="Eski Stil Aralık Seçiciler"
                variant="elevated"
                className="mb-6"
            >
                <div className="space-y-6">
                    <div>
                        <h3 className="text-base font-medium text-gray-800 dark:text-gray-200 mb-4">
                            Slider Tarzı Tarih Aralığı
                        </h3>
                        <div className="px-4 py-6">
                            <DateRangeSlider
                                minDate={new Date(2023, 0, 1)}
                                maxDate={new Date(2023, 11, 31)}
                                value={dateRange}
                                onChange={setDateRange}
                                tickCount={6}
                                primaryColor={theme === 'dark' ? '#60a5fa' : '#3b82f6'}
                            />
                        </div>
                    </div>

                    <div>
                        <h3 className="text-base font-medium text-gray-800 dark:text-gray-200 mb-4">
                            Slider Tarzı Zaman Aralığı
                        </h3>
                        <div className="px-4 py-6">
                            <TimeRangeSlider
                                value={timeRange.map(t => Math.floor(t / 60)) as [number, number]} // Saniyeyi dakikaya çevir
                                onChange={(newRange) => setTimeRange([newRange[0] * 60, newRange[1] * 60])}
                                stepMinutes={30}
                                tickCount={8}
                                primaryColor={theme === 'dark' ? '#60a5fa' : '#3b82f6'}
                            />
                        </div>
                    </div>
                </div>
            </Panel>
        </section>
    );
};

export default RangeSliderTest;