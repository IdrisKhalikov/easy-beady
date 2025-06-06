import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../../types/state';
import axios, { AxiosInstance } from 'axios';
import { ApiRoute, AppRoute } from '../../const';
import { redirectToRoute } from '../action';
import { fetchSchemasAction } from './schemas-api-actions';
import { AuthCheckResult, User } from '../../types/user';
import { StatusCodes } from 'http-status-codes';
import { Credentials } from 'types/credentials';

export const checkAuthAction = createAsyncThunk<AuthCheckResult, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<User>(ApiRoute.AuthInfo);
      dispatch(fetchSchemasAction());
      return { isAuthorized: true, authInfo: data };
    } catch (error) {
      if (axios.isAxiosError(error) && error?.response?.status === StatusCodes.UNAUTHORIZED) {
        return { isAuthorized: false, authInfo: null };
      }
      throw error;
    }
  },
);

export const registerAction = createAsyncThunk<void, Credentials, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/register',
  async (credentials, { extra: api }) => {
    await api.post<User>(ApiRoute.Register, credentials);
  },
);

export const loginAction = createAsyncThunk<User, Credentials, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async (credentials, { extra: api }) => {
    const { data } = await api.post<User>(ApiRoute.Login, credentials, { params: {
      useCookies: true,
      useSessionCookies: true
    }});
    return data;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, { extra: api }) => {
    await api.post(ApiRoute.Logout);
  },
);
