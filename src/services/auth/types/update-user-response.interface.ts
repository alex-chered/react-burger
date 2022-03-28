import { UserModel } from 'models';

export interface IUpdateUserResponse {
  success: boolean,
  user: UserModel,
  message: string
}
