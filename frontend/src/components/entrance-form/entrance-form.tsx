import { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { TextField, Button, Box, Typography } from '@mui/material';
import './entranceForm.css';

interface EntranceFormProps {
  onLogin: (email: string) => void;
}

interface FormState {
  username: string;
  password: string;
}

export default function EntranceForm({ onLogin }: EntranceFormProps) {
  const [formState, setFormState] = useState<FormState>({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState<{ username?: string }>({});

  const handleChange = (field: keyof FormState) => (e: ChangeEvent<HTMLInputElement>) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: e.target.value,
    }));
  };

  const navigate = useNavigate();

  const validateForm = (): boolean => {
    const newErrors: { username?: string } = {};
    const usernameRegex = /^[а-яА-Яa-zA-Z0-9@,+\-_]{1,150}$/;
    if (!usernameRegex.test(formState.username)) {
      newErrors.username = 'Неверное имя пользователя';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEntrance = () => {
    if (validateForm()) {
      onLogin(formState.username);
      navigate(AppRoute.Root);
    }
  };

  return (
    <Box className="entranceForm">
      <Typography variant="h3" className="logo">
        LOGO
      </Typography>
      <Box className="formContainer">
        <Typography variant="h4" className="title">
          Вход
        </Typography>
        <Box className="inputFields">
          <TextField
            label="Имя пользователя"
            variant="outlined"
            fullWidth
            value={formState.username}
            onChange={handleChange('username')}
            error={!!errors.username}
            helperText={errors.username}
          />
          <TextField
            label="Пароль"
            type="password"
            variant="outlined"
            fullWidth
            value={formState.password}
            onChange={handleChange('password')}
          />
        </Box>
        <Button className="submitBtn" variant="contained" fullWidth onClick={handleEntrance}>
          Войти
        </Button>
        <Button className="googleBtn" variant="contained" fullWidth>
          <Box className="googleLogo" />
          Войти с помощью Google
        </Button>
      </Box>
    </Box>
  );
}
