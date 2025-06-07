import { CellColor } from './schema';
import { SchemaType } from './schema-preview';

export type SchemaUpdate = {
    name: string,
    schemaType: SchemaType,
    linesCompleted: number,
    data: CellColor[][]
}