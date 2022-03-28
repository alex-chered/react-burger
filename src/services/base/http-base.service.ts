// third-party libraries
import axios, { AxiosInstance } from 'axios';

// SERVICE
export abstract class HttpBaseService {
  protected readonly axiosInstance: AxiosInstance;

  protected readonly baseUrl: string;

  // CONSTRUCTOR
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;

    // Initialize base settings of axios instance
    this.axiosInstance = axios.create({
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      baseURL: this.baseUrl
    });
  }
}
