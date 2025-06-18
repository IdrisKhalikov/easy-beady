using System.Text.Json.Serialization;
using EasyBeady.Api.Services;
using EasyBeady.Api.Utils;
using EasyBeady.Database.Contexts;
using EasyBeady.Database.Entities.Auth;
using EasyBeady.LocalDb;
using EasyBeady.MySql.Migrations;
using EasyBeady.MySql.Migrations.Credentials;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var authBuilder = builder.Services.AddAuthentication(options =>
    {
        options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
        options.DefaultSignInScheme = "Google";
    })
    .AddCookie("Application", options =>
    {
        options.Cookie.HttpOnly = false;
        options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
        options.Cookie.SameSite = SameSiteMode.Strict;
    });

if (builder.Configuration.GetValue<bool>("UseGoogleAuth"))
{
    authBuilder
        .AddCookie("Google")
        .AddGoogleOpenIdConnect(options =>
        {
            options.SignInScheme = "Google";
            options.CallbackPath = "/api/account/login-callback/";
            options.ClientId = builder.Configuration["GoogleAuthData:ClientId"];
            options.ClientSecret = builder.Configuration["GoogleAuthData:ClientSecret"];
        });
}
    
builder.Services.AddAuthorization();


if (builder.Environment.IsDevelopment())
{
    builder.Services
        .AddSingleton<SqliteConnection<UsersDbContext>>()
        .AddSingleton<SqliteConnection<SchemasDbContext>>()
        .AddSingleton<IDbContextFactory<UsersDbContext>, LocalDbContextFactory<UsersDbContext>>()
        .AddSingleton<IDbContextFactory<SchemasDbContext>, LocalDbContextFactory<SchemasDbContext>>();
}
else
{
    builder.Services.Configure<MySqlDbCredentials<UsersDbContext>>(builder.Configuration.GetSection(nameof(UsersDbContext)));
    builder.Services.Configure<MySqlDbCredentials<SchemasDbContext>>(builder.Configuration.GetSection(nameof(SchemasDbContext)));
    builder.Services
        .AddSingleton<IDbContextFactory<UsersDbContext>, MySqlDbContextFactory<UsersDbContext>>()
        .AddSingleton<IDbContextFactory<SchemasDbContext>, MySqlDbContextFactory<SchemasDbContext>>();
}

builder.Services.AddScoped<UsersDbContext>(provider => provider.GetService<IDbContextFactory<UsersDbContext>>().CreateDbContext());
builder.Services.AddScoped<SchemasDbContext>(provider => provider.GetService<IDbContextFactory<SchemasDbContext>>().CreateDbContext());



builder.Services
    .AddIdentityApiEndpoints<AppUser>()
    .AddEntityFrameworkStores<UsersDbContext>();

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
        options.JsonSerializerOptions.Converters.Add(new ColorJsonConverter());
    });
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddServiceScope();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseHsts();
    app.UseSwagger();
    app.UseSwaggerUI(options => options.SwaggerEndpoint("https://localhost:7291/swagger/v1/swagger.json", "v1"));
}

app.UseHttpsRedirection();
app.UseRouting();
app.UseCors(options => options.AllowAnyMethod().AllowAnyHeader().AllowCredentials().WithOrigins("http://*:3000"));
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.MapGroup("/api/account").MapIdentityApi<AppUser>();

app.UseHttpsRedirection();
app.Run("https://*:7291");