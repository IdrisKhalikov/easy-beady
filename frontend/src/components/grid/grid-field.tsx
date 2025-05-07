import { JSX } from 'react';
import './grid-field.css';

type SchemeType = 'square' | 'peyote';

export type Cell = {
  id: number;
  color: string;
  isSelected: boolean;
};

type GridFieldProps = {
  grid: Cell[];
  gridWidth: number;
  gridHeight: number;
  cellSize: number;
  onCellClick: (cellId: number) => void;
  schemeType: SchemeType;
  mode: 'edit' | 'weave';
  markedColumns: { [key: number]: boolean };
};

export default function GridField({
  grid,
  gridWidth,
  gridHeight,
  cellSize,
  onCellClick,
  schemeType,
  mode,
  markedColumns
}: GridFieldProps): JSX.Element {
  const renderCell = (cell: Cell) => {
    const columnIndex = (cell.id - 1) % gridWidth;
    const isColumnMarked = markedColumns[columnIndex];
    
    return (
      <td
        key={`cell-${cell.id}`}
        className={`grid-cell ${isColumnMarked ? 'marked-column' : ''}`}
        style={{
          backgroundColor: cell.color,
          width: `${cellSize}px`,
          height: `${cellSize}px`,
          position: 'relative'
        }}
        onClick={() => onCellClick(cell.id)}
      >
        {mode === 'weave' && (
          <div className="grid-cell-number">
            {columnIndex + 1}
          </div>
        )}
        {isColumnMarked && <div className="column-overlay" />}
      </td>
    );
  };

  const renderRow = (rowIndex: number) => {
    const cells = [];
    const isEvenRow = rowIndex % 2 === 0;
    
    for (let j = 0; j < gridWidth; j++) {
      const index = rowIndex * gridWidth + j;
      const cell = grid[index];
      if (cell) cells.push(renderCell(cell));
    }

    return (
      <tr 
        key={`row-${rowIndex}`} 
        className={`grid-row ${schemeType === 'peyote' ? 'peyote-row' : ''}`}
        style={{
          height: `${cellSize}px`,
          left: schemeType === 'peyote' && isEvenRow ? `${cellSize/2}px` : '0'
        }}
      >
        {cells}
      </tr>
    );
  };

  const rows = [];
  for (let i = 0; i < gridHeight; i++) {
    rows.push(renderRow(i));
  }

  return (
    <table className={`grid-table ${schemeType}-grid`}>
      <tbody>{rows}</tbody>
    </table>
  );
}