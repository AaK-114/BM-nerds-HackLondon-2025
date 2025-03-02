//
// export interface UserData {
//   info: {
//     username: string;
//     password: string;
//     preferences: {}
//   }
// }

// export interface ServerResponse<Type> {
export interface ServerResponse {
  statusText: string;
  status: number;
  message: string;
  data: userDataExport | PoliticianPublicData;
}

export interface userDataExport {
  username: string;
  constituency: string;
  yayPeople: PoliticianPublicData[];
  maybePeople: PoliticianPublicData[];
  nayPeople: PoliticianPublicData[];

  topicPosts: PoliticianPublicData[];
}

export interface PoliticianPublicData {
  politicianID: string;
  profile: {
    name: string;
    photo: string;
    bio?: string;
    party: string;
    constituency: string;
    roleTitle: string;
    locality?: string;
  };
  logs: Log[];
  policies?: string[];
}

export interface Log {
  logID: string;
  logText: string;
  logDate: string;
  logTime: string;
  logImages: Image[];
  topicIDs: string[];
}

export interface Image {
  ImageID: string;
  ImageData: string;
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
