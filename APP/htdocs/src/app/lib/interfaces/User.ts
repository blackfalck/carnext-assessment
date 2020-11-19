export interface User {
  id: number;
  email: string;
  name: string;
  currentToken?: string;
  active: boolean;
}

export interface UserLogin {
  token: string;
}
