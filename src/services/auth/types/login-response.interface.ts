import { UserModel } from 'models';

export interface ILoginResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: UserModel;
  message: string; // for the non-success case
}
