using EasyBeady.MySql.Migrations.Credentials;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace EasyBeady.MySql.Migrations;

public class MySqlDbContextFactory<T> : IDbContextFactory<T>
    where T : DbContext
{
    private readonly MySqlDbCredentials<T> credentials;

    public MySqlDbContextFactory(IOptions<MySqlDbCredentials<T>> credentials) : this(credentials.Value)
    {
    }

    public MySqlDbContextFactory(MySqlDbCredentials<T> credentials)
    {
        this.credentials = credentials;
    }

    public T CreateDbContextForMigrations()
    {
        if (string.IsNullOrEmpty(credentials.ConnectionString))
        {
            var options = new DbContextOptionsBuilder<T>()
                .UseMySQL(options => options.MigrationsAssembly(typeof(MySqlDbContextFactory<>).Assembly.GetName().Name))
                .Options;

            return (T)Activator.CreateInstance(typeof(T), options);
        }

        return CreateDbContext();
    }

    public T CreateDbContext()
    {
        var options = new DbContextOptionsBuilder<T>()
            .UseMySQL(credentials.ConnectionString, options => options.MigrationsAssembly(typeof(MySqlDbContextFactory<>).Assembly.GetName().Name))
            .Options;
        return (T) Activator.CreateInstance(typeof(T), options);
    }
}