using System.Security.Claims;
using EasyBeady.Api.Database.Auth.Models;
using EasyBeady.Api.DataContracts.UserContracts;
using Google.Apis.Auth.AspNetCore3;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace EasyBeady.Api.Controllers;

[Route("api/account")]
public class AccountController(SignInManager<AppUser> signInManager, UserManager<AppUser> userManager) : ControllerBase
{
    [HttpGet("googleLogin")]
    public IActionResult GoogleLogin(string returnUrl = "/swagger/index.html")
    {
        return new ChallengeResult(GoogleOpenIdConnectDefaults.AuthenticationScheme, new AuthenticationProperties
        {
            IsPersistent = true,
            RedirectUri = Url.Action("GoogleLoginCallback", "Account", new { ReturnUrl = returnUrl })
        });
    }

    [HttpGet("login-callback")]
    public async Task<ActionResult> GoogleLoginCallback(string returnUrl)
    {
        // Сейчас при авторизаци создается два cookie - один от гугла, второй - стандартный Application.
        // TODO: Разобраться, можно ли добавлять cookie только один раз, при авторизации через схему Application
        var authResult = await HttpContext.AuthenticateAsync(GoogleOpenIdConnectDefaults.AuthenticationScheme);
        if (!authResult.Succeeded)
        {
            return BadRequest(authResult.Failure);
        }

        // В claim-е nameidentifier возвращается число,а не guid, поэтому пока привязываемся к email-у
        // TODO: Разобраться, можно ли как то получать сразу guid через claim nameidentifier
        var email = authResult.Principal.FindFirstValue(ClaimTypes.Email);
        if(string.IsNullOrEmpty(email))
            return BadRequest("Email was not provided!");

        var existingUser = await userManager.FindByEmailAsync(email);
        if (existingUser != null)
        {
            await signInManager.SignInAsync(existingUser, isPersistent: true);
            return Redirect(returnUrl);
        }

        var user = new AppUser
        {
            Id = Guid.NewGuid(),
            UserName = email,
            Email = email,
        };

        await userManager.CreateAsync(user);

        var claims = authResult.Principal.Claims.Where(c => c.Type != ClaimTypes.NameIdentifier).ToList();
        claims.Add(new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()));

        await userManager.AddClaimsAsync(user, claims);
        await signInManager.SignInAsync(user, true, "Application");

        return LocalRedirect(returnUrl);
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        //TODO: Научиться удалять cookie при выходе из аккаунта
        await signInManager.SignOutAsync();
        return Ok();
    }

    [HttpGet("info")]
    public async Task<IActionResult> GetUserInfo()
    {
        if(!User.Identity.IsAuthenticated)
            return Unauthorized();
        var user = await userManager.GetUserAsync(User);

        var userInfo =  new UserInfo
        {
            Username = user.UserName,
            AvatarUrl = User.FindFirstValue("picture")
        };

        return Ok(userInfo);
    }
}