import { Cell } from 'components/grid/grid-field';
import { CellColor } from 'types/schema';
import { colorToHexStr, toCellColor } from './string';

export function gridToApiFormat(grid: Cell[]): CellColor[] {
    return grid.map(c => toCellColor(c.color))
}

export function gridFromApiFormat(apiGrid: CellColor[]): Cell[] {
    return apiGrid.map((c, i) => ({
        id: i,
        color: colorToHexStr(c),
        isSelected: false
    }));
}