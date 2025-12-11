// src/types/auth.ts
export interface LoginCredentials {
    username: string;
    password: string;
}

export interface ChangePasswordData {
    old_password: string;
    new_password: string;
}

export interface RegisterData {
    password: string;
    username: string;
}

export interface AuthTokens {
    access_token: string;
    refresh_token: string;
}

export interface User {
    name: string;
    id: string;
    role: string;
    username: string;
    email?: string;
    phone?: string;
}

export interface AuthData {
    user: User;
    tokens: AuthTokens;
}
