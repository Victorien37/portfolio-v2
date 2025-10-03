import React from "react";

interface ContentCardProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    hover?: boolean;
}

export const ContentCard: React.FC<ContentCardProps> = ({
    children,
    onClick,
    className = "",
    hover = true
}) => {
    return (
        <div
            className={`bg-background/50 p-6 rounded-lg border border-secondary/50 max-w-full ${
                hover ? 'hover:border-primary/30 transition-all duration-300' : ''
            } ${onClick ? 'cursor-pointer' : ''} ${className}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
};
