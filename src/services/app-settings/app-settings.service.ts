export class AppSettingsService {
  static getBaseUrl(): string {
    return process.env.REACT_APP_BASE_URL || '';
  }

  static urlSocketFeed(): string {
    return process.env.REACT_APP_BASE_URL_WS_FEED || '';
  }

  static urlSocketOrders(): string {
    return process.env.REACT_APP_BASE_URL_WS_ORDERS || '';
  }
}
