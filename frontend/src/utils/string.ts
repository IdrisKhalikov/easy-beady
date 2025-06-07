import { CellColor } from 'types/schema'

export function toCellColor(colorStr: string): CellColor {
    return parseInt(colorStr.slice(1), 16);
}

export function colorToHexStr(color: CellColor): string {
    if(!color) {
        return "#FFFFFF";
    }

    return "#" + color.toString(16).padStart(6, "0");
}