export interface TokenServiceInterface {
  // -> ACCESS TOKEN
  saveAccessToken(token: string): void;
  getAccessToken(): string;
  clearAccessToken(): void;

  // -> REFRESH TOKEN
  saveRefreshToken(token: string): void;
  getRefreshToken(): string;
  clearRefreshToken(): void;
}
