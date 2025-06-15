using EasyBeady.Database.Contexts;
using EasyBeady.MySql.Migrations.Credentials;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace EasyBeady.MySql.Migrations;

public class DesignTimeDbContextFactory<T> : IDesignTimeDbContextFactory<T>
    where T : DbContext
{
    private static Dictionary<string, ApplicationMode> ModeMappings = Enum.GetValues<ApplicationMode>().ToDictionary(m => m.ToString(), m => m);

    public T CreateDbContext(string[] args)
    {
        var configuration = new ConfigurationBuilder()
            .AddCommandLine(args, new Dictionary<string, string>
            {
                { "--connection", $"{typeof(T).Name}:ConnectionString" },
                { "--mode", "Mode"}
            })
            .AddJsonFile("appsettings.json", optional: true)
            .Build();

        var modeStr = configuration.GetValue<string>("Mode") ?? ApplicationMode.MigrationAdd.ToString();
        var mode = ModeMappings[modeStr];

        var credentials = configuration.GetSection(typeof(T).Name).Get<MySqlDbCredentials<T>>();
        if (credentials == null && mode == ApplicationMode.MigrationApply)
            throw new Exception($"Connection string is required for {ApplicationMode.MigrationApply} mode");

        credentials ??= new MySqlDbCredentials<T>();

        return new MySqlDbContextFactory<T>(credentials).CreateDbContextForMigrations();
    }
}

// Кажется, dotnet ef не умеет создавать эксземпляр generic-фабрики, поэтому пока так

public class DesignTimeUsersDbContextFactory : DesignTimeDbContextFactory<UsersDbContext>
{
}

public class DesignTimeSchemasDbContextFactory : DesignTimeDbContextFactory<SchemasDbContext>
{
}