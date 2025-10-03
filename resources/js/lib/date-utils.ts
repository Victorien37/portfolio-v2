export const getEndDate = (start: string | Date, end?: string | Date | null): string => {
    if (!end) return '';

    const startDate = new Date(start);
    const endDate = new Date(end);

    if (endDate.getFullYear() !== startDate.getFullYear()) {
        return ` - ${endDate.getFullYear()}`;
    }

    return '';
};
