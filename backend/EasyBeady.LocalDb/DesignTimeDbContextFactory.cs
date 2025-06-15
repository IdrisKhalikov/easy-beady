using EasyBeady.Database.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace EasyBeady.LocalDb;

public class DesignTimeDbContextFactory<T> : IDesignTimeDbContextFactory<T>
    where T : DbContext
{
    public T CreateDbContext(string[] args)
    {
        var connection = new SqliteConnection<T>();
        return new LocalDbContextFactory<T>(connection).CreateDbContext();
    }
}

// Кажется, dotnet ef не умеет создавать эксземпляр generic-фабрики, поэтому пока так

public class DesignTimeUsersDbContextFactory : DesignTimeDbContextFactory<UsersDbContext>
{
}

public class DesignTimeSchemasDbContextFactory : DesignTimeDbContextFactory<SchemasDbContext>
{
}