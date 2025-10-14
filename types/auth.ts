export interface AuthForm {
    username: string;
    password: string;
}

export interface AuthResponse {
    token: string;
}

export interface AuthResponseError {
    message?: string;
    error?: string;
}
