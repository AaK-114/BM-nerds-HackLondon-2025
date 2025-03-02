
export interface UserData {
  info: {
    username: string;
    password: string;
    preferences: {}
  }
}

// export interface ServerResponse<Type> {
export interface ServerResponse {
  statusText: string;
  status: number;
  message: string;
  data: any
}
// export interface ServerResponse {
// 	statusText: string;
// 	status: number;
// 	message: string;
// 	data: any
// }

export interface LoginResponse {
  statusText: string;
  status: number;
  message: string;
  username: string;
  userMatch: boolean;
  passwordMatch: boolean;
}
// export interface LoginResponse {
// 	statusText: string;
// 	status: number;
// 	message: string;
// 	username: string;
// 	userAuth: boolean;
// 	passwordAuth: boolean;
// 	exists?: boolean
// }

export interface LoginAuth {
  userAuth: boolean;
  passwordAuth: boolean;
}

export type AuthStatus = "authenticated" | "passwordFalse" | "usernameFalse" | "exists"

export type Image = any // change later

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}

export type AuthType = "login" | "create";

export interface LoginData {
  username: string;
  password: string;
  confirmPassword?: string;
  type: AuthType
}

let body = {
  username: "user2",
  password: "pass2"
}
