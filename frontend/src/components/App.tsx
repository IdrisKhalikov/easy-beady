import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../const';
import MainScreen from '../pages/main-screen/main-screen';
import LoginScreen from '../pages/login-screen/login-screen';
import ShemeEditScreen from '../pages/sheme-screen/sheme-edit';
// import ShemeDoScreen from '../pages/sheme-screen/sheme-do';
import NotFoundScreen from '../pages/not-found-screen';
import { JSX } from 'react';



export default function App(): JSX.Element {
  return (
    <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Root}
            element={<MainScreen />}
          />
          <Route 
            path={AppRoute.Login} 
            element={<LoginScreen/>} 
          />
          <Route 
            path={AppRoute.Edit} 
            element={<ShemeEditScreen/>} 
          />
          <Route
            path="*"
            element={<NotFoundScreen />}
          />
        </Routes>
    </BrowserRouter>
  );
}