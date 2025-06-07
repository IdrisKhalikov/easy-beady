import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { AppRoute } from '../const';
import MainScreen from '../pages/main-screen/main-screen';
import LoginScreen from '../pages/login-screen/login-screen';
import ShemeEditScreen from '../pages/sheme-screen/sheme-edit';
// import ShemeDoScreen from '../pages/sheme-screen/sheme-do';
import NotFoundScreen from '../pages/not-found-screen';
import { JSX } from 'react';
import PrivateRoute from './private-route/private-route';
import EditScreenWrapper from '../pages/sheme-screen/sheme-edit';



export default function App(): JSX.Element {

  // Костыльное решение с PrivateRoute на каждом маршруте. Нужно посмотреть, как можно обернуть в один PrivateRoute
  return (
      <BrowserRouter>
          <Routes>
            <Route
              path={AppRoute.Login} 
              element={<LoginScreen/>}
            />
            <Route
              path={AppRoute.Root}
              element={<PrivateRoute><MainScreen /></PrivateRoute>}
            />
            <Route
              path={AppRoute.Edit}
              element={<PrivateRoute><EditScreenWrapper /></PrivateRoute>}
            />
            <Route
              path="*"
              element={<PrivateRoute><NotFoundScreen /></PrivateRoute>}
            />
          </Routes>
      </BrowserRouter>
  );
}