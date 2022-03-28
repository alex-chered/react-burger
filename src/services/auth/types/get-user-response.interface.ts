import { UserModel } from 'models';

export interface IGetUserResponse {
  success: boolean;
  user: UserModel;
  message: string;
}
