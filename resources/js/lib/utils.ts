import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
export const contracts = ['CDD', 'CDI', 'Alternance'];
export const languages = ['fr', 'en', 'pt'];

const mentions = new Map<string, string>();
mentions.set('assez_bien', 'Assez bien');
mentions.set('bien', 'Bien');
mentions.set('tres_bien', 'Tres bien');
export { mentions };

/** @return date format DD/MM/YYYY */
export const frenchDate = (date: Date): string => {
    return `${date.getDate() < 10 ? '0' : ''}${date.getDate()}/${date.getMonth() + 1 < 10 ? '0' : ''}${date.getMonth() + 1}/${date.getFullYear()}`;
}