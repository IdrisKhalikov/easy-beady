export type SchemaPreview = {
    schemaId: string,
    name: string,
    schemaType: SchemaType,
    createdDate: string,
    lastUpdateDate: string,
    width: number,
    height: number,
    linesCompleted: number
}

export type SchemaType = 'square' | 'peyote';

export enum CompletionStatus {
    InProgress = 'IN_PROGRESS',
    Done = 'DONE',
}

