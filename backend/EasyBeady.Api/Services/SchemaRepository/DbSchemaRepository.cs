using EasyBeady.Api.Database.Domain;
using EasyBeady.Api.Database.Domain.Models;
using EasyBeady.Api.DataContracts.SchemaContracts;
using EasyBeady.Api.Services.Helpers;
using EasyBeady.Api.Utils;

namespace EasyBeady.Api.Services.SchemaRepository;

public class DbSchemaRepository : ISchemaRepository
{
    private readonly SchemasDbContext _context;

    public DbSchemaRepository(SchemasDbContext context)
    {
        _context = context;
    }

    public Schema? GetSchema(Guid schemaId, Guid userId)
    {
        var schemaModel =  _context.Schemas.FirstOrDefault(s => s.SchemaId == schemaId && s.UserId == userId);
        return schemaModel == null ? null : ConvertModelToSchema(schemaModel);
    }

    public Guid SaveSchema(Schema schema)
    {
        var guid = Guid.NewGuid();
        schema.Info.SchemaId = guid;

        _context.Schemas.Add(ConvertSchemaToModel(schema));
        _context.SaveChanges();
        return schema.Info.SchemaId;
    }

    public bool UpdateSchema(Guid schemaId, Guid userId, Schema schema)
    {
        var schemaModel = _context.Schemas.FirstOrDefault(s => s.SchemaId == schemaId && s.UserId == userId);
        if(schemaModel == null)
            return false;
        schema.Info.SchemaId = schemaId;
        var newModel = ConvertSchemaToModel(schema);
        _context.Entry(schemaModel).CurrentValues.SetValues(newModel);
        _context.SaveChanges();
        return true;
    }

    private static Schema ConvertModelToSchema(SchemaModel model)
        => new()
        {
            Info = new SchemaInfo
            {
                SchemaId = model.SchemaId,
                UserId = model.UserId,
                Name = model.Name,
                SchemaType = Enum.Parse<SchemaType>(model.Type),
                Width = model.Width,
                Height = model.Height,
                LinesCompleted = model.LinesCompleted,
                CreatedDate = model.CreationDate.ToSortableDateString(),
                LastUpdateDate = model.LastUpdateDate.ToSortableDateString()
            },
            Data = SchemaConverter.FromBinary(CompressionUtils.Decompress(model.Schema))
        };

    private static SchemaModel ConvertSchemaToModel(Schema schema)
        => new()
        {
            SchemaId = schema.Info.SchemaId,
            UserId = schema.Info.UserId,
            Name = schema.Info.Name,
            Type = schema.Info.SchemaType.ToString(),
            Width = schema.Info.Width,
            Height = schema.Info.Height,
            LinesCompleted = schema.Info.LinesCompleted,
            CreationDate = schema.Info.CreatedDate.FromSortableDateTime(),
            LastUpdateDate = schema.Info.LastUpdateDate.FromSortableDateTime(),
            Schema = CompressionUtils.Compress(SchemaConverter.ToBinary(schema.Data))
        };
}