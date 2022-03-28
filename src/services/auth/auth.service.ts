/* eslint-disable class-methods-use-this */

// third-party libraries
import { AxiosError } from 'axios';
// services
import { HttpBaseTokenService, TokenServiceInterface } from 'services/base';
import { AppSettingsService } from 'services/app-settings';
import { tokenService as tokenServiceExternal } from 'services/token';
// utils
import { instanceOfAxiosError } from 'utils';
// types
import { UserModel } from 'models';
// aux.
import {
  ILoginResponse,
  IRegisterResponse,
  IGetUserResponse,
  ILogoutResponse,
  IUpdateUserResponse,
  IUpdateTokenResponse,
  IForgetPasswordResponse,
  IResetPasswordResponse
} from './types';
import { AuthError } from './errors';
import { ParameterNotValidatedError } from '../parameter-not-validated.error';
import { AuthUrlsInterface, authUrls } from './auth-urls';

// Auxiliary interface used to infer an axios response data
// to type with the message field
interface WithMessageResponseInterface {
  message: string
}

// SERVICE
class AuthService extends HttpBaseTokenService {
  private urls: AuthUrlsInterface;

  // CONSTRUCTOR
  constructor(
    baseUrl: string,
    tokenService: TokenServiceInterface,
    urls: AuthUrlsInterface
  ) {
    super(baseUrl, tokenService);
    this.urls = urls;
  }

  protected async refreshToken(): Promise<void> {
    // Get the refresh token
    const refreshToken = this.tokenService.getRefreshToken();

    // Do a request
    const { data } = await this.axiosInstance.post<IUpdateTokenResponse>(
      this.urls.urlToken,
      JSON.stringify({ token: refreshToken })
    );

    if (!data.success) {
      throw new AuthError('Не удалось обновить токен.');
    }

    this.tokenService.saveAccessToken(data.accessToken);
    this.tokenService.saveRefreshToken(data.refreshToken);
  }

  // The method extracts a message from the error object and returns it
  //
  private getMessageFromError(err: unknown, defaultMessage: string): string {
    let msg = defaultMessage;

    if (err instanceof ParameterNotValidatedError) {
      msg = err.message;
    } else if (err instanceof AuthError) {
      msg = err.message;

    // Try to get message from the axios response data
    } else if (instanceOfAxiosError((err as AxiosError))) {
      //
      const axiosResponse = (err as AxiosError).response;
      let axiosMessage = (axiosResponse?.data as WithMessageResponseInterface).message;
      axiosMessage = axiosMessage || defaultMessage;

      if (axiosMessage.toLowerCase() === 'email or password are incorrect') {
        msg = 'Email или пароль введены неверно.';
      } else if (axiosMessage.toLowerCase() === 'user already exists') {
        msg = 'Пользователь с таким Email уже зарегистрирован.';
      }
    }

    return msg;
  }

  // LOGIN
  public async login(user: UserModel): Promise<UserModel> {
    const defaultMessage = 'Не удалось авторизоваться в системе.';

    try {
      let msg = '';
      // Check the email
      if (!user.email.trim()) {
        msg += 'Не заполнен "Email".;';
      }
      // Check the password
      if (!user.password.trim()) {
        msg += 'Не заполнен "Пароль".;';
      }
      // Throw an error, if any field isn't filled in
      if (msg) {
        throw new ParameterNotValidatedError(msg);
      }

      // Do the request
      const { data } = await this.axiosInstance.post<ILoginResponse>(
        this.urls.urlLogin,
        JSON.stringify({
          email: user.email,
          password: user.password
        })
      );

      // Save access token in cookies
      this.tokenService.saveAccessToken(data.accessToken);
      // Save refresh token in the local storage
      this.tokenService.saveRefreshToken(data.refreshToken);

      const { user: { name, email }, accessToken } = data;

      // Return an user object
      return {
        name,
        email,
        password: '',
        token: accessToken
      };
    } catch (err: unknown) {
      throw new AuthError(this.getMessageFromError(err, defaultMessage));
    }
  }

  // REGISTER
  public async register(user: UserModel): Promise<UserModel> {
    const defaultMessage = 'Не удалось создать пользователя.';

    try {
      let msg = '';
      // Check the name
      if (!user.name.trim()) {
        msg += 'Не заполнено "Имя пользователя".;';
      }
      // Check the email
      if (!user.email.trim()) {
        msg += 'Не заполнен "Email".;';
      }
      // Check the password
      if (!user.password.trim()) {
        msg += 'Не заполнен "Пароль".;';
      }
      // Throw an error, if any field isn't filled in
      if (msg) {
        throw new ParameterNotValidatedError(msg);
      }

      // Do the request
      const { data } = await this.axiosInstance.post<IRegisterResponse>(
        this.urls.urlRegister,
        JSON.stringify({
          email: user.email,
          password: user.password,
          name: user.name
        })
      );

      // Save access token in cookies
      this.tokenService.saveAccessToken(data.accessToken);
      // Save refresh token in local storage
      this.tokenService.saveRefreshToken(data.refreshToken);

      const { user: { name, email }, accessToken } = data;

      // Return an user object
      return {
        name,
        email,
        password: '',
        token: accessToken
      };
    } catch (err) {
      throw new AuthError(this.getMessageFromError(err, defaultMessage));
    }
  }

