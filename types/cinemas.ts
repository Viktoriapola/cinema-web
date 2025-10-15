export interface ICinema {
    id: number;
    name: string;
    address: string;
}

export interface ICinemaSession {
    id: number;
    movieId: number;
    cinemaId: number;
    startTime: string;
}