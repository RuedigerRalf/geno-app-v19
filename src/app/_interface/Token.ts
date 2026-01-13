export interface Token {
  token: string;
  refreshToken: string;
}

export interface RefreshTokenDto {
  token: string;
  refreshToken: string;
  pylon: string;
}

export interface RefreshTokenRespDto {
  token: string;
  refreshToken: string;
}

export interface TokenUrl {
  token: string;
}
