import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Paper
} from '@mui/material';
import Button from '../button/button';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import './create-form-modal.css';

interface CreateFormModalProps {
  onClose: () => void;
}

export default function CreateFormModal({ onClose }: CreateFormModalProps) {
  const navigate = useNavigate();
  const [width, setWidth] = useState(20);
  const [height, setHeight] = useState(20);
  const [schemeName, setSchemeName] = useState('');
  const [schemeType, setSchemeType] = useState<'square' | 'peyote' | ''>('');
  const [isNameError, setIsNameError] = useState(false);
  const [isTypeError, setIsTypeError] = useState(false);

  const handleWidthIncrease = () => setWidth(prev => Math.min(prev + 1, 150));
  const handleWidthDecrease = () => setWidth(prev => Math.max(prev - 1, 10));
  const handleHeightIncrease = () => setHeight(prev => Math.min(prev + 1, 150));
  const handleHeightDecrease = () => setHeight(prev => Math.max(prev - 1, 10));

  const handleCreateClick = () => {
    let hasErrors = false;

    if (!schemeName.trim()) {
      setIsNameError(true);
      hasErrors = true;
    } else {
      setIsNameError(false);
    }

    if (!schemeType) {
      setIsTypeError(true);
      hasErrors = true;
    } else {
      setIsTypeError(false);
    }

    if (hasErrors) return;

    navigate('/edit', {
      state: {
        title: schemeName,
        width,
        height,
        type: schemeType,
      }
    });

    onClose();
  };

  return (
    <div className="modal-overlay">
      <Paper elevation={3} className="create-form-modal">
        <Box className="modal-header">
          <Typography 
            sx={{
              fontFamily: '"Montserrat", sans-serif',
              fontSize: '18px',
              lineHeight: '140%',
            }}
          >
            Создание новой схемы
          </Typography>
          <IconButton size="small" className="close-button" onClick={onClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <TextField
          fullWidth
          label={
            <Typography 
              className="text-field-label"
              sx={{ color: isNameError ? 'red' : 'inherit' }} 
            >
              Название схемы
            </Typography>
          }
          variant="outlined"
          size="small"
          value={schemeName}
          onChange={(e) => {
            setSchemeName(e.target.value);
            setIsNameError(false);
          }}
          error={isNameError}
          helperText={isNameError ? 'Поле обязательно для заполнения' : ''}
          InputProps={{
            className: "text-field-input"
          }}
          sx={{ marginBottom: '20px' }}
        />

        <Box className="dimensions-container">
          <Box className="number-input-wrapper">
            <Box className="number-input">
              <Box className="number-input-content">
                <Typography 
                  sx={{
                    fontFamily: '"Montserrat", sans-serif',
                    fontWeight: 400,
                    fontSize: '36px',
                    lineHeight: '142%',
                    letterSpacing: '0.02em',
                    color: '#2F2F2F',
                    width: '35px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {width}
                </Typography>
                <Box className="number-input-buttons">
                  <IconButton 
                    size="small" 
                    onClick={handleWidthIncrease}
                    disabled={width >= 150}
                  >
                    <KeyboardArrowUpIcon fontSize="small" />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    onClick={handleWidthDecrease}
                    disabled={width <= 10}
                  >
                    <KeyboardArrowDownIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            </Box>
            <Typography className="dimension-label">Ширина</Typography>
          </Box>

          <Box className="number-input-wrapper">
            <Box className="number-input">
              <Box className="number-input-content">
                <Typography 
                  sx={{
                    fontFamily: '"Montserrat", sans-serif',
                    fontWeight: 400,
                    fontSize: '36px',
                    lineHeight: '142%',
                    letterSpacing: '0.02em',
                    color: '#2F2F2F',
                    width: '35px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {height}
                </Typography>
                <Box className="number-input-buttons">
                  <IconButton 
                    size="small" 
                    onClick={handleHeightIncrease}
                    disabled={height >= 150}
                  >
                    <KeyboardArrowUpIcon fontSize="small" />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    onClick={handleHeightDecrease}
                    disabled={height <= 10}
                  >
                    <KeyboardArrowDownIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            </Box>
            <Typography className="dimension-label">Высота</Typography>
          </Box>
        </Box>

        <Box className="scheme-type-block" sx={{ margin: '20px 0' }}>
          <Box className="scheme-type-container">
            <Typography 
              className="scheme-type-label"
              sx={{ 
                color: isTypeError ? 'red' : 'inherit',
                lineHeight: '100%',
                marginBottom: '8px'
              }}
            >
              Тип схемы:
            </Typography>
            <Box className="scheme-type-buttons" sx={{ display: 'flex', gap: '8px' }}>
              <Button
                text='Square'
                variant={schemeType === 'square' ? 'save' : 'save-transparent'}
                onClick={() => {
                  setSchemeType('square');
                  setIsTypeError(false);
                }}
                className="scheme-type-button"
              />
              <Button
                text='Peyote'
                variant={schemeType === 'peyote' ? 'save' : 'save-transparent'}
                onClick={() => {
                  setSchemeType('peyote');
                  setIsTypeError(false); 
                }}
                className="scheme-type-button"
              />
            </Box>
          </Box>
          {isTypeError && (
            <Typography sx={{ 
              color: '#d32f2f', 
              fontSize: '12px', 
              marginTop: '4px',
              marginLeft: '14px'
            }}>
              Выберите тип схемы
            </Typography>
          )}
        </Box>

        <Button 
          text="Создать" 
          variant="save"
          onClick={handleCreateClick}
        />
      </Paper>
    </div>
  );
}