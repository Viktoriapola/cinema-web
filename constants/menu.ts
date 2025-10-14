import type { MenuItem } from '@/types/menu';

export const MENU: MenuItem[] = [
    {
        key: 'movies',
        name: 'Movies',
        path: '/',
        isAllowedWithoutAuth: true
    },
    {
        key: 'cinemas',
        name: 'Cinemas',
        path: '/cinemas',
        isAllowedWithoutAuth: true
    },
    {
        key: 'tickets',
        name: 'Tickets',
        path: '/tickets',
        isAllowedWithoutAuth: false
    }
];