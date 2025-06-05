using EasyBeady.Api.DataContracts.SchemaContracts;

namespace EasyBeady.Api.Services.SchemaRepository;

public interface ISchemaRepository
{
    public Schema? GetSchema(Guid schemaId, Guid userId);
    public List<Schema> GetSchemas(Guid userId);
    public Guid SaveSchema(Schema schema);
    public bool UpdateSchema(Guid schemaId, Guid userId, Schema schema);
    public bool DeleteSchema(Guid schemaId, Guid userId);
}