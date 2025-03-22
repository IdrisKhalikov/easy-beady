using EasyBeady.Api.DataContracts.SchemaContracts;

namespace EasyBeady.Api.Services.SchemaRepository;

public interface ISchemaRepository
{
    public Schema? GetSchema(Guid schemaId);
    public Guid SaveSchema(Schema schema);
    public Guid? UpdateSchema(Guid schemaId, Schema schema);
}