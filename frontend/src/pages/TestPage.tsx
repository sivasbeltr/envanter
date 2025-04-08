import React from 'react';
import { TabBar } from '../components/common/TabBar';
import { TabPage } from '../components/common/TabPage';
import ButtonTest from './test/ButtonTest';
import DialogTest from './test/DialogTest';
import InputTest from './test/InputTest';
import { ToastProvider } from '../context/ToastContext';
import ToastTest from './test/ToastTest';
import AccordionTest from './test/AccordionTest';
import CardTest from './test/CardTest';
import TimelineTest from './test/TimelineTest';
import StepperTest from './test/StepperTest';
import ChartTest from './test/ChartTest';
import PickerDialogTest from './test/input/PickerDialogTest';
import RangeSliderTest from './test/RangeSliderTest';
import ComponentsOverviewTest from './test/ComponentsOverviewTest';
import {
    Squares2X2Icon,
    CursorArrowRaysIcon,
    ExclamationTriangleIcon,
    BellIcon,
    DocumentTextIcon,
    ChartBarIcon,
    Bars3Icon,
    WindowIcon,
    ClockIcon,
    QueueListIcon,
    AdjustmentsHorizontalIcon,
    ArrowsUpDownIcon
} from '@heroicons/react/24/solid';
import TreeTest from './test/TreeTest';

/**
 * Test page component to demonstrate various UI components
 */
const TestPage: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Komponent Test Sayfası</h1>

            {/* Main tabs using the fixed parent-child structure */}
            <TabBar className="mb-6">
                <TabPage value="buttons" label="Buton Örnekleri" icon={<CursorArrowRaysIcon className="w-4 h-4" />}>
                    <ButtonTest />
                </TabPage>

                <TabPage value="dialogs" label="Uyarı Diyalogları" icon={<ExclamationTriangleIcon className="w-4 h-4" />}>
                    <DialogTest />
                </TabPage>

                <TabPage value="toasts" label="Toast Bildirimleri" icon={<BellIcon className="w-4 h-4" />}>
                    {/* Wrap the ToastTest component with its own ToastProvider */}
                    <ToastProvider position="top-right" maxToasts={5}>
                        <ToastTest />
                    </ToastProvider>
                </TabPage>

                <TabPage value="inputs" label="Form Bileşenleri" icon={<DocumentTextIcon className="w-4 h-4" />}>
                    <InputTest />
                </TabPage>

                <TabPage value="charts" label="Grafikler" icon={<ChartBarIcon className="w-4 h-4" />}>
                    <ChartTest />
                </TabPage>

                <TabPage value="accordions" label="Accordion" icon={<Bars3Icon className="w-4 h-4" />}>
                    <AccordionTest />
                </TabPage>

                <TabPage value="cards" label="Kartlar" icon={<WindowIcon className="w-4 h-4" />}>
                    <CardTest />
                </TabPage>

                <TabPage value="timeline" label="Timeline" icon={<ClockIcon className="w-4 h-4" />}>
                    <TimelineTest />
                </TabPage>

                <TabPage value="stepper" label="Stepper" icon={<QueueListIcon className="w-4 h-4" />}>
                    <StepperTest />
                </TabPage>

                <TabPage value="pickers" label="Seçiciler" icon={<AdjustmentsHorizontalIcon className="w-4 h-4" />}>
                    <PickerDialogTest />
                </TabPage>

                <TabPage value="rangesliders" label="Aralık Seçiciler" icon={<ArrowsUpDownIcon className="w-4 h-4" />}>
                    <RangeSliderTest />
                </TabPage>
                <TabPage value="tree" label="Ağaç Yapısı" icon={<ArrowsUpDownIcon className="w-4 h-4" />}>
                    <TreeTest />
                </TabPage>

                <TabPage value="overview" label="Diğer Bileşenler" icon={<Squares2X2Icon className="w-4 h-4" />}>
                    <ComponentsOverviewTest />
                </TabPage>
            </TabBar>
        </div>
    );
};

export default TestPage;
