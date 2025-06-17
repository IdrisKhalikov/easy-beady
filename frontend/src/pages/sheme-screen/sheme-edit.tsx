import React, { JSX, useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import GridField, { Cell } from '../../components/grid/grid-field';
import Header from '../../components/header/header';
import NavigationPanel from '../../components/nav-panel/nav-panel';
import { IconButton, Slider } from '@mui/material';
import BrushIcon from '@mui/icons-material/Brush';
import BackspaceIcon from '@mui/icons-material/Backspace';
import PaletteIcon from '@mui/icons-material/PaletteRounded';
import FillIcon from '@mui/icons-material/FormatColorFillRounded';
import './sheme-edit.css';
import { useAppSelector } from 'hooks/use-app-selector';
import { getIsSchemaLoading, getSchema } from 'store/slices/schema-data/selectors';
import { useAppDispatch } from 'hooks/use-app-dispatch';
import { fetchSchemaAction, updateSchemaAction } from 'store/api-actions/schema-api-actions';
import Spinner from 'components/spinner/spinner';
import { Schema } from 'types/schema';
import { SchemaType } from 'types/schema-preview';
import { SchemaUpdate } from 'types/schema-update';
import { changeGridWidth, gridFromApiFormat, gridToApiFormat } from 'utils/grid';
import { AppRoute } from 'const';
import { EditorMode } from './editor-mode';


type ColumnState = {
  [columnIndex: number]: boolean;
};

// На страничке ниже используются хуки, у которых начальное состояние задается параметрами схемы.
// Т.к. данные получаем асинхронно, сразу их вызывать не получится, поэтому пока сделал обертку
export default function EditScreenWrapper(): JSX.Element {
  const { schemaId } = useParams();
  const dispatch = useAppDispatch();
  const schema = useAppSelector(getSchema);
  const isSchemaLoading = useAppSelector(getIsSchemaLoading);

  useMemo(() => {
    if(schemaId) {
      dispatch(fetchSchemaAction(schemaId));
    }
  }, [dispatch, schemaId]);

  if(isSchemaLoading) {
    return <Spinner />
  }

  if(schema == null) {
    return <Navigate to={AppRoute.NotFound} />
  }

  return <MemoSchemeEditScreen schema={schema!}/>
}

const MemoSchemeEditScreen = React.memo(ShemeEditScreen);

type ShemeEditScreenProps = {
  schema: Schema
}

function ShemeEditScreen({schema}: ShemeEditScreenProps): JSX.Element {
  const { name, schemaType, width, height, linesCompleted } = schema.info;
  const initialGridState = useMemo(() => gridFromApiFormat(schema.data), [schema]);
  const dispatch = useAppDispatch();

  const [selectedOption, setSelectedOption] = useState<EditorMode>(EditorMode.Edit);
  const [gridWidth, setGridWidth] = useState(width);
  const [gridHeight, setGridHeight] = useState(height);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [shapeColor, setShapeColor] = useState('#0000ff');
  const [grid, setGrid] = useState<Cell[]>(initialGridState);
  const [brushActive, setBrushActive] = useState(false);
  const [fillActive, setFillActive] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [schemeType, setSchemeType] = useState<SchemaType>(schemaType);
  const [markedColumns, setMarkedColumns] = useState<ColumnState>({...linesCompleted});

  const cellSize = 15;
  const colorPickerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    initializeGrid();
  }, [gridWidth, gridHeight, backgroundColor, schemeType]);

  const initializeGrid = () => {
    const newGrid: Cell[] = [];
    const cellCount = gridWidth * gridHeight;
    
    for (let i = 0; i < cellCount; i++) {
      newGrid.push({
        id: i + 1,
        color: i >= grid.length ? backgroundColor : grid[i].color,
        isSelected: false,
      });
    }
    setGrid(newGrid);
  };

  const handlePaletteClick = () => {
    if (colorPickerRef.current) {
      colorPickerRef.current.click();
    }
  };

  const handleCellClick = (cellId: number) => {
    if (selectedOption === EditorMode.Edit) {
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
    } else if (selectedOption === EditorMode.Weave) {
      const columnIndex = (cellId - 1) % gridWidth;
      setMarkedColumns(prev => ({
        ...prev,
        [columnIndex]: !prev[columnIndex]
      }));
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
    if (selectedOption === EditorMode.Weave) {
      setMarkedColumns({});
    }
  };

  const handleRestart = () => {
    setGridWidth(width);
    setGridHeight(height);
    setGrid(initialGridState);
    setBackgroundColor('#ffffff');
    setShapeColor('#0000ff');
    setBrushActive(false);
    setFillActive(false);
    setZoomLevel(100);
    setSchemeType(schemaType);
    setMarkedColumns(linesCompleted);
  };

  const handleOptionChange = (option: EditorMode) => {
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

  const handleSave = useCallback(() => {
    const linesCompleted = Array(gridWidth);
    for(let i = 0; i < gridWidth; i++) {
      if(markedColumns.hasOwnProperty(i)) {
        linesCompleted[i] = markedColumns[i];
      } else {
        linesCompleted[i] = false;
      }
    }
    const schemaUpdate: SchemaUpdate = {
      name,
      width: gridWidth,
      height: gridHeight,
      linesCompleted: linesCompleted,
      data: gridToApiFormat(grid)
    }

    dispatch(updateSchemaAction({...schemaUpdate, id: schema.info.schemaId} ));
  }, [dispatch, markedColumns, schema, grid]);

  useEffect(() => {
    if(selectedOption == EditorMode.Weave) {
      const interval = setInterval(() => {
        handleSave();
      }, 15_000);
      return () => clearInterval(interval);
    }
  }, [handleSave]);

  return (
    <div className="page-container">
      <Header/>
      <div className='main-content'>
        <NavigationPanel 
          title={name}
          selectedOption={selectedOption}
          onOptionChange={handleOptionChange}
          onSave={handleSave}
          onRestart={handleRestart}
        />
        
        {selectedOption === EditorMode.Edit && (
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
                      setGrid(changeGridWidth(grid, gridWidth, value));
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
        )}

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
              mode={selectedOption}
              markedColumns={markedColumns}
            />
          </div>
        </div>
      </div>
    </div>
  );
}