import { JSX } from 'react';

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
};

export default function GridField({
  grid,
  gridWidth,
  gridHeight,
  cellSize,
  onCellClick,
}: GridFieldProps): JSX.Element {
  const renderGrid = () => {
    const rows = [];

    for (let i = 0; i < gridHeight; i++) {
      const cells = [];
      for (let j = 0; j < gridWidth; j++) {
        const index = i * gridWidth + j;
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
            }}
            onClick={() => onCellClick(cell.id)}
          >
          </td>
        );
      }
      rows.push(<tr key={`row-${i}`}>{cells}</tr>);
    }

    return <table className="grid-table"><tbody>{rows}</tbody></table>;
  };

  return <>{renderGrid()}</>;
}
