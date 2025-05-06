import { JSX, useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import GridField, { Cell } from '../../components/grid/grid-field';
import Header from '../../components/header/header';
import NavigationPanel from '../../components/nav-panel/nav-panel';
import { IconButton, Slider } from '@mui/material';
import BrushIcon from '@mui/icons-material/Brush';
import BackspaceIcon from '@mui/icons-material/Backspace';
import PaletteIcon from '@mui/icons-material/PaletteRounded';
import FillIcon from '@mui/icons-material/FormatColorFillRounded';
import './sheme-edit.css';

type SchemeType = 'square' | 'peyote';

export default function ShemeEditScreen(): JSX.Element {
  const location = useLocation();
  const { 
    title = 'Новая схема', 
    width = 20, 
    height = 20,
    type = 'square'
  } = location.state || {};

  const [selectedOption, setSelectedOption] = useState<'edit' | 'weave'>('edit');
  const [gridWidth, setGridWidth] = useState(width);
  const [gridHeight, setGridHeight] = useState(height);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [shapeColor, setShapeColor] = useState('#0000ff');
  const [grid, setGrid] = useState<Cell[]>([]);
  const [brushActive, setBrushActive] = useState(false);
  const [fillActive, setFillActive] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [schemeType, setSchemeType] = useState<SchemeType>(type);

  const cellSize = 15;

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
    setSchemeType(type);
  };

  const handleOptionChange = (option: 'edit' | 'weave') => {
    setSelectedOption(option);
  };

  const handleBrushClick = () => {
    setBrushActive(!brushActive);
    setFillActive(false);
  };

  const handleZoomChange = (event: Event, newValue: number | number[]) => {
    const value = Array.isArray(newValue) ? newValue[0] : newValue;
    setZoomLevel(value);
  };

  return (
    <div className="page-container">
      <Header/>
      <div className='main-content'>
        <NavigationPanel 
          title={title}
          selectedOption={selectedOption}
          onOptionChange={handleOptionChange}
          onRestart={handleRestart}
        />
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
                max="200"
                value={gridWidth}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value) && value >= 10 && value <= 200) {
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
                max="200"
                value={gridHeight}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value) && value >= 10 && value <= 200) {
                    setGridHeight(value);
                  }
                }}
              />
            </div>
          </div>
        </div>

        <div className="grid-scroll-container">
          <div className="grid-wrapper"
            style={{
              transform: `scale(${zoomLevel / 100})`,
              transformOrigin: '0 0',
              width: `${gridWidth * cellSize}px`,
              height: `${gridHeight * cellSize}px`,
            }}
          >
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