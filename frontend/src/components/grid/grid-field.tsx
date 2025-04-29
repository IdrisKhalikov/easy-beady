import { JSX } from 'react';

type SchemeType = 'square' | 'peyote';

export type Cell = {
  id: number;
  color: string;
  isSelected: boolean;
  type?: SchemeType;
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
  const renderPeyoteRow = (rowIndex: number) => {
    const cells = [];
    const isEvenRow = rowIndex % 2 === 0;
    
    for (let j = 0; j < gridWidth; j++) {
      const index = rowIndex * gridWidth + j;
      const cell = grid[index];

      if (!cell) continue;

      cells.push(
        <td
          key={`cell-${cell.id}`}
          className="grid-cell"
          style={{
            width: `${cellSize}px`,
            height: `${cellSize}px`,
            backgroundColor: cell.color,
            border: '1px solid rgba(0,0,0,0.4)',
            position: 'relative',
            boxSizing: 'border-box'
          }}
          onClick={() => onCellClick(cell.id)}
        />
      );
    }

    return (
      <tr 
        key={`row-${rowIndex}`} 
        style={{ 
          height: `${cellSize}px`,
          position: 'relative',
          left: isEvenRow ? `${cellSize/2}px` : '0',
          marginBottom: '-1px'
        }}
      >
        {cells}
      </tr>
    );
  };

  const renderSquareRow = (rowIndex: number) => {
    const cells = [];
    
    for (let j = 0; j < gridWidth; j++) {
      const index = rowIndex * gridWidth + j;
      const cell = grid[index];

      if (!cell) continue;

      cells.push(
        <td
          key={`cell-${cell.id}`}
          className="grid-cell"
          style={{
            width: `${cellSize}px`,
            height: `${cellSize}px`,
            backgroundColor: cell.color,
            border: '1px solid rgba(0,0,0,0.4)',
            boxSizing: 'border-box'
          }}
          onClick={() => onCellClick(cell.id)}
        />
      );
    }

    return (
      <tr key={`row-${rowIndex}`} style={{ height: `${cellSize}px` }}>
        {cells}
      </tr>
    );
  };

  const renderGrid = () => {
    const rows = [];

    for (let i = 0; i < gridHeight; i++) {
      rows.push(
        schemeType === 'peyote' 
          ? renderPeyoteRow(i)
          : renderSquareRow(i)
      );
    }

    return (
      <table 
        className="grid-table" 
        style={{ 
          borderCollapse: 'separate',
          borderSpacing: 0,
          margin: '0 auto',
          position: 'relative',
        }}
      >
        <tbody>{rows}</tbody>
      </table>
    );
  };

  return (
    <div className="grid-container" style={{ overflow: 'visible' }}>
      {renderGrid()}
    </div>
  );
}