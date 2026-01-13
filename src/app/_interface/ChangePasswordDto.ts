export interface ChangePasswordDto {
    token: string;
    userId: string;
    password: string;
    pylon: string;
}