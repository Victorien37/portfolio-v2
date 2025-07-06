import { User } from '@/types';
import { useCallback } from 'react';

export function useInitials() {
    return useCallback((user: User): string => {
        const firstInitial = user.firstname.charAt(0).toUpperCase();
        const lastInitial = user.lastname.charAt(0).toUpperCase();

        return `${firstInitial}${lastInitial}`;
    }, []);
}
