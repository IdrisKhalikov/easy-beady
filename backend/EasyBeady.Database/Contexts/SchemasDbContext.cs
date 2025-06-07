using EasyBeady.Database.Entities.Domain;
using Microsoft.EntityFrameworkCore;

namespace EasyBeady.Database.Contexts;

public class SchemasDbContext : DbContext
{
    public DbSet<SchemaModel> Schemas { get; set; }

    public SchemasDbContext(DbContextOptions<SchemasDbContext> options) : base(options)
    {
    }
}