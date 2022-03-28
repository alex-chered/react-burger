import { UserModel } from 'models';

export interface IRegisterResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: UserModel;
  message: string; // for the non-success case
}
