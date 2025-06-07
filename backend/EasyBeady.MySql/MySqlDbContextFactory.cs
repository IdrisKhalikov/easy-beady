using EasyBeady.MySql.Migrations.Credentials;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace EasyBeady.MySql.Migrations;

public class MySqlDbContextFactory<T> : IDbContextFactory<T>
    where T : DbContext
{
    private readonly MySqlDbCredentials<T> credentials;

    public MySqlDbContextFactory(IOptions<MySqlDbCredentials<T>> credentials)
    {
        this.credentials = credentials.Value;
    }

    public T CreateDbContext()
    {
        var options = new DbContextOptionsBuilder<T>()
            .UseMySQL(credentials.ConnectionString)
            .Options;
        return (T) Activator.CreateInstance(typeof(T), options);
    }
}