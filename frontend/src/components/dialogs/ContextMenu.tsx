import React, { useEffect, useRef } from 'react';

export interface ContextMenuItem {
    id: string;
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
    divider?: boolean;
    variant?: 'default' | 'danger';
}

interface ContextMenuProps {
    items: ContextMenuItem[];
    x: number;
    y: number;
    onClose: () => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ items, x, y, onClose }) => {
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [onClose]);

    // Adjust position to ensure menu stays within viewport
    const adjustedPosition = () => {
        if (typeof window === 'undefined') {
            return { left: x, top: y };
        }

        const menuWidth = 220; // Approximate width of the menu
        const menuHeight = items.length * 36 + 16; // Approximate height based on items

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        const left = x + menuWidth > viewportWidth ? x - menuWidth : x;
        const top = y + menuHeight > viewportHeight ? y - menuHeight : y;

        return {
            left: Math.max(0, left),
            top: Math.max(0, top)
        };
    };

    const position = adjustedPosition();

    return (
        <div
            ref={menuRef}
            className="absolute bg-white dark:bg-gray-800 shadow-lg rounded-md py-2 z-50 min-w-[180px] max-w-[300px] border border-gray-200 dark:border-gray-700"
            style={{
                left: position.left,
                top: position.top
            }}
        >
            <ul className="list-none m-0 p-0">
                {items.map((item, index) => (
                    <React.Fragment key={item.id || index}>
                        <li>
                            <button
                                onClick={() => {
                                    onClose();
                                    item.onClick();
                                }}
                                disabled={item.disabled}
                                className={`w-full text-left px-4 py-2 flex items-center hover:bg-gray-100 dark:hover:bg-gray-700 
                           ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                           ${item.variant === 'danger' ? 'text-red-600 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'}`}
                            >
                                {item.icon && <span className="inline-block mr-2 w-5">{item.icon}</span>}
                                <span>{item.label}</span>
                            </button>
                        </li>
                        {item.divider && index < items.length - 1 && (
                            <li className="border-b border-gray-200 dark:border-gray-700 my-1"></li>
                        )}
                    </React.Fragment>
                ))}
            </ul>
        </div>
    );
};
