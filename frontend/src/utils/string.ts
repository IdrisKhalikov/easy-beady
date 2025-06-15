export function toCellColor(colorStr: string): number {
    if(colorStr == null) {
        return 0xFFFFFF;
    }

    return parseInt(colorStr.slice(1), 16);
}

export function colorToHexStr(color: number): string {
    if(!color) {
        return "#FFFFFF";
    }

    return "#" + color.toString(16).padStart(6, "0");
}