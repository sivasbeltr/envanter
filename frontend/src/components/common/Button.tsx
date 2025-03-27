import React from 'react';

/**
 * Button variants that determine the visual style
 */
export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

/**
 * Button sizes for different UI contexts
 */
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Props for the Button component
 */
export interface ButtonProps {
    /** The button's children/label */
    children: React.ReactNode;
    /** The button's variant that determines the visual style */
    variant?: ButtonVariant;
    /** The button's size */
    size?: ButtonSize;
    /** Whether the button is in loading state */
    isLoading?: boolean;
    /** Whether the button is disabled */
    disabled?: boolean;
    /** The button's type attribute */
    type?: 'button' | 'submit' | 'reset';
    /** Additional CSS class names */
    className?: string;
    /** Click handler for the button */
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    /** Full width button */
    fullWidth?: boolean;
    /** Icon to display before the button text */
    startIcon?: React.ReactNode;
    /** Icon to display after the button text */
    endIcon?: React.ReactNode;
}

/**
 * A customizable button component that supports different variants, sizes, and states.
 * 
 * @example
 * <Button variant="primary" size="md" onClick={handleClick}>
 *   Click Me
 * </Button>
 */
export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    disabled = false,
    type = 'button',
    className = '',
    onClick,
    fullWidth = false,
    startIcon,
    endIcon,
}) => {
    // Base classes for all buttons
    const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

    // Classes based on variant
    const variantClasses = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600',
        success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
        warning: 'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-500',
        info: 'bg-cyan-500 text-white hover:bg-cyan-600 focus:ring-cyan-500',
    };

    // Classes based on size
    const sizeClasses = {
        sm: 'px-3 py-1 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
    };

    // Classes for disabled state
    const disabledClasses = disabled || isLoading
        ? 'opacity-60 cursor-not-allowed'
        : 'cursor-pointer';

    // Classes for full width
    const widthClasses = fullWidth ? 'w-full' : '';

    // Combine all classes
    const buttonClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${disabledClasses}
    ${widthClasses}
    ${className}
  `;

    return (
        <button
            type={type}
            className={buttonClasses}
            onClick={onClick}
            disabled={disabled || isLoading}
        >
            {isLoading ? (
                <div className="mr-2">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
            ) : startIcon ? (
                <span className="mr-2">{startIcon}</span>
            ) : null}

            {children}

            {endIcon && !isLoading && <span className="ml-2">{endIcon}</span>}
        </button>
    );
};
