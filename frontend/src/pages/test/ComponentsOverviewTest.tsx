import React, { useState } from 'react';
import { Panel } from '../../components/common/Panel';
import { TabBar } from '../../components/common/TabBar';
import { TabPage } from '../../components/common/TabPage';
import {
    BellAlertIcon,
    TagIcon,
    ChevronRightIcon,
    CursorArrowRaysIcon,
    PhotoIcon,
    QueueListIcon,
    ListBulletIcon,
    EllipsisHorizontalIcon,
    ChartBarIcon
} from '@heroicons/react/24/solid';

// Import existing test components
import AlertTest from './AlertTest';
import BadgeTest from './BadgeTest';
import BreadcrumbTest from './BreadcrumbTest';
import ButtonTest from './ButtonTest';
import CarouselTest from './CarouselTest';
import DropdownTest from './DropdownTest';
import ListGroupTest from './ListGroupTest';
import PaginationTest from './PaginationTest';
import ProgressTest from './ProgressTest';

/**
 * Test page that showcases all component tests in one place
 */
const ComponentsOverviewTest: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('alerts');

    return (
        <div className="space-y-6">
            <Panel title="Komponent Test Sayfası" variant='elevated'>
                <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Tüm Bileşenler</h1>

                <p className="mb-6 text-gray-600 dark:text-gray-300">
                    Bu sayfa, sistemde mevcut olan tüm UI bileşenlerinin test sayfalarını bir araya getirir.
                    İstediğiniz bileşeni incelemek için aşağıdan seçim yapabilirsiniz.
                </p>

                <TabBar activeTab={activeTab} onTabChange={setActiveTab} className="mb-6">
                    <TabPage value="alerts" label="Alerts" icon={<BellAlertIcon className="w-4 h-4" />}>
                        <Panel title="Alert Bileşenleri" variant="outlined" className="mt-4">
                            <AlertTest />
                        </Panel>
                    </TabPage>

                    <TabPage value="badges" label="Badges" icon={<TagIcon className="w-4 h-4" />}>
                        <Panel title="Badge Bileşenleri" variant="outlined" className="mt-4">
                            <BadgeTest />
                        </Panel>
                    </TabPage>

                    <TabPage value="breadcrumbs" label="Breadcrumbs" icon={<ChevronRightIcon className="w-4 h-4" />}>
                        <Panel title="Breadcrumb Bileşenleri" variant="outlined" className="mt-4">
                            <BreadcrumbTest />
                        </Panel>
                    </TabPage>

                    <TabPage value="buttons" label="Buttons" icon={<CursorArrowRaysIcon className="w-4 h-4" />}>
                        <Panel title="Button Bileşenleri" variant="outlined" className="mt-4">
                            <ButtonTest />
                        </Panel>
                    </TabPage>

                    <TabPage value="carousels" label="Carousels" icon={<PhotoIcon className="w-4 h-4" />}>
                        <Panel title="Carousel Bileşenleri" variant="outlined" className="mt-4">
                            <CarouselTest />
                        </Panel>
                    </TabPage>

                    <TabPage value="dropdowns" label="Dropdowns" icon={<QueueListIcon className="w-4 h-4" />}>
                        <Panel title="Dropdown Bileşenleri" variant="outlined" className="mt-4">
                            <DropdownTest />
                        </Panel>
                    </TabPage>

                    <TabPage value="listgroups" label="List Groups" icon={<ListBulletIcon className="w-4 h-4" />}>
                        <Panel title="List Group Bileşenleri" variant="outlined" className="mt-4">
                            <ListGroupTest />
                        </Panel>
                    </TabPage>

                    <TabPage value="paginations" label="Pagination" icon={<EllipsisHorizontalIcon className="w-4 h-4" />}>
                        <Panel title="Pagination Bileşenleri" variant="outlined" className="mt-4">
                            <PaginationTest />
                        </Panel>
                    </TabPage>

                    <TabPage value="progress" label="Progress" icon={<ChartBarIcon className="w-4 h-4" />}>
                        <Panel title="Progress Bileşenleri" variant="outlined" className="mt-4">
                            <ProgressTest />
                        </Panel>
                    </TabPage>
                </TabBar>
            </Panel>
        </div>
    );
};

export default ComponentsOverviewTest;
