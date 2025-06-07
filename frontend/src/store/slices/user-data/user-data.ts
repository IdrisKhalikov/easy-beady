import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../../const';
import { UserData } from '../../../types/state';
import { checkAuthAction, loginAction, logoutAction, registerAction } from '../../api-actions/user-api-actions';
import { AuthorizationStatus } from 'types/user';

const initialState: UserData = {
  user: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  isAuthBeingChecked: false
};

export const userData = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(checkAuthAction.pending, (state) => {
      state.isAuthBeingChecked = true;
    });
    builder.addCase(checkAuthAction.fulfilled, (state, action) => {
      const authCheckResult = action.payload;
      state.authorizationStatus = authCheckResult.isAuthorized
        ? AuthorizationStatus.Auth
        : AuthorizationStatus.NoAuth;

      if (authCheckResult.isAuthorized) {
        state.user = authCheckResult.authInfo;
      }

      state.isAuthBeingChecked = false;
    });
    builder.addCase(checkAuthAction.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      state.isAuthBeingChecked = false;
    });
    builder.addCase(registerAction.pending, (state) => {
      state.isAuthBeingChecked = true;
    });
    builder.addCase(loginAction.pending, (state) => {
      state.isAuthBeingChecked = true;
    });
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.authorizationStatus = AuthorizationStatus.Auth;
      state.user = action.payload;
      state.isAuthBeingChecked = false;
    });
    builder.addCase(loginAction.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      state.isAuthBeingChecked = false;
    });
    builder.addCase(logoutAction.fulfilled, (state) => {
      state.user = null;
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    });
  }
});
