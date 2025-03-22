using EasyBeady.Api.DataContracts.SchemaContracts;

namespace EasyBeady.Api.Services.SchemaRepository;

public class MemorySchemaRepository : ISchemaRepository
{
    private readonly Dictionary<Guid, Schema> schemas = new();

    public MemorySchemaRepository()
    {
    }

    public Schema? GetSchema(Guid schemaId)
    {
        return schemas.GetValueOrDefault(schemaId);
    }

    public Guid SaveSchema(Schema schema)
    {
        var schemaId = Guid.NewGuid();
        schema.Info.SchemaId = schemaId;
        schemas.Add(schemaId, schema);
        return schemaId;
    }

    public Guid? UpdateSchema(Guid schemaId, Schema schema)
    {
        if (!schemas.ContainsKey(schemaId))
            return null;
        schemas[schemaId] = schema;
        return schemaId;
    }
}