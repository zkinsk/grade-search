export interface AuthenticationInfo {
  userId: number;
  firstLogin: boolean;
  active: boolean;
  authToken: string;
}

interface LoginResponse {
  success: boolean;
  errorCode: string | null;
  resetToken: string | null;
  authenticationInfo: AuthenticationInfo | null;
}

export interface LoginForm {
  email?: string;
  password?: string;
}

export default LoginResponse;
