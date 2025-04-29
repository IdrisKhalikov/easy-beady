import { JSX, useState, useEffect, useRef } from 'react';
import { useLocation,  useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import GridField, { Cell } from '../../components/grid/grid-field';
import Modal from '../../components/modal/modal';
import Header from '../../components/header/header';
import { IconButton, Slider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import RestartIcon from '@mui/icons-material/RestartAlt';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import Grid4x4Icon from '@mui/icons-material/Grid4x4';
import BrushIcon from '@mui/icons-material/Brush';
import BackspaceIcon from '@mui/icons-material/Backspace';
import PaletteIcon from '@mui/icons-material/PaletteRounded';
import FillIcon from '@mui/icons-material/FormatColorFillRounded';
import './sheme-edit.css';


type SchemeType = 'square' | 'peyote';

export default function ShemeEditScreen(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    title = 'Новая схема', 
    width = 20, 
    height = 20,
    type = 'square'
  } = location.state || {};

  const [selectedOption, setSelectedOption] = useState<'edit' | 'weave'>('edit');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showRestartModal, setShowRestartModal] = useState(false);
  const [gridWidth, setGridWidth] = useState(width);
  const [gridHeight, setGridHeight] = useState(height);
  const [cellSize, setCellSize] = useState(30);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [shapeColor, setShapeColor] = useState('#0000ff');
  const [grid, setGrid] = useState<Cell[]>([]);
  const [brushActive, setBrushActive] = useState(false);
  const [fillActive, setFillActive] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [schemeType, setSchemeType] = useState<SchemeType>(type);

  useEffect(() => {
    initializeGrid();
  }, [gridWidth, gridHeight, backgroundColor, schemeType]);

  const initializeGrid = () => {
    const newGrid: Cell[] = [];
    const cellCount = gridWidth * gridHeight;
    
    for (let i = 0; i < cellCount; i++) {
      newGrid.push({
        id: i + 1,
        color: backgroundColor,
        isSelected: false,
        type: schemeType
      });
    }
    
    setGrid(newGrid);
  };

  const colorPickerRef = useRef<HTMLInputElement>(null);

  const handlePaletteClick = () => {
    if (colorPickerRef.current) {
      colorPickerRef.current.click();
    }
  };

  const handleCellClick = (cellId: number) => {
    if (brushActive) {
      setGrid(prevGrid => 
        prevGrid.map(cell => {
          if (cell.id !== cellId) return cell;
          
          return {
            ...cell,
            isSelected: true,
            color: shapeColor
          };
        })
      );
    }
  };

  const handleFillClick = () => {
    setFillActive(true);
    setBrushActive(false);
    setBackgroundColor(shapeColor);
    setGrid(prevGrid => 
      prevGrid.map(cell => ({
        ...cell,
        color: shapeColor,
        isSelected: false
      }))
    );
  };

  const handleClearGrid = () => {
    setGrid(prevGrid => 
      prevGrid.map(cell => ({
        ...cell,
        isSelected: false,
        color: backgroundColor
      }))
    );
  };

  const handleRestart = () => {
    setGridWidth(width);
    setGridHeight(height);
    setBackgroundColor('#ffffff');
    setShapeColor('#0000ff');
    setBrushActive(false);
    setFillActive(false);
    setZoomLevel(100);
    setCellSize(20);
    setSchemeType(type);
    setShowRestartModal(false);
  };

  const onClose = () => setShowDeleteModal(true);
  const onSave = () => setShowSaveModal(true);
  const onRestart = () => setShowRestartModal(true);

  const handleDeleteButton = () => {
    console.log('Удалено');
    setShowDeleteModal(false);
    navigate(AppRoute.Root);
  };

  const handleSaveButton = () => {
    console.log('Сохранено');
    setShowSaveModal(false);
  };

  const handleRestartButton = () => handleRestart();

  const handleToggle = () => {
    setSelectedOption(prev => (prev === 'edit' ? 'weave' : 'edit'));
  };

  const handleBrushClick = () => {
    setBrushActive(!brushActive);
    setFillActive(false);
  };

  const handleZoomChange = (event: Event, newValue: number | number[]) => {
    const value = Array.isArray(newValue) ? newValue[0] : newValue;
    setZoomLevel(value);
    setCellSize(Math.round(15 * (value / 100)));
  };

  return (
    <div className="page-container">
      <Header/>
      <div className='main-content'>
        <div className='heading'>
          <h2>{title}</h2>
        </div>
        <div className="nav-panel">
          <div className="mode-toggle">
            <button
              className={`mode-toggle__button ${selectedOption === 'edit' ? 'active' : ''}`}
              onClick={() => setSelectedOption('edit')}
            >
              <EditIcon fontSize="small" />
            </button>
            <button
              className={`mode-toggle__button ${selectedOption === 'weave' ? 'active' : ''}`}
              onClick={() => setSelectedOption('weave')}
            >
              <Grid4x4Icon fontSize="small" />
            </button>
          </div>
          <div className="save-exit-actions">
            <IconButton size="medium" className="restart-button" onClick={onRestart}>
              <RestartIcon fontSize="medium" />
            </IconButton>
            <IconButton size="medium" className="save-button" onClick={onSave}>
              <SaveIcon fontSize="medium" />
            </IconButton>
            <IconButton size="medium" className="close-button" onClick={onClose}>
              <CloseIcon fontSize="medium" />
            </IconButton>
          </div>
        </div>

        {showDeleteModal && (
          <Modal
            message="Вы уверены, что не забыли сохранить схему перед закрытием?"
            primaryButton={{
              text: 'Закрыть',
              variant: 'delete',
              onClick: handleDeleteButton,
            }}
            secondaryButton={{
              text: 'Отмена',
              variant: 'delete-transparent',
              onClick: () => setShowDeleteModal(false),
            }}
            onClose={() => setShowDeleteModal(false)}
          />
        )}

        {showSaveModal && (
          <Modal
            title="Сохранение схемы"
            message="Сохранить текущую схему?"
            primaryButton={{
              text: 'Сохранить',
              variant: 'save',
              onClick: handleSaveButton,
            }}
            secondaryButton={{
              text: 'Отмена',
              variant: 'save-transparent',
              onClick: () => setShowSaveModal(false),
            }}
            onClose={() => setShowSaveModal(false)}
          />
        )}

        {showRestartModal && (
          <Modal
            title="Сброс схемы"
            message="Вы уверены, что хотите сбросить схему?"
            primaryButton={{
              text: 'Сбросить',
              variant: 'delete',
              onClick: handleRestartButton,
            }}
            secondaryButton={{
              text: 'Отмена',
              variant: 'delete-transparent',
              onClick: () => setShowRestartModal(false),
            }}
            onClose={() => setShowRestartModal(false)}
          />
        )}

        <div className="edit-panel">
          <div className="tool-group">
            <input
              type="color"
              ref={colorPickerRef}
              value={shapeColor}
              onChange={(e) => setShapeColor(e.target.value)}
              className="color-picker"
            />
            <IconButton
              size="medium"
              className="edit-button"
              onClick={handlePaletteClick}
              title="Палитра"
            >
              <PaletteIcon fontSize="medium" />
            </IconButton>
            
            <IconButton
              size="medium"
              className={`edit-button ${brushActive ? 'active' : ''}`}
              onClick={handleBrushClick}
              title="Кисточка"
              disabled={!shapeColor}
            >
              <BrushIcon fontSize="medium" />
            </IconButton>
            
            <IconButton
              size="medium"
              className={`edit-button ${fillActive ? 'active' : ''}`}
              onClick={handleFillClick}
              title="Заливка"
              disabled={!shapeColor}
            >
              <FillIcon fontSize="medium" />
            </IconButton>

            <IconButton
              size="medium"
              className="erase-button"
              onClick={handleClearGrid}
              title="Очистить"
            >
              <BackspaceIcon fontSize="medium" />
            </IconButton>

            <div className="zoom-controls">
              <Slider
                value={zoomLevel}
                onChange={handleZoomChange}
                min={50}
                max={200}
                step={10}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value}%`}
                sx={{ width: 100 }}
              />
            </div>
          </div>

          <div className="grid-controls">
            <div className="grid-control">
              <label>Ширина</label>
              <input
                type="number"
                min="10"
                max="150"
                value={gridWidth}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value) && value >= 10 && value <= 150) {
                    setGridWidth(value);
                  }
                }}
              />
            </div>
            <div className="grid-control">
              <label>Высота</label>
              <input
                type="number"
                min="10"
                max="150"
                value={gridHeight}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value) && value >= 10 && value <= 150) {
                    setGridHeight(value);
                  }
                }}
              />
            </div>
          </div>
        </div>

        <div className="grid-scroll-container">
          <div className="grid-wrapper">
            <GridField
              grid={grid}
              gridWidth={gridWidth}
              gridHeight={gridHeight}
              cellSize={cellSize}
              onCellClick={handleCellClick}
              schemeType={schemeType}
            />
          </div>
        </div>
      </div>
    </div>
  );
}