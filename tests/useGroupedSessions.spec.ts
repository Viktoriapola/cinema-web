import { ref } from 'vue';
import { describe, it, expect } from 'vitest';
import { useGroupedSessions } from '../composables/useGroupedSessions';

vi.mock('../utils/common', () => ({
    getDate: (date: string) => date.split('T')[0]
}));

interface Session {
    id: number;
    startTime: string;
    cinemaId: number;
    movieId: number;
}

describe('useGroupedSessions', () => {
    it('группирует сеансы по дате и cinemaId', () => {
        const sessions = ref<Session[]>([
            { id: 1, startTime: '2025-10-17T07:00:00.000Z', cinemaId: 1, movieId: 1 },
            { id: 2, startTime: '2025-10-17T10:45:00.000Z', cinemaId: 1, movieId: 1 },
            { id: 3, startTime: '2025-10-17T12:30:00.000Z', cinemaId: 2, movieId: 1 }
        ]);

        const grouped = useGroupedSessions('cinemaId', sessions);

        const result = grouped.value ?? {};

        expect(Object.keys(result)).toEqual(['2025-10-17']);
        expect(Object.keys(result['2025-10-17'] ?? {})).toEqual(['1', '2']);

        expect(result['2025-10-17']?.['1']).toHaveLength(2);
        expect(result['2025-10-17']?.['2']).toHaveLength(1);
    });

    it('возвращает пустой объект, если данных нет', () => {
        const sessions = ref<Session[] | undefined>(undefined);
        const grouped = useGroupedSessions('cinemaId', sessions);

        expect(grouped.value).toEqual({});
    });
});
