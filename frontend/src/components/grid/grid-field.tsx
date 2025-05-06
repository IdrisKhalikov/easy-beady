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
};

export default function GridField({
  grid,
  gridWidth,
  gridHeight,
  cellSize,
  onCellClick,
  schemeType
}: GridFieldProps): JSX.Element {
  const renderCell = (cell: Cell) => (
    <td
      key={`cell-${cell.id}`}
      className="grid-cell"
      style={{
        backgroundColor: cell.color,
        width: `${cellSize}px`,
        height: `${cellSize}px`
      }}
      onClick={() => onCellClick(cell.id)}
    />
  );

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