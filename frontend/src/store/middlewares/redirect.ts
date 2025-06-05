import { PayloadAction } from '@reduxjs/toolkit';
import browserHistory from '../../browser-history';
import { Dispatch, isAction, Middleware, UnknownAction } from 'redux';
import { rootReducer } from '../root-reducer';

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer> =
  () =>
    (next) =>
      (action) => {
        if (isAction(action) && action.type === 'app/redirectToRoute') {
          browserHistory.push((action as PayloadAction<string>).payload);
        }

        return next(action);
      };
