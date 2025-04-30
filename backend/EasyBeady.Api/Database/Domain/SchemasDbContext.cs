using EasyBeady.Api.Database.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace EasyBeady.Api.Database.Domain;

public class SchemasDbContext : DbContext
{
    public DbSet<SchemaModel> Schemas { get; set; }

    public SchemasDbContext(DbContextOptions<SchemasDbContext> options) : base(options)
    {
    }
}