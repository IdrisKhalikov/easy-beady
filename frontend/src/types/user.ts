export type User = {
    username: string;
    avatarUrl: string;
}

export enum AuthorizationStatus {
    Auth = 'AUTH',
    NoAuth = 'NO_AUTH',
    Unknown = 'UNKNOWN'
}

export type AuthCheckResult = {
  isAuthorized: true;
  authInfo: User;
} | {
  isAuthorized: false;
  authInfo: null;
}