import type { IBookedSeat, ISeat } from '@/types/common'

export interface ISession {
    id: number
    movieId: number
    cinemaId: number
    startTime: string
    seats: ISeat
    bookedSeats: IBookedSeat[]
}

export interface IBookSessionResponse {
    bookingId: string
}