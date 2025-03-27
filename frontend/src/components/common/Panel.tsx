import React from 'react';

/**
 * Props for the Panel component
 */
export interface PanelProps {
    /** The panel's contents */
    children: React.ReactNode;
    /** Panel title */
    title?: React.ReactNode;
    /** Panel subtitle or description */
    subtitle?: React.ReactNode;
    /** Optional footer content */
    footer?: React.ReactNode;
    /** Panel variant that determines the visual style */
    variant?: 'default' | 'outlined' | 'filled' | 'elevated';
    /** Whether to add padding to the content area */
    padded?: boolean;
    /** Whether the panel's header should have bottom border */
    headerBorder?: boolean;
    /** Whether the panel's footer should have top border */
    footerBorder?: boolean;
    /** Additional CSS class names */
    className?: string;
    /** Additional CSS class for the header */
    headerClassName?: string;
    /** Additional CSS class for the content */
    contentClassName?: string;
    /** Additional CSS class for the footer */
    footerClassName?: string;
    /** Additional props to be spread to the container element */
    containerProps?: React.HTMLAttributes<HTMLDivElement>;
    /** Action buttons/elements to display in the header */
    actions?: React.ReactNode;
}

/**
 * A versatile panel component that can be used to group related content with consistent styling.
 * Supports headers, footers, and various visual styles.
 * 
 * @example
 * <Panel 
 *   title="Kullanıcı Bilgileri" 
 *   subtitle="Kullanıcı hakkında temel bilgiler"
 *   variant="elevated"
 *   actions={<Button size="sm">Düzenle</Button>}
 * >
 *   <p>Panel içeriği burada yer alır...</p>
 * </Panel>
 */
export const Panel: React.FC<PanelProps> = ({
    children,
    title,
    subtitle,
    footer,
    variant = 'default',
    padded = true,
    headerBorder = true,
    footerBorder = true,
    className = '',
    headerClassName = '',
    contentClassName = '',
    footerClassName = '',
    containerProps,
    actions,
}) => {
    // Base container classes that are always applied
    const baseContainerClasses = 'rounded-lg overflow-hidden bg-white dark:bg-gray-800';

    // Variant-specific classes
    const variantClasses = {
        default: '',
        outlined: 'border border-gray-200 dark:border-gray-700',
        filled: 'bg-gray-50 dark:bg-gray-800',
        elevated: 'shadow-md',
    };

    // Full container classes
    const containerClasses = `${baseContainerClasses} ${variantClasses[variant]} ${className}`;

    // Header classes
    const hasHeader = !!(title || subtitle || actions);
    const headerClasses = `
        ${hasHeader && headerBorder ? 'border-b border-gray-200 dark:border-gray-700' : ''} 
        ${padded ? 'px-4 py-3 sm:px-6' : 'p-0'}
        ${headerClassName}
    `;

    // Content classes
    const contentClasses = `
        ${padded ? 'p-4 sm:p-6' : 'p-0'}
        ${contentClassName}
    `;

    // Footer classes
    const hasFooter = !!footer;
    const footerClasses = `
        ${hasFooter && footerBorder ? 'border-t border-gray-200 dark:border-gray-700' : ''} 
        ${padded ? 'px-4 py-3 sm:px-6' : 'p-0'}
        ${footerClassName}
    `;

    return (
        <div className={containerClasses} {...containerProps}>
            {/* Panel Header */}
            {hasHeader && (
                <div className={headerClasses}>
                    <div className="flex justify-between items-start">
                        <div>
                            {title && (
                                typeof title === 'string' ? (
                                    <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                                        {title}
                                    </h3>
                                ) : (
                                    title
                                )
                            )}
                            {subtitle && (
                                typeof subtitle === 'string' ? (
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                        {subtitle}
                                    </p>
                                ) : (
                                    subtitle
                                )
                            )}
                        </div>
                        {actions && (
                            <div className="ml-4 flex-shrink-0 flex">
                                {actions}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Panel Content */}
            <div className={contentClasses}>
                {children}
            </div>

            {/* Panel Footer */}
            {hasFooter && (
                <div className={footerClasses}>
                    {footer}
                </div>
            )}
        </div>
    );
};
