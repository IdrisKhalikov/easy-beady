using EasyBeady.Api.DataContracts.SchemaContracts;

namespace EasyBeady.Api.Services.SchemaRepository;

public interface ISchemaRepository
{
    public Schema? GetSchema(Guid schemaId);
    public Guid SaveSchema(Schema schema);
    public bool UpdateSchema(Guid schemaId, Schema schema);
}