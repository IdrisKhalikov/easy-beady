import {useState } from 'react';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import GoogleIcon from '@mui/icons-material/Google';
import Button from '../../components/button/button';
import './login-screen.css';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-title">Вход</h2>
        <input 
          type="email" 
          className="login-input" 
          placeholder="Введите ваш email" 
        />
        <div className="password-input-container">
          <input 
            type={showPassword ? 'text' : 'password'} 
            className="login-input" 
            placeholder="Введите ваш пароль" 
          />
          {showPassword ? (
            <Visibility 
              className="password-toggle"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <VisibilityOff 
              className="password-toggle"
              onClick={() => setShowPassword(true)}
            />
          )}
        </div>
        <div className='enter-buttons'>
          <Button variant={'for-loggin-form'} text={'Войти'}></Button>
          <Button variant={'for-loggin-form'} text={'Войти с Google'} icon={<GoogleIcon/>}></Button>
        </div>
        
      </div>
    </div>
  );
}