import { JSX, useCallback, useEffect, useState } from 'react';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';
import './header.css';
import { AppRoute } from '../../const'; 
import { useAppDispatch } from 'hooks/use-app-dispatch';
import { logoutAction } from 'store/api-actions/user-api-actions';
import { useAppSelector } from 'hooks/use-app-selector';
import { getAuthInfo } from 'store/slices/user-data/selectors';

export default function Header(): JSX.Element {
  const user = useAppSelector(getAuthInfo);
  const dispatch = useAppDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = useCallback(() => {
    dispatch(logoutAction());
    navigate(AppRoute.Login); 
    setIsMenuOpen(false); 
  }, [dispatch]);

  return (
    <header className="header-container">
      <div className="logo">
        <h2>LOGO</h2>
      </div>

      <div className="account-container">
        <button className="avatar-button" onClick={toggleMenu}>
          <div className="avatar">
            <img src={user?.avatarUrl} />
          </div>
        </button>

        {isMenuOpen && (
          <div className="dropdown-menu">
            <div className="menu-item" onClick={handleLogout}>
              <ExitToAppIcon className='menu-icon'/>
              <span className="menu-text">Выход</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}