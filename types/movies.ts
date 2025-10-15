export interface IMovie {
    id: number;
    title: string;
    description: string;
    year: number;
    lengthMinutes: number;
    posterImage: string;
    rating: number;
}

export interface IMovieSession {
    id: number;
    idmovieId: number;
    cinemaId: number;
    startTime: string;
}
