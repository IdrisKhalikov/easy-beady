using EasyBeady.Api.Database;
using EasyBeady.Api.Services.SchemaRepository;
using Microsoft.Extensions.Internal;

namespace EasyBeady.Api.Services;

public static class DependencyInjectionExtensions
{
    public static IServiceCollection AddServiceScope(this IServiceCollection services)
    {
        return services
            .AddSingleton<ISystemClock, SystemClock>()
            .AddTransient<ISchemaRepository, DbSchemaRepository>();
    }
}