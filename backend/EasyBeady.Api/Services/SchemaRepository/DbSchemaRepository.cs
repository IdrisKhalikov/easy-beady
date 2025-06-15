using EasyBeady.Api.DataContracts.SchemaContracts;
using EasyBeady.Api.Helpers;
using EasyBeady.Api.Utils;
using EasyBeady.Database.Contexts;
using EasyBeady.Database.Entities.Domain;

namespace EasyBeady.Api.Services.SchemaRepository;

// Методы работы с бд синхронные. Насколько это ок? TODO: Покопать
public class DbSchemaRepository : ISchemaRepository
{
    private readonly SchemasDbContext _context;

    public DbSchemaRepository(SchemasDbContext context)
    {
        _context = context;
    }

    public List<Schema> GetSchemas(Guid userId)
    {
        var schemas = _context.Schemas.Where(s => s.UserId == userId);
        return schemas.AsEnumerable().Select(ConvertModelToSchema).ToList();
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

    public bool DeleteSchema(Guid schemaId, Guid userId)
    {
        var schemaModel = _context.Schemas.FirstOrDefault(s => s.SchemaId == schemaId && s.UserId == userId);
        if(schemaModel == null)
            return false;
        _context.Schemas.Remove(schemaModel);
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
                LinesCompleted = BinaryUtils.ConvertBinaryToBoolArray(model.LinesCompleted, model.Width),
                CreatedDate = model.CreationDate.ToSortableDateString(),
                LastUpdateDate = model.LastUpdateDate.ToSortableDateString(),
                Preview = model.SchemaPreview
            },
            Data = SchemaConverter.FromBinary(BinaryUtils.Decompress(model.Schema))
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
            LinesCompleted = BinaryUtils.ConvertBoolArrayToBinary(schema.Info.LinesCompleted),
            CreationDate = schema.Info.CreatedDate.FromSortableDateTime(),
            LastUpdateDate = schema.Info.LastUpdateDate.FromSortableDateTime(),
            SchemaPreview = schema.Info.Preview,
            Schema = BinaryUtils.Compress(SchemaConverter.ToBinary(schema.Data))
        };
}