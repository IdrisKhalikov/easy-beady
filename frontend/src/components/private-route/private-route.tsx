import Spinner from 'components/spinner/spinner';
import { AppRoute } from 'const';
import { useAppSelector } from 'hooks/use-app-selector';
import { FC, JSX, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { getAuthoriztionStatus, getIsAuthBeingChecked } from 'store/slices/user-data/selectors';
import { AuthorizationStatus } from 'types/user';

type PrivateRouteProps = {
    children: JSX.Element
}

export default function PrivateRoute({children}: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthoriztionStatus);
  const isAuthBeingChecked = useAppSelector(getIsAuthBeingChecked);

  if(isAuthBeingChecked) {
    return <Spinner />;
  }

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}