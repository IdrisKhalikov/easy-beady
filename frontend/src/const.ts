export enum AppRoute {
  Root = '/',
  Login = '/login',
  Auth = '/auth',
  NotFound = '/not-found',
  Edit = '/edit/:schemaId',
  Do = '/do'
}

export enum ApiRoute {
  Register = '/account/register',
  GoogleLogin = '/account/googleLogin',
  Login = '/account/login',
  AuthInfo = '/account/info',
  Schemas = '/schemas',
  Schema = '/schemas/:id',
  Logout = '/account/logout'
}

export enum NameSpace {
  User = 'User',
  Schemas = 'Schemas',
  Schema = 'Schema',
}

export const BASE_URL = window.location.hostname;

export const APP_URL = `http://${BASE_URL}:3000/`