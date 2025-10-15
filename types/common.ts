export interface IErrorResponse<T> {
    data: T;
}

export interface ISeat {
    rows: number;
    seatsPerRow: number;
}

export interface IBookedSeat {
    rowNumber: number;
    seatNumber: number;
}

