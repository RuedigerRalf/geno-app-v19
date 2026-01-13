export interface ConfirmEmailDto {
    token: string;
    userId: string;
    pylon: string;
}

export interface ConfirmDto {
    token: string;
    userId: string;
    pylon: string;
}

export interface ResetEmailDto {
    old_email: string;
    new_email: string;
}

export interface ConfirmNewEmailDto {
    token: string;
    old_email: string;
    new_email: string;
    pylon: string;
}
