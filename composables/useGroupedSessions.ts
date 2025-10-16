import { computed, type Ref } from 'vue';
import { getDate } from '@/utils/common';

export function useGroupedSessions<T extends { startTime: string; [key: string]: any }>(
    groupKey: 'cinemaId' | 'movieId',
    data?: Ref<T[] | undefined>
) {
    return computed(() => {
        const sessions = data?.value || [];

        return sessions.reduce<Record<string, Record<string, T[]>>>((acc, session) => {
            const date = getDate(session.startTime);
            const key = session[groupKey]?.toString();
            if (!key || !date) return acc;

            if (!acc[date]) acc[date] = {};
            if (!acc[date][key]) acc[date][key] = [];

            acc[date][key].push(session);
            return acc;
        }, {});
    });
}
