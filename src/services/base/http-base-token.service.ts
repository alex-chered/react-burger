/* eslint-disable no-param-reassign */

import { AxiosRequestConfig, AxiosError } from 'axios';
// aux.
import { HttpBaseService } from './http-base.service';
import { TokenServiceInterface } from './token.service';

export abstract class HttpBaseTokenService extends HttpBaseService {
  protected readonly tokenService: TokenServiceInterface;

  // CONSTRUCTOR
  constructor(baseUrl: string, tokenService: TokenServiceInterface) {
    super(baseUrl);

    this.tokenService = tokenService;

    // Set interceptors
    this.setRequestInterceptors();
    this.setReposnseInterceptors();
  }

  // The method realizes the token refreshing.
  // Every inherited class has to make its own realization
  protected abstract refreshToken(): void;

  // The method sets request interceptors
  private setRequestInterceptors(): void {
    this.axiosInstance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        config.headers.authorization = `Bearer ${this.tokenService.getAccessToken()}`;
        config.headers.isRetry = false;
        return config;
      }
    );
  }

  // The method sets response interceptors
  private setReposnseInterceptors(): void {
    this.axiosInstance.interceptors.response.use(
      (config) => config,
      async (error: AxiosError) => {
        // Save an original request
        const originalRequest = error.config;
        // Determine if it's retry or the first request
        const isRetry = Boolean(originalRequest.headers?.isRetry || false);
        // Determine if need to update token
        const { needUpdateToken = false } = originalRequest.headers;

        // Do the token refreshing,
        // if the conditions are met
        if (error.response?.status === 403 && originalRequest && !isRetry && needUpdateToken) {
          originalRequest.headers.isRetry = true;
          await this.refreshToken();
          return this.axiosInstance.request(originalRequest);
        }
        throw error;
      }
    );
  }
}
