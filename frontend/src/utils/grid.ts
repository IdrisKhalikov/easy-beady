import { Cell } from 'components/grid/grid-field';
import { CellColor } from 'types/schema';
import { colorToHexStr, toCellColor } from './string';

export function gridToApiFormat(grid: Cell[], gridWidth: number, gridHeight: number): CellColor[][] {
    const apiGrid: CellColor[][] = [];
    for(let i = 0; i < gridHeight; i++) {
        const row: CellColor[] = [];
        for(let j = 0; j < gridWidth; j++) {
            row.push(toCellColor(grid[i * gridWidth + j].color))
        }
        apiGrid.push(row);
    }

    return apiGrid;
}

export function gridFromApiFormat(apiGrid: CellColor[][], gridWidth: number, gridHeight: number): Cell[] {
    const grid: Cell[] = [];
    for(let i = 0; i < gridHeight; i++) {
        for(let j = 0; j < gridWidth; j++) {
            const cell: Cell = {
                id: i * gridWidth + j,
                color: colorToHexStr(apiGrid[i][j]),
                isSelected: false
            }

            grid.push(cell);
        }
    }

    return grid;
}