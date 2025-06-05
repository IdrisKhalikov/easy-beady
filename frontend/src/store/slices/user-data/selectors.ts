import { NameSpace } from '../../../const';
import { State } from '../../../types/state';
import { AuthorizationStatus, User } from '../../../types/user';

export const getAuthoriztionStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;

export const getIsAuthBeingChecked = (state: State): boolean => state[NameSpace.User].isAuthBeingChecked;

export const getAuthInfo = (state: State): User | null => state[NameSpace.User].user;
