import type { MenuItem } from '@/types/menu';

export const MENU: MenuItem[] = [
    {
        key: 'movies',
        name: 'Фильмы',
        path: '/',
        isAllowedWithoutAuth: true
    },
    {
        key: 'cinemas',
        name: 'Кинотеатры',
        path: '/cinemas',
        isAllowedWithoutAuth: true
    },
    {
        key: 'tickets',
        name: 'Мои билеты',
        path: '/tickets',
        isAllowedWithoutAuth: false
    }
];