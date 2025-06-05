using EasyBeady.Api.DataContracts.SchemaContracts;

namespace EasyBeady.Api.Services.SchemaRepository;

public class MemorySchemaRepository : ISchemaRepository
{
    private readonly Dictionary<Guid, Dictionary<Guid, Schema>> schemas = new();

    public MemorySchemaRepository()
    {
    }
    
    public List<Schema> GetSchemas(Guid userId)
    {
        return schemas.GetValueOrDefault(userId).Values.ToList();
    }

    public Schema? GetSchema(Guid schemaId, Guid userId)
    {
        return schemas.GetValueOrDefault(userId)?.GetValueOrDefault(schemaId);
    }

    public Guid SaveSchema(Schema schema)
    {
        var schemaId = Guid.NewGuid();
        schema.Info.SchemaId = schemaId;
        if(!schemas.ContainsKey(schema.Info.UserId))
            schemas.Add(schema.Info.UserId, new Dictionary<Guid, Schema>());
        schemas[schema.Info.UserId].Add(schema.Info.SchemaId, schema);
        return schemaId;
    }

    public bool UpdateSchema(Guid schemaId, Guid userId, Schema schema)
    {
        if (!schemas.ContainsKey(schemaId))
            return false;
        if(!schemas.ContainsKey(schema.Info.UserId))
            schemas.Add(schema.Info.UserId, new Dictionary<Guid, Schema>());
        schemas[userId].Add(schemaId, schema);
        return true;
    }

    public bool DeleteSchema(Guid schemaId, Guid userId)
    {
        if(schemas.ContainsKey(userId) && schemas[userId].ContainsKey(schemaId))
            return false;
        schemas.Remove(schemaId);
        return true;
    }
}