  // LOGOUT
  public async logout(): Promise<boolean> {
    const defaultMessage = 'При выходе из системы произошла ошибка.';

    // Get the refresh token
    const refreshToken = this.tokenService.getRefreshToken();

    try {
      // Throw an error, if token isn't provided
      if (!refreshToken.trim()) {
        throw new ParameterNotValidatedError('Не указан токен для выхода из системы.');
      }

      // Do the request
      await this.axiosInstance.post<ILogoutResponse>(
        this.urls.urlLogout,
        JSON.stringify({
          token: refreshToken
        })
      );

      // Remove access token in cookies
      this.tokenService.clearAccessToken();
      // Remove refresh token in local storage
      this.tokenService.clearRefreshToken();

      // Return true
      return true;
    } catch (err) {
      throw new AuthError(this.getMessageFromError(err, defaultMessage));
    }
  }

  // UPDATE USER
  public async updateUser(user: UserModel): Promise<UserModel> {
    const defaultMessage = 'Не удалось обновить информацию о пользователе.';

    // Copy the user object to the new variable
    const newUser: Record<string, unknown> = {
      ...user
    };
    // If password isn't changed, it will be empty.
    // So no need to pass the one to the request
    if (newUser.password) {
      delete newUser.password;
    }

    try {
      // Do the request
      const { data } = await this.axiosInstance.patch<IUpdateUserResponse>(
        this.urls.urlUser,
        JSON.stringify(newUser)
      );

      // Get the access token
      const token = this.tokenService.getAccessToken();

      // Return an user object
      return {
        name: data.user.name,
        email: data.user.email,
        token,
        password: '' // We don't have to save a password in the store,
        // so we pass the empty value
      };
    } catch (err) {
      throw new AuthError(this.getMessageFromError(err, defaultMessage));
    }
  }

  // GET USER
  public async getUser(): Promise<UserModel> {
    const defaultMessage = 'При получении пользователя произошла ошибка.';
    // Get the access token
    const accessToken = this.tokenService.getAccessToken();

    try {
      // Throw an error, if token isn't provided
      if (!accessToken.trim()) {
        throw new ParameterNotValidatedError('Не указан токен для получения пользователя.');
      }

      // Do the request
      const { data } = await this.axiosInstance.get<IGetUserResponse>(
        this.urls.urlUser,
        {
          headers: {
            needUpdateToken: true
          }
        }
      );

      // Get the access token
      const token = this.tokenService.getAccessToken();

      // Return an user object
      return {
        name: data.user.name,
        email: data.user.email,
        token,
        password: '',
      };
    } catch (err) {
      throw new AuthError(this.getMessageFromError(err, defaultMessage));
    }
  }

  // FORGET PASSWORD
  public async forgetPassword(email: string): Promise<boolean> {
    const defaultMessage = 'При попытке восстановить пароль произошла ошибка.';

    try {
      let msg = '';
      // Check the email
      if (!email.trim()) {
        msg += 'Не заполнен "Email".;';
      }
      // Throw an error, if any field isn't filled in
      if (msg) {
        throw new ParameterNotValidatedError(msg);
      }

      // Do the request
      const { data } = await this.axiosInstance.post<IForgetPasswordResponse>(
        this.urls.urlForgetPassword,
        JSON.stringify({
          email
        })
      );

      // Request wasn't successful
      if (!data.success) {
        throw new AuthError(defaultMessage);
      }

      // If all is OK, return true
      return true;
    } catch (err: unknown) {
      throw new AuthError(this.getMessageFromError(err, defaultMessage));
    }
  }

  // RESET PASSWORD
  public async resetPassword(password: string, code: string): Promise<boolean> {
    const defaultMessage = 'При попытке восстановить пароль произошла ошибка.';

    try {
      let msg = '';
      // Check the password
      if (!password.trim()) {
        msg += 'Не заполнен "Пароль".;';
      }
      // Check the code
      if (!code.trim()) {
        msg += 'Не задан код восстановления.;';
      }
      // Throw an error, if any field isn't filled in
      if (msg) {
        throw new ParameterNotValidatedError(msg);
      }

      // Do the request
      const { data } = await this.axiosInstance.post<IResetPasswordResponse>(
        this.urls.urlResetPassword,
        JSON.stringify({
          password,
          token: code
        })
      );

      // Request wasn't successful
      if (!data.success) {
        throw new AuthError(defaultMessage);
      }

      // If all is OK, return true
      return true;
    } catch (err: unknown) {
      throw new AuthError(this.getMessageFromError(err, defaultMessage));
    }
  }
}

// Create service
export const authService = new AuthService(
  AppSettingsService.getBaseUrl(),
  tokenServiceExternal,
  authUrls
);
