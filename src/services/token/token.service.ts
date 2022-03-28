// third-party libraries
import Cookies from 'js-cookie';
// types
import { TokenServiceInterface } from 'services/base';

// SERVICE
class TokenService implements TokenServiceInterface {
  // Stores the access token prefix in storage
  private accessTokenPrefix = 'Bearer';

  // Stores the access token name in storage
  private accessTokenName = 'accessToken';

  // Stores the refresh token name in storage
  private refreshTokenName = 'refreshToken';

  // -> ACCESS TOKEN
  private extractToken(token: string): string {
    if (token.indexOf(this.accessTokenPrefix) === 0) {
      return token.split(`${this.accessTokenPrefix} `)[1];
    }
    return token;
  }

  public saveAccessToken(token: string): void {
    const inThirtyDays = new Date(new Date().getTime() + 30 * 60 * 60 * 1000);
    Cookies.set(
      this.accessTokenName,
      this.extractToken(token),
      { expires: inThirtyDays }
    );
  }

  public getAccessToken(): string {
    return Cookies.get(this.accessTokenName) || '';
  }

  public clearAccessToken(): void {
    Cookies.remove(this.accessTokenName);
  }

  // -> REFRESH TOKEN
  public saveRefreshToken(token: string): void {
    localStorage.setItem(this.refreshTokenName, token);
  }

  public getRefreshToken(): string {
    return localStorage.getItem(this.refreshTokenName) || '';
  }

  public clearRefreshToken(): void {
    localStorage.removeItem(this.refreshTokenName);
  }
}

// Create tokenService instance
export const tokenService = new TokenService();
