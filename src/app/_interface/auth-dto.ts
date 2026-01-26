export interface AuthDto { }

export interface ChangeEmailRequest {
    old_email: string;
    new_email: string;
    pylon: string;
}

export interface ConfirmNewEmailDto {
    token: string;
    value: string;
    pylon: string;
}

export interface ConfirmRegistrationDto {
    token: string;
    userId: string;
    pylon: string;
}

export interface ConfirmterminateMembership {
    token: string;
    userId: string;
    pylon: string;
}

