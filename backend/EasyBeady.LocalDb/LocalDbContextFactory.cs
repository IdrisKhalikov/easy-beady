using Microsoft.EntityFrameworkCore;

namespace EasyBeady.LocalDb;

public class LocalDbContextFactory<T> : IDbContextFactory<T>
    where T : DbContext
{
    private readonly SqliteConnection<T> sqliteConnection;

    public LocalDbContextFactory(SqliteConnection<T> sqliteConnection)
    {
        this.sqliteConnection = sqliteConnection;
    }

    public T CreateDbContext() => sqliteConnection.CreateContext();
}