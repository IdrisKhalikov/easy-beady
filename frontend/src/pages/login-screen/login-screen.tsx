import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import GoogleIcon from '@mui/icons-material/Google';
import Button from '../../components/button/button';
import { AppRoute } from '../../const';
import './login-screen.css';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password: string) => {
    const hasLetter = /[a-zA-Zа-яА-Я]/.test(password);
    const hasNumber = /\d/.test(password);
    return hasLetter && hasNumber;
  };

  const handleLogin = () => {
    let isValid = true;
    
    // Валидация email
    if (!email) {
      setEmailError('Пожалуйста, введите email');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Введите корректный email');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Пожалуйста, введите пароль');
      isValid = false;
    } else if (!validatePassword(password)) {
      setPasswordError('Пароль должен содержать буквы и цифры');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (isValid) {
      navigate(AppRoute.Root);
    }
  };

  const handleGoogleLogin = () => {
    navigate(AppRoute.Root);
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-title">Вход</h2>

        <div className='input-group-wrapper'>
          <div className="input-group">
            <input 
              type="email" 
              className={`login-input ${emailError ? 'error' : ''}`}
              placeholder="Введите ваш email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => {
                if (email && !validateEmail(email)) {
                  setEmailError('Введите корректный email');
                } else {
                  setEmailError('');
                }
              }}
            />
            {emailError && <div className="error-message">{emailError}</div>}
          </div>
          
          <div className="input-group">
            <div className="password-input-container">
              <input 
                type={showPassword ? 'text' : 'password'} 
                className={`login-input ${passwordError ? 'error' : ''}`}
                placeholder="Введите ваш пароль" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => {
                  if (password && !validatePassword(password)) {
                    setPasswordError('Пароль должен содержать хотя бы 1 букву и цифру');
                  } else {
                    setPasswordError('');
                  }
                }}
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
            {passwordError && <div className="error-message">{passwordError}</div>}
          </div>
        </div>
        
        <div className='enter-buttons'>
          <Button 
            variant={'for-loggin-form'} 
            text={'Войти'}
            onClick={handleLogin}
            disabled={!email || !password}
          />
          <Button 
            variant={'for-loggin-form'} 
            text={'Войти с Google'} 
            icon={<GoogleIcon/>}
            onClick={handleGoogleLogin}
          />
        </div>
      </div>
    </div>
  );
}