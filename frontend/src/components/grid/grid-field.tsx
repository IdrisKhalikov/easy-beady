import { JSX } from 'react';
import './grid-field.css';
import { SchemaType } from 'types/schema-preview';
import { EditorMode } from 'pages/sheme-screen/editor-mode';

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
  schemeType: SchemaType;
  mode: EditorMode;
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
  console.log(schemeType);
  const renderCell = (cell: Cell) => {
    const columnIndex = (cell.id - 1) % gridWidth;
    const isColumnMarked = markedColumns[columnIndex];

    return (
      <td
        key={`cell-${cell.id}`}
        className={`grid-cell ${isColumnMarked && mode == EditorMode.Weave ? 'marked-column' : ''}`}
        style={{
          backgroundColor: cell.color,
          width: `${cellSize}px`,
          height: `${cellSize}px`,
          position: 'relative'
        }}
        onClick={() => onCellClick(cell.id)}
      >
        {mode === EditorMode.Weave && (
          <div className="grid-cell-number">
            {columnIndex + 1}
          </div>
        )}
        {isColumnMarked && mode == EditorMode.Weave && <div className="column-overlay" />}
      </td>
    );
  };

  const renderRow = (rowIndex: number) => {
    const cells = [];
    const isEvenRow = rowIndex % 2 === 0;
    console.log(schemeType === SchemaType.Peyote);
    
    for (let j = 0; j < gridWidth; j++) {
      const index = rowIndex * gridWidth + j;
      const cell = grid[index];
      if (cell) cells.push(renderCell(cell));
    }

    return (
      <tr 
        key={`row-${rowIndex}`} 
        className={`grid-row ${schemeType === SchemaType.Peyote ? 'peyote-row' : ''}`}
        style={{
          height: `${cellSize}px`,
          left: (schemeType === SchemaType.Peyote && !isEvenRow) ? `${cellSize/2}px` : '0'
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