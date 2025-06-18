using System.Drawing;
using EasyBeady.Api.DataContracts.SchemaContracts;
using EasyBeady.Api.Helpers;
using EasyBeady.Api.Services.SchemaRepository;
using EasyBeady.Api.Utils;
using EasyBeady.Database.Entities.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Internal;
using SixLabors.ImageSharp.PixelFormats;
using Color = SixLabors.ImageSharp.Color;

namespace EasyBeady.Api.Controllers;

[Route("api/schemas")]
[Authorize]
public class SchemasController : ControllerBase
{
    private readonly ISystemClock systemClock;
    private readonly ISchemaRepository schemaRepository;
    private readonly UserManager<AppUser> userManager;

    public SchemasController(
        ISystemClock systemClock,
        ISchemaRepository schemaRepository,
        UserManager<AppUser> userManager)
    {
        this.systemClock = systemClock;
        this.schemaRepository = schemaRepository;
        this.userManager = userManager;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<SchemaInfo>>> GetSchemas()
    {
        var userId = (await userManager.GetUserAsync(HttpContext.User)).Id;
        var schemas = schemaRepository.GetSchemas(userId);
        return schemas.Select(schema => schema.Info).ToList();
    }

    [HttpGet]
    [Route("{schemaId:guid}")]
    public async Task<ActionResult<Schema>> GetSchema(Guid schemaId)
    {
        /* TODO: Есть метод userManager.GetUserId, он не ходит в Store, но возвращает строку
        Нужно посмотреть, совпадает ли наш кастомный id в виде guid-а с содержимым этой строки, и если что перейти на этот метод.*/
        var userId = (await userManager.GetUserAsync(User)).Id;
        var result = schemaRepository.GetSchema(schemaId, userId);
        if(result != null)
            return Ok(result);
        return NotFound("Schema with specified id was not found");
    }

    [HttpPut]
    public async Task<ActionResult<Guid>> PutSchema([FromBody] SchemaCreate? schemaCreate)
    {
        var user = (await userManager.GetUserAsync(User));
        var userId = user.Id;
        if(schemaCreate == null)
            return BadRequest("Schema object is null");

        var nowStr = systemClock.UtcNow.ToSortableDateString();

        var schemaArr = new Rgba32[schemaCreate.Width * schemaCreate.Height];
        schemaArr.AsSpan().Fill(Color.White);

        var schema = new Schema
        {
            Info = new SchemaInfo
            {
                Name = schemaCreate.Name,
                SchemaType = schemaCreate.SchemaType,
                UserId = userId,
                CreatedDate = nowStr,
                LastUpdateDate = nowStr,
                Width = schemaCreate.Width,
                Height = schemaCreate.Height,
                LinesCompleted = new bool[schemaCreate.Width],
                Preview = Convert.ToBase64String(SchemaToImageConverter.MakeImage(schemaArr, schemaCreate.Width, schemaCreate.Height, schemaCreate.SchemaType).ToArray()),
            },
            Data = schemaArr
        };

        var schemaId = schemaRepository.SaveSchema(schema);
        return schemaId;
    }

    [HttpPost]
    [Route("{schemaId:guid}")]
    public async Task<ActionResult<Guid>> UpdateSchema(Guid schemaId, [FromBody] SchemaUpdate? schemaUpdate)
    {
        if(schemaUpdate == null)
            return BadRequest("Schema object is null");
        var validationText = SchemaUpdateValidation(schemaUpdate);
        if (validationText != "OK")
            return BadRequest(validationText);
        var userId = (await userManager.GetUserAsync(User)).Id;
        var schema = schemaRepository.GetSchema(schemaId, userId);
        if (schema == null)
            return NotFound("Schema with specified id was not found");

        var updatedSchema = new Schema
        {
            Info = new SchemaInfo
            {
                Name = schemaUpdate.Name ?? schema.Info.Name,
                SchemaId = schema.Info.SchemaId,
                UserId = schema.Info.UserId,
                SchemaType = schema.Info.SchemaType,
                CreatedDate = schema.Info.CreatedDate,
                LastUpdateDate = systemClock.UtcNow.ToSortableDateString(),
                Width = schemaUpdate.Width ?? schema.Info.Width,
                Height = schemaUpdate.Height ?? schema.Info.Height,
                LinesCompleted = schemaUpdate.LinesCompleted ?? schema.Info.LinesCompleted
            },
            Data = schemaUpdate.Data ?? schema.Data
        };

        updatedSchema.Info.Preview = Convert.ToBase64String(
            SchemaToImageConverter.MakeImage(
                updatedSchema.Data,
                updatedSchema.Info.Width,
                updatedSchema.Info.Height,
                updatedSchema.Info.SchemaType
            ).ToArray()
        );

        var success = schemaRepository.UpdateSchema(schemaId, userId, updatedSchema);
        return success ? Ok(schemaId) : NotFound(schemaId);
    }

    [HttpDelete]
    [Route("{schemaId:guid}")]
    public async Task<IActionResult> DeleteSchema(Guid schemaId)
    {
        var userId = (await userManager.GetUserAsync(User)).Id;
        var deletedSuccessfully = schemaRepository.DeleteSchema(schemaId, userId);
        if(!deletedSuccessfully)
            return NotFound("Schema with specified id was not found");
        return Ok();
    }

    //TODO: Вынести валидацию в отдельный Helper-класс
    private string SchemaUpdateIsNullValidation(SchemaUpdate schemaUpdate)
    {
        if (schemaUpdate.Name is null) 
            return "Name is null";
        if (schemaUpdate.LinesCompleted is null) 
            return "Number of lines is null";
        if (schemaUpdate.Data is null)
            return "Data is null";
        return "OK";
    }

    private string SchemaUpdateValidation(SchemaUpdate schemaUpdate)
    {
        if (schemaUpdate.Name is not null && String.IsNullOrWhiteSpace(schemaUpdate.Name)) 
            return "Name is empty";
        if (schemaUpdate.LinesCompleted is not null && schemaUpdate.LinesCompleted.Length != schemaUpdate.Width) 
            return "Number of lines is invalid";
        if (schemaUpdate.Data is not null && schemaUpdate.Data.Length != schemaUpdate.Width * schemaUpdate.Height) 
            return "Data is empty";
        return "OK";
    }
}