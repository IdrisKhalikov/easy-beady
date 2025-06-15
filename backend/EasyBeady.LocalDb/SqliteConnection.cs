using System.Data.Common;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;

namespace EasyBeady.LocalDb;

// Для локального запуска у нас используется in-memory sqlite бд.
// Особенность запуска sqlite in-memory в том, что база создается на каждый connection,
// поэтому можно сделать вот такую обертку, которая "держит" этот connection и умеет отдавать для него контекст
// Взято отсюда - https://d-fens.ch/2022/02/05/using-entityframework-with-sqlite-inmemory-dbconcurrency-and-migrations/
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
            .UseSqlite(connection, options => options.MigrationsAssembly(typeof(SqliteConnection<>).Assembly.GetName().Name))
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