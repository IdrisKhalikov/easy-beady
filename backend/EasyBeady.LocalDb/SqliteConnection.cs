using System.Data.Common;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;

namespace EasyBeady.LocalDb;

public class SqliteConnection<T> : IDisposable
    where T: DbContext
{
    private readonly DbConnection connection;
    private readonly DbContextOptions<T> contextOptions;

    public SqliteConnection()
    {
        connection = new SqliteConnection("DataSource=:memory:");
        connection.Open();
        contextOptions = new DbContextOptionsBuilder<T>()
            .UseSqlite(connection, options => options.MigrationsAssembly("EasyBeady.LocalDb"))
            .Options;
        
        using var context = CreateContext();
        context.Database.Migrate();
    }

    public T CreateContext()
    {
        return (T) Activator.CreateInstance(typeof(T), contextOptions);
    }

    public void Dispose()
    {
        connection.Dispose();
    }
}