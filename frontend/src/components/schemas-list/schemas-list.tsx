import SchemeCard from 'components/sheme-card/sheme-card'
import { SchemaPreview } from 'types/schema-preview'

type SchemasListProps = {
    schemas: SchemaPreview[]
    handleSchemaDelete: (schemaId: string) => void;
}

export default function SchemasList({schemas, handleSchemaDelete}: SchemasListProps) {
    return (
        <div className='cards-container'>
            {schemas.map((schema) => (
            <SchemeCard
                key={schema.schemaId}
                schema={schema}
                onDelete={() => handleSchemaDelete(schema.schemaId)}
            />
            ))}
        </div>
    )
}