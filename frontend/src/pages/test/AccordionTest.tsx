import React from 'react';
import { Accordion } from '../../components/common/Accordion';
import { AccordionItem } from '../../components/common/AccordionItem';
import { Panel } from '../../components/common/Panel';

/**
 * Test component for Accordion examples
 */
const AccordionTest: React.FC = () => {
    return (
        <section>
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Accordion Örnekleri</h2>

            <Panel
                title="Temel Accordion"
                variant="elevated"
                className="mb-6"
            >
                <Accordion defaultExpandedIndex={0}>
                    <AccordionItem title="Accordion Nedir?">
                        <p className="text-gray-700 dark:text-gray-300">
                            Accordion, içeriği bölümlere ayırmak ve kullanıcının her seferinde
                            sadece ihtiyacı olan bilgiye erişmesini sağlamak için kullanılan bir UI bileşenidir.
                        </p>
                    </AccordionItem>
                    <AccordionItem title="Ne zaman kullanılmalıdır?">
                        <p className="text-gray-700 dark:text-gray-300">
                            Accordion, özellikle sınırlı alanda çok fazla bilgi sunmanız
                            gerektiğinde veya bilgiyi kategorilere ayırmak istediğinizde
                            kullanışlıdır. Sıkça sorulan sorular, ayarlar menüsü veya
                            kategorilere ayrılmış içerikler için idealdir.
                        </p>
                    </AccordionItem>
                    <AccordionItem title="Diğer bileşenlerden farkı nedir?">
                        <p className="text-gray-700 dark:text-gray-300">
                            Accordionlar, sekmelere (tabs) benzer ancak daha az yer kaplar
                            ve aynı anda sadece bir bölümün görüntülenmesine izin verir.
                            Sekmelerden farklı olarak, bir bölüm açıldığında diğerleri
                            kapanır ve ekranda daha az yer kaplar.
                        </p>
                    </AccordionItem>
                </Accordion>
            </Panel>

            <Panel
                title="Çoklu Genişleme"
                subtitle="Bu örnekte birden fazla öğe aynı anda açık olabilir"
                variant="elevated"
                className="mb-6"
            >
                <Accordion allowMultiple={true}>
                    <AccordionItem title="İlk Bölüm">
                        <p className="text-gray-700 dark:text-gray-300">
                            Bu bölümün içeriği burada yer alır. Diğer bölümler açık kalırken bu bölüm de açılabilir.
                        </p>
                    </AccordionItem>
                    <AccordionItem title="İkinci Bölüm">
                        <p className="text-gray-700 dark:text-gray-300">
                            İkinci bölümün içeriği. Çoklu genişleme özelliği sayesinde diğer bölümlerle aynı anda açık kalabilir.
                        </p>
                    </AccordionItem>
                    <AccordionItem title="Üçüncü Bölüm">
                        <p className="text-gray-700 dark:text-gray-300">
                            Üçüncü bölümün içeriği. Tüm bölümler aynı anda açık olabilir.
                        </p>
                    </AccordionItem>
                </Accordion>
            </Panel>

            <Panel
                title="Farklı Varyantlar"
                subtitle="Accordion'un farklı görsel stilleri"
                variant="elevated"
                className="mb-6"
            >
                <div className="space-y-6">
                    <div>
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Standart Varyant</h4>
                        <Accordion variant="default">
                            <AccordionItem title="Standart Görünüm">
                                <p className="text-gray-700 dark:text-gray-300">
                                    Bu, Accordion'un varsayılan görünümüdür. Kenarlar ve çerçeve ile birlikte gelir.
                                </p>
                            </AccordionItem>
                            <AccordionItem title="Bir Diğer Başlık">
                                <p className="text-gray-700 dark:text-gray-300">
                                    Standart varyant için bir başka içerik örneği.
                                </p>
                            </AccordionItem>
                        </Accordion>
                    </div>

                    <div>
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Doldurulmuş Varyant</h4>
                        <Accordion variant="filled">
                            <AccordionItem title="Doldurulmuş Başlık">
                                <p className="text-gray-700 dark:text-gray-300">
                                    Bu varyant, hafif renkli bir arka planla gelir ve seçili öğe vurgulanır.
                                </p>
                            </AccordionItem>
                            <AccordionItem title="Başka Bir Başlık">
                                <p className="text-gray-700 dark:text-gray-300">
                                    Doldurulmuş varyant için bir başka içerik örneği.
                                </p>
                            </AccordionItem>
                        </Accordion>
                    </div>

                    <div>
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Ayrık Varyant</h4>
                        <Accordion variant="separated">
                            <AccordionItem title="Ayrık Öğe Başlığı">
                                <p className="text-gray-700 dark:text-gray-300">
                                    Bu varyant her öğeyi ayrı bir kart olarak gösterir, aralarında boşluk vardır.
                                </p>
                            </AccordionItem>
                            <AccordionItem title="Diğer Ayrık Öğe">
                                <p className="text-gray-700 dark:text-gray-300">
                                    Ayrık varyant için bir başka içerik örneği.
                                </p>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            </Panel>

            <Panel
                title="İkonsuz Özellikler"
                variant="elevated"
                className="mb-6"
            >
                <div className="space-y-6">
                    <Accordion variant="default" bordered={false}>
                        <AccordionItem
                            title="İkonlar ve Özel İçerik"
                            icon={
                                <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            }
                        >
                            <p className="text-gray-700 dark:text-gray-300">
                                Bu öğede başlığın yanında bir ikon bulunuyor. Accordion öğeleri
                                ikonlar, resimler ve özel içeriklerle zenginleştirilebilir.
                            </p>
                        </AccordionItem>
                        <AccordionItem
                            title="Devre Dışı Öğe"
                            disabled={true}
                        >
                            <p className="text-gray-700 dark:text-gray-300">
                                Bu içerik devre dışı olduğu için görüntülenmeyecek.
                            </p>
                        </AccordionItem>
                        <AccordionItem
                            title="Özel İçerik"
                            expandIcon={
                                <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            }
                            collapseIcon={
                                <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                                </svg>
                            }
                        >
                            <div className="text-gray-700 dark:text-gray-300">
                                <p className="mb-2">Bu öğe özel genişleme/daralma simgeleri kullanıyor.</p>
                                <p>Ayrıca içerikte HTML öğeleri de kullanılabilir:</p>
                                <ul className="list-disc pl-5 mt-2">
                                    <li>Liste öğesi 1</li>
                                    <li>Liste öğesi 2</li>
                                    <li>Liste öğesi 3</li>
                                </ul>
                            </div>
                        </AccordionItem>
                    </Accordion>
                </div>
            </Panel>
        </section>
    );
};

export default AccordionTest;
