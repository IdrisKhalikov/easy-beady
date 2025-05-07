using EasyBeady.Api.Database.Auth.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace EasyBeady.Api.Database.Auth;

public class UsersDbContext : IdentityDbContext<AppUser, IdentityRole<Guid>, Guid>
{
    public UsersDbContext(DbContextOptions<UsersDbContext> options) : base(options)
    {
    }

}