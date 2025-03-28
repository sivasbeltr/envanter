import React, { useState } from 'react';
import { Panel } from '../../components/common/Panel';
import { Button } from '../../components/common/Button';
import { BarChart, LineChart, PieChart, DoughnutChart } from '../../components/charts';
import { ChartData } from 'chart.js';

/**
 * Test component for Chart examples
 */
const ChartTest: React.FC = () => {
    // Demo data for bar chart
    const barChartData: ChartData = {
        labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran'],
        datasets: [
            {
                label: 'Gelir (₺)',
                data: [12000, 19000, 15000, 25000, 22000, 30000],
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgb(54, 162, 235)',
                borderWidth: 1
            },
            {
                label: 'Gider (₺)',
                data: [10000, 15000, 12000, 18000, 15000, 20000],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 1
            }
        ]
    };

    // Demo data for stacked bar chart
    const stackedBarChartData: ChartData = {
        labels: ['Bilişim', 'İnsan Kaynakları', 'Finans', 'Satın Alma', 'İdari İşler'],
        datasets: [
            {
                label: 'Bilgisayar',
                data: [65, 20, 45, 30, 25],
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)'
            },
            {
                label: 'Mobilya',
                data: [28, 48, 40, 19, 36],
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)'
            },
            {
                label: 'Ofis Ekipmanı',
                data: [15, 30, 25, 45, 30],
                backgroundColor: 'rgba(255, 205, 86, 0.6)',
                borderColor: 'rgba(255, 205, 86, 1)'
            }
        ]
    };

    // Demo data for line chart
    const lineChartData: ChartData = {
        labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz'],
        datasets: [
            {
                label: 'Satın Alım',
                data: [12, 19, 15, 25, 22, 30, 35],
                borderColor: 'rgb(54, 162, 235)',
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                pointBackgroundColor: 'rgb(54, 162, 235)',
                tension: 0.2
            },
            {
                label: 'Kullanım Dışı',
                data: [5, 10, 8, 15, 12, 16, 18],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                pointBackgroundColor: 'rgb(255, 99, 132)',
                tension: 0.2
            }
        ]
    };

    // Demo data for pie chart
    const pieChartData: ChartData = {
        labels: ['Bilgisayar', 'Mobilya', 'Elektronik', 'Ofis Ekipmanı', 'Diğer'],
        datasets: [{
            data: [35, 25, 20, 15, 5],
            backgroundColor: [
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 99, 132, 0.7)',
                'rgba(255, 206, 86, 0.7)',
                'rgba(75, 192, 192, 0.7)',
                'rgba(153, 102, 255, 0.7)',
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1
        }]
    };

    // Demo data for doughnut chart
    const doughnutChartData: ChartData = {
        labels: ['Aktif', 'Bakımda', 'Kullanım Dışı', 'Hasarlı'],
        datasets: [{
            data: [70, 15, 10, 5],
            backgroundColor: [
                'rgba(16, 185, 129, 0.7)', // yeşil - aktif
                'rgba(59, 130, 246, 0.7)', // mavi - bakımda
                'rgba(245, 158, 11, 0.7)', // amber - kullanım dışı
                'rgba(239, 68, 68, 0.7)', // kırmızı - hasarlı
            ],
            borderColor: [
                'rgba(16, 185, 129, 1)',
                'rgba(59, 130, 246, 1)',
                'rgba(245, 158, 11, 1)',
                'rgba(239, 68, 68, 1)',
            ],
            borderWidth: 1
        }]
    };

    // State for dynamic chart refresh
    const [refreshKey, setRefreshKey] = useState(0);
    const [randomData, setRandomData] = useState<number[]>([30, 40, 30, 50, 45, 60]);

    // Function to generate random data for charts
    const regenerateRandomData = () => {
        const newData = Array.from({ length: 6 }, () => Math.floor(Math.random() * 60) + 20);
        setRandomData(newData);
        setRefreshKey(prev => prev + 1);
    };

    // Demo data with random values
    const randomBarData: ChartData = {
        labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran'],
        datasets: [
            {
                label: 'Envanter Hareketleri',
                data: randomData,
                backgroundColor: 'rgba(147, 51, 234, 0.5)',
                borderColor: 'rgb(147, 51, 234)',
                borderWidth: 1
            }
        ]
    };

    // Function to mock API data transformation
    const transformApiData = (apiResponse: any): ChartData => {
        // In a real scenario, this would process actual API data
        // Here we just transform the mock data structure
        return {
            labels: apiResponse.categories || [],
            datasets: [{
                label: apiResponse.title || 'Veri',
                data: apiResponse.values || [],
                backgroundColor: 'rgba(16, 185, 129, 0.5)',
                borderColor: 'rgb(16, 185, 129)',
                borderWidth: 1
            }]
        };
    };

    return (
        <section className="space-y-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Grafik Örnekleri</h2>

            {/* Bar Chart Examples */}
            <Panel
                title="Çubuk Grafik Örnekleri"
                subtitle="Bar Chart"
                variant="elevated"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Basic Bar Chart */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Basit Çubuk Grafik</h3>
                        <BarChart
                            data={barChartData}
                            height={250}
                            title="Aylık Gelir-Gider"
                        />
                    </div>

                    {/* Horizontal Bar Chart */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Yatay Çubuk Grafik</h3>
                        <BarChart
                            data={barChartData}
                            height={250}
                            horizontal={true}
                            title="Aylık Gelir-Gider (Yatay)"
                        />
                    </div>

                    {/* Stacked Bar Chart */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Yığılmış Çubuk Grafik</h3>
                        <BarChart
                            data={stackedBarChartData}
                            height={250}
                            stacked={true}
                            title="Birimlere Göre Varlık Dağılımı"
                        />
                    </div>

                    {/* Random Data with Refresh */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Dinamik Veri Güncelleme</h3>
                            <Button
                                onClick={regenerateRandomData}
                            >
                                Yeni Veri Üret
                            </Button>
                        </div>
                        <BarChart
                            key={`bar-chart-${refreshKey}`}
                            data={randomBarData}
                            height={250}
                            title="Rastgele Veri"
                        />
                    </div>
                </div>
            </Panel>

            {/* Line Chart Examples */}
            <Panel
                title="Çizgi Grafik Örnekleri"
                subtitle="Line Chart"
                variant="elevated"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Basic Line Chart */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Temel Çizgi Grafik</h3>
                        <LineChart
                            data={lineChartData}
                            height={250}
                            title="Aylık İşlem Trendi"
                        />
                    </div>

                    {/* Curved Line Chart with Fill */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Dolgulu Eğrisel Grafik</h3>
                        <LineChart
                            data={lineChartData}
                            height={250}
                            curved={true}
                            fill={true}
                            title="Dolgulu Trend Grafiği"
                        />
                    </div>

                    {/* Stepped Line Chart */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Adımlı Çizgi Grafik</h3>
                        <LineChart
                            data={lineChartData}
                            height={250}
                            stepped={true}
                            title="Adımlı Değişim Grafiği"
                        />
                    </div>

                    {/* Mock API Line Chart */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">API Verisi Simülasyonu</h3>
                        <LineChart
                            apiUrl="/api/mock/chart-data" // This URL is for demonstration only
                            transformData={transformApiData}
                            height={250}
                            title="API Verisi (Simüle)"
                            subtitle="Gerçek bir API çağrısı simüle edilmektedir"
                        />
                    </div>
                </div>
            </Panel>

            {/* Pie & Doughnut Chart Examples */}
            <Panel
                title="Pasta ve Halka Grafik Örnekleri"
                subtitle="Pie & Doughnut Charts"
                variant="elevated"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Basic Pie Chart */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Pasta Grafik</h3>
                        <PieChart
                            data={pieChartData}
                            height={250}
                            title="Varlık Kategorileri"
                            showPercentages={true}
                        />
                    </div>

                    {/* Doughnut Chart */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Halka Grafik</h3>
                        <DoughnutChart
                            data={doughnutChartData}
                            height={250}
                            title="Varlık Durumları"
                            cutoutPercentage={70}
                        />
                    </div>

                    {/* Pie Chart without Percentages */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Yüzdesiz Pasta Grafik</h3>
                        <PieChart
                            data={pieChartData}
                            height={250}
                            title="Kategori Dağılımı"
                            showPercentages={false}
                        />
                    </div>

                    {/* Custom Options Doughnut */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Özelleştirilmiş Halka Grafik</h3>
                        <DoughnutChart
                            data={doughnutChartData}
                            height={250}
                            title="Duruma Göre Varlık Dağılımı"
                            options={{
                                plugins: {
                                    legend: {
                                        position: 'bottom'
                                    }
                                }
                            }}
                        />
                    </div>
                </div>
            </Panel>

            {/* Chart Responsiveness Demo */}
            <Panel
                title="Duyarlı Grafikler"
                subtitle="Farklı boyutlarda grafikler"
                variant="elevated"
            >
                <div className="space-y-6">
                    <div>
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tam Genişlik Grafik</h3>
                        <BarChart
                            data={stackedBarChartData}
                            height={200}
                            stacked={true}
                            title="Responsive Bar Chart"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Küçük Grafik</h3>
                            <PieChart
                                data={pieChartData}
                                height={150}
                                title="Küçük Pasta"
                            />
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Orta Grafik</h3>
                            <DoughnutChart
                                data={doughnutChartData}
                                height={150}
                                title="Orta Halka"
                            />
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Küçük Grafik</h3>
                            <LineChart
                                data={lineChartData}
                                height={150}
                                title="Küçük Çizgi"
                                curved={true}
                                fill={true}
                            />
                        </div>
                    </div>
                </div>
            </Panel>
        </section>
    );
};

export default ChartTest;
