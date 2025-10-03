import React from "react";

interface TimelineDotProps {
    animated?: boolean;
    visible?: boolean;
    className?: string;
}

export const TimelineDot: React.FC<TimelineDotProps> = ({
    animated = false,
    visible = true,
    className = ""
}) => {
    return (
        <div
            className={`absolute left-2 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg ${
                animated ? `transition-all duration-500 ${visible ? 'scale-100' : 'scale-0'}` : ''
            } ${className}`}
        />
    );
};

interface TimelineLineProps {
    className?: string;
}

export const TimelineLine: React.FC<TimelineLineProps> = ({ className = "" }) => {
    return (
        <div className={`absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-primary-dark ${className}`} />
    );
};
