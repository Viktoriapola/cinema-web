import type { IBookedSeat } from '@/types/common';

export interface IUserInfoBooking {
    id: string;
    userId: number;
    movieSessionId: number;
    sessionId: number;
    bookedAt: string;
    seats: IBookedSeat[];
    isPaid: boolean;
}
