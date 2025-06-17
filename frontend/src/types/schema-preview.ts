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

export enum SchemaType {
    Square = 'Square',
    Peyote = 'Peyote'
}

export enum CompletionStatus {
    InProgress = 'IN_PROGRESS',
    Done = 'DONE',
}

