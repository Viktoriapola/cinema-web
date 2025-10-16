export interface IErrorResponse<T> {
    data: T;
    status: number
}

export interface IErrorResponseData {
    message?: string;
    error?: string;
}

export interface ISeat {
    rows: number;
    seatsPerRow: number;
}

export interface IBookedSeat {
    rowNumber: number;
    seatNumber: number;
}

