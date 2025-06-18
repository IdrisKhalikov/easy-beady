import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../../types/state';
import axios, { AxiosInstance } from 'axios';
import { ApiRoute, AppRoute } from '../../const';
import { redirectToRoute } from '../action';
import { fetchSchemasAction } from './schemas-api-actions';
import { AuthCheckResult, User } from '../../types/user';
import { StatusCodes } from 'http-status-codes';
import { Credentials } from 'types/credentials';
import { toast } from 'react-toastify';

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
    try {
      await api.post<User>(ApiRoute.Register, credentials);
      toast.success('Поздравляем, регистрация прошла успешно!');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.request?.responseText)
        const parsedError = JSON.parse(error.response?.request?.responseText);
        if (parsedError.errors && Object.keys(parsedError.errors).length > 0) {
          const firstErrorKey = Object.keys(parsedError.errors)[0];
          const firstErrorMessage = parsedError.errors[firstErrorKey][0];
          toast.error(firstErrorMessage);
        } else {
          toast.error(parsedError.title || "Введите правильные логин и пароль");
        }
      }
    }
  },
);

export const loginAction = createAsyncThunk<User, Credentials, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
  rejectValue: string;
}>(
  'user/login',
  async (credentials, { extra: api, rejectWithValue}) => {
    try{
      const { data } = await api.post<User>(ApiRoute.Login, credentials, { params: {
      useCookies: true,
      useSessionCookies: true
      }});
      return data;
    } catch (error){
      if (axios.isAxiosError(error)) {
        console.log(error.response?.request?.responseText)
        const parsedError = JSON.parse(error.response?.request?.responseText);
        if (parsedError.errors && Object.keys(parsedError.errors).length > 0) {
          const firstErrorKey = Object.keys(parsedError.errors)[0];
          const firstErrorMessage = parsedError.errors[firstErrorKey][0];
          toast.error(firstErrorMessage);
        } else {
          toast.error("Неверные логин и пароль");
        }
      }
      return rejectWithValue("Неверные логин и пароль");
    }
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
