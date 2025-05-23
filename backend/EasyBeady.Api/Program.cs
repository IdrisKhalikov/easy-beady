using System.Text.Json.Serialization;
using EasyBeady.Api.Database.Auth;
using EasyBeady.Api.Database.Auth.Models;
using EasyBeady.Api.Database.Domain;
using EasyBeady.Api.Services;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthorization();
builder.Services.AddAuthentication(options =>
    {
        options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
        options.DefaultSignInScheme = "Google";
    })
    .AddCookie("Application", options =>
    {
        options.Cookie.HttpOnly = false;
        options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
        options.Cookie.SameSite = SameSiteMode.Strict;
    })
    .AddCookie("Google")
    .AddGoogleOpenIdConnect(options =>
    {
        options.SignInScheme = "Google";
        options.CallbackPath = "/api/account/login-callback/";
        options.ClientId = builder.Configuration["GoogleAuthData:ClientId"];
        options.ClientSecret = builder.Configuration["GoogleAuthData:ClientSecret"];
    });


var configuration = builder.Configuration;
builder.Services.AddDbContext<SchemasDbContext>(options => options.UseMySQL(configuration.GetConnectionString("SchemasConnection")));
builder.Services.AddDbContext<UsersDbContext>(options => options.UseMySQL(configuration.GetConnectionString("UsersConnection")));

builder.Services.AddControllers()
    .AddJsonOptions(options => options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));

builder.Services
    .AddIdentityApiEndpoints<AppUser>()
    .AddEntityFrameworkStores<UsersDbContext>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddServiceScope();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseHsts();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.MapGroup("/api/account").MapIdentityApi<AppUser>();

app.UseHttpsRedirection();
app.Run();