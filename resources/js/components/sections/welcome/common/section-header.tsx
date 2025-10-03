import React from "react";

interface SectionHeaderProps {
    title: string | React.ReactNode;
    subtitle?: string;
    centered?: boolean;
    className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
    title,
    subtitle,
    centered = true,
    className = ""
}) => {
    return (
        <div className={`mb-16 ${centered ? 'text-center' : ''} ${className}`}>
            <h2 className="text-4xl font-bold mb-4 break-words">
                {title}
            </h2>
            <div className={`w-24 h-1 bg-primary ${centered ? 'mx-auto' : ''}`}></div>
            {subtitle && (
                <p className="text-xl text-secondary max-w-2xl mx-auto mt-6 break-words">
                    {subtitle}
                </p>
            )}
        </div>
    );
};
