import { SchemaData } from './schema';

export type SchemaUpdate = {
    name: string,
    width: number,
    height: number,
    linesCompleted: boolean[],
    data: SchemaData
}