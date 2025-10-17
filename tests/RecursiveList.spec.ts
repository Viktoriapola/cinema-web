/// <reference types="vitest/globals" />
import { render, fireEvent } from '@testing-library/vue';
import RecursiveList from '../components/RecursiveList.vue';

vi.mock('../utils/common', () => ({
    getTime: (date: string) => date.slice(11, 16)
}));

describe('RecursiveList.vue', () => {
    const mockData = {
        '2025-10-17': {
            '1': [
                { id: 1, startTime: '2025-10-17T07:00:00.000Z' },
                { id: 2, startTime: '2025-10-17T10:45:00.000Z' }
            ],
            '2': [{ id: 3, startTime: '2025-10-17T12:30:00.000Z' }]
        }
    };

    it('рендерит дату и заголовки элементов', () => {
        const { getByText } = render(RecursiveList, {
            props: {
                itemName: 'Кинотеатр',
                data: mockData
            }
        });

        getByText('2025-10-17');

        getByText('Кинотеатр: 1');
        getByText('Кинотеатр: 2');
    });

    it('рендерит список сеансов', () => {
        const { getAllByRole, getByText } = render(RecursiveList, {
            props: {
                itemName: 'Кинотеатр',
                data: mockData
            }
        });

        const items = getAllByRole('listitem');
        expect(items.length).toBe(3);

        getByText('07:00');
        getByText('10:45');
        getByText('12:30');
    });

    it('вызывает событие "select" при клике', async () => {
        const { getAllByRole, emitted } = render(RecursiveList, {
            props: {
                itemName: 'Кинотеатр',
                data: mockData
            }
        });

        const items = getAllByRole('listitem');
        expect(items.length).toBeGreaterThan(0);
        await fireEvent.click(items[0]!);

        const events = emitted();
        expect(events).toHaveProperty('select');
        expect(events.select![0]).toEqual([1]);
    });
});
