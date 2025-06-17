import { Cell } from 'components/grid/grid-field';
import { CellColor } from 'types/schema';
import { colorToHexStr, toCellColor } from './string';

export function gridToApiFormat(grid: Cell[]): CellColor[] {
    return grid.map(c => toCellColor(c.color))
}

export function gridFromApiFormat(apiGrid: CellColor[]): Cell[] {
    return apiGrid.map((c, i) => ({
        id: i+1,
        color: colorToHexStr(c),
        isSelected: false
    }));
}

export function changeGridWidth(grid: Cell[], prevWidth: number, newWidth: number): Cell[] {
    let newGrid = [];
    let curId = 1;
    for(let i = 0; i < grid.length;) {
        for(let j = 0; j < prevWidth; j++, i++, curId++) {
            newGrid.push({...grid[i], id: curId });
        }

        for(let j = prevWidth; j < newWidth; j++, curId++) {
            newGrid.push({id: curId, color: '#ffffff', isSelected: false})
        }
    }

    return newGrid;
}