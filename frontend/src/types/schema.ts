import { SchemaPreview } from './schema-preview'

export type Schema = {
    info: SchemaPreview,
    data: SchemaData
}

export type SchemaData = CellColor[][]

export type CellColor = number