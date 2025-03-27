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

/**
 * Test page component to demonstrate various UI components
 */
const TestPage: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Komponent Test Sayfası</h1>

            {/* Main tabs using the fixed parent-child structure */}
            <TabBar defaultActiveTab="buttons" className="mb-6">
                <TabPage value="buttons" label="Buton Örnekleri">
                    <ButtonTest />
                </TabPage>

                <TabPage value="dialogs" label="Uyarı Diyalogları">
                    <DialogTest />
                </TabPage>

                <TabPage value="toasts" label="Toast Bildirimleri">
                    {/* Wrap the ToastTest component with its own ToastProvider */}
                    <ToastProvider position="top-right" maxToasts={5}>
                        <ToastTest />
                    </ToastProvider>
                </TabPage>

                <TabPage value="inputs" label="Form Bileşenleri">
                    <InputTest />
                </TabPage>

                <TabPage value="accordions" label="Accordion">
                    <AccordionTest />
                </TabPage>

                <TabPage value="cards" label="Kartlar">
                    <CardTest />
                </TabPage>

                <TabPage value="timeline" label="Timeline">
                    <TimelineTest />
                </TabPage>
                <TabPage value="stepper" label="Stepper">
                    <StepperTest />
                </TabPage>
            </TabBar>
        </div>
    );
};

export default TestPage;
