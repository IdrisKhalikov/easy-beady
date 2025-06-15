export type SchemaPreview = {
    schemaId: string,
    name: string,
    schemaType: SchemaType,
    createdDate: string,
    lastUpdateDate: string,
    width: number,
    height: number,
    preview: string,
    linesCompleted: boolean[]
}

export type SchemaType = 'square' | 'peyote';

export enum CompletionStatus {
    InProgress = 'IN_PROGRESS',
    Done = 'DONE',
}

