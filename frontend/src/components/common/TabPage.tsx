import React from 'react';

/**
 * Props for the TabPage component
 */
export interface TabPageProps {
    /** The value of the tab this page is associated with */
    value: string;
    /** The display label for the tab */
    label: string;
    /** Optional icon for the tab */
    icon?: React.ReactNode;
    /** Whether the tab is disabled */
    disabled?: boolean;
    /** The content of the tab page */
    children: React.ReactNode;
    /** Additional class names */
    className?: string;
}

/**
 * A tab page component that displays content for a specific tab.
 * Designed to be used as a child of TabBar.
 * 
 * @example
 * <TabPage value="tab1" label="First Tab">
 *   <p>Content for tab 1</p>
 * </TabPage>
 */
export const TabPage: React.FC<TabPageProps> = ({
    value,
    children,
    className = '',
}) => {
    return (
        <div
            role="tabpanel"
            aria-labelledby={`tab-${value}`}
            className={`tab-content ${className}`}
        >
            {children}
        </div>
    );
};

// Set display name for component identification by TabBar
TabPage.displayName = 'TabPage';
