import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { userData } from './slices/user-data/user-data';
import { schemasData } from './slices/schemas-data/schemas-data';
import { offerData } from './slices/schema-data/schema-data';

export const rootReducer = combineReducers({
  [NameSpace.User]: userData.reducer,
  [NameSpace.Schemas]: schemasData.reducer,
  [NameSpace.Schema]: offerData.reducer,
});

