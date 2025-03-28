import React from 'react';
import RangeBrush from './RangeBrush';

/**
 * Props for the TimeRangeBrush component
 */
export interface TimeRangeBrushProps {
    /** Minimum time in minutes from midnight (0-1439) */
    minTime?: number;
    /** Maximum time in minutes from midnight (0-1439) */
    maxTime?: number;
    /** Currently selected time range in minutes [startTime, endTime] */
    value: [number, number];
    /** Called when the selected range changes */
    onChange: (value: [number, number]) => void;
    /** Height of the brush area */
    height?: number;
    /** Optional background element (like a mini chart) */
    backgroundElement?: React.ReactNode;
    /** CSS class name */
    className?: string;
    /** Whether the component is disabled */
    disabled?: boolean;
    /** Format for time display (default: 24-hour) */
    use24Hour?: boolean;
    /** Color of the selection area */
    selectionColor?: string;
    /** Opacity of non-selected areas */
    maskOpacity?: number;
    /** Whether to show tooltip while dragging */
    showTooltips?: boolean;
}

/**
 * Time range brush component for selecting a range of times
 * 
 * @example
 * <TimeRangeBrush
 *   value={[480, 1020]} // 8:00 AM to 5:00 PM in minutes
 *   onChange={handleTimeRangeChange}
 * />
 */
const TimeRangeBrush: React.FC<TimeRangeBrushProps> = ({
    minTime = 0,
    maxTime = 1439, // 23:59
    value,
    onChange,
    height = 60,
    backgroundElement,
    className = '',
    disabled = false,
    use24Hour = false,
    selectionColor = 'rgba(59, 130, 246, 0.3)',
    maskOpacity = 0.4,
    showTooltips = true,
}) => {
    // Format a time in minutes to a readable string (HH:MM)
    const formatTime = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;

        if (use24Hour) {
            return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
        } else {
            const period = hours >= 12 ? 'PM' : 'AM';
            const displayHours = hours % 12 || 12; // Convert 0 to 12 for 12AM
            return `${displayHours}:${String(mins).padStart(2, '0')} ${period}`;
        }
    };

    // Calculate duration in hours and minutes
    const getDurationText = ([start, end]: [number, number]) => {
        const durationMinutes = end - start;
        const hours = Math.floor(durationMinutes / 60);
        const minutes = durationMinutes % 60;

        if (hours === 0) {
            return `${minutes} dk`;
        } else if (minutes === 0) {
            return `${hours} sa`;
        } else {
            return `${hours} sa ${minutes} dk`;
        }
    };

    // Create time-scale background
    const renderTimeBackground = () => {
        const hourLines = [];
        const totalHours = Math.floor((maxTime - minTime) / 60);
        const hourWidth = 100 / totalHours;

        for (let h = 0; h <= totalHours; h++) {
            const position = h * hourWidth;
            const hour = Math.floor(minTime / 60) + h;
            const displayHour = use24Hour ? hour : (hour % 12 || 12);
            const period = hour >= 12 ? 'PM' : 'AM';

            hourLines.push(
                <div key={h} className="absolute h-full flex flex-col items-center" style={{ left: `${position}%` }}>
                    <div className="h-full border-l border-gray-300 dark:border-gray-600"></div>
                    <div className="absolute bottom-1 text-xs text-gray-500 dark:text-gray-400 transform -translate-x-1/2">
                        {use24Hour ? displayHour : `${displayHour}${period}`}
                    </div>
                </div>
            );
        }

        return (
            <div className="absolute inset-0">
                {hourLines}
            </div>
        );
    };

    // Custom content to render in the selection area
    const renderSelectionContent = (range: [number, number]) => {
        return (
            <div className="text-xs text-center px-2 py-1 bg-white/80 dark:bg-gray-900/80 rounded text-gray-900 dark:text-white whitespace-nowrap">
                {getDurationText(range)}
            </div>
        );
    };

    return (
        <RangeBrush
            min={minTime}
            max={maxTime}
            value={value}
            onChange={onChange}
            height={height}
            backgroundElement={backgroundElement || renderTimeBackground()}
            formatValue={formatTime}
            className={className}
            disabled={disabled}
            selectionColor={selectionColor}
            maskOpacity={maskOpacity}
            showTooltips={showTooltips}
            renderSelectionContent={renderSelectionContent}
        />
    );
};

export default TimeRangeBrush;
