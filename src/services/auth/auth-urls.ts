export interface AuthUrlsInterface {
  // login url
  urlLogin: string;
  // register url
  urlRegister: string;
  // logout url
  urlLogout: string;
  // update token url
  urlToken: string;
  // user url
  urlUser: string;
  // forget password url
  urlForgetPassword: string;
  // reset password url
  urlResetPassword: string
}

export const authUrls = {
  // register url
  urlRegister: '/api/auth/register',
  // login url
  urlLogin: '/api/auth/login',
  // logout url
  urlLogout: '/api/auth/logout',
  // update token url
  urlToken: '/api/auth/token',
  // user url
  urlUser: '/api/auth/user',
  // forget password url
  urlForgetPassword: '/api/password-reset',
  // reset password url
  urlResetPassword: 'api/password-reset/reset'
};
