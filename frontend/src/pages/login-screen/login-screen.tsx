import { useContext, useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import GoogleIcon from '@mui/icons-material/Google';
import Button from '../../components/button/button';
import { ApiRoute, APP_URL, AppRoute } from '../../const';
import './login-screen.css';
import { BACKEND_URL } from 'services/api';
import { useAppSelector } from 'hooks/use-app-selector';
import { getAuthoriztionStatus } from 'store/slices/user-data/selectors';
import { AuthorizationStatus } from 'types/user';
import { useAppDispatch } from 'hooks/use-app-dispatch';
import { loginAction, registerAction } from 'store/api-actions/user-api-actions';
import { Credentials } from 'types/credentials';
import { toast } from 'react-toastify';



export default function LoginPage() {
	const dispatch = useAppDispatch();
	const authStatus = useAppSelector(getAuthoriztionStatus);
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

	const handleRegister = async () => {
		try{
			const credentials: Credentials = { email, password };
			await dispatch(registerAction(credentials)).unwrap();
		} catch {
		}
	};

	const handleLogin = async () => {
		try{
			const credentials: Credentials = { email, password };
			await dispatch(loginAction(credentials)).unwrap();
		} catch{
		}
	};

	// TODO: Переделать на нормальный редирект без захардкоженных url-ов, чтобы на проде тоже работало
	const handleGoogleLogin = () => {
		window.location.replace(BACKEND_URL + ApiRoute.GoogleLogin + `?returnUrl=${APP_URL}`)
	};

	if (authStatus === AuthorizationStatus.Auth) {
		return <Navigate to={AppRoute.Root} />
	}

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
						text={'Зарегистрироваться'}
						onClick={handleRegister}
						disabled={!email || !password}
					/>
					<Button
						variant={'for-loggin-form'}
						text={'Войти'}
						onClick={handleLogin}
						disabled={!email || !password}
					/>
					<Button
						variant={'for-loggin-form'}
						text={'Войти с Google'}
						icon={<GoogleIcon />}
						onClick={handleGoogleLogin}
					/>
				</div>
			</div>
		</div>
	);
}
