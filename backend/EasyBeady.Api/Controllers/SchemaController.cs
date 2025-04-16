using EasyBeady.Api.DataContracts.SchemaContracts;
using EasyBeady.Api.Services.SchemaRepository;
using EasyBeady.Api.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Internal;

namespace EasyBeady.Api.Controllers;

[Route("api/schemas")]
public class SchemaController : ControllerBase
{
    private readonly ISystemClock systemClock;
    private readonly ISchemaRepository schemaRepository;

    public SchemaController(ISystemClock systemClock, ISchemaRepository schemaRepository)
    {
        this.systemClock = systemClock;
        this.schemaRepository = schemaRepository;
    }

    [HttpGet]
    [Route("{schemaId:guid}")]
    public ActionResult<Schema> GetSchema(Guid schemaId)
    {
        var result = schemaRepository.GetSchema(schemaId);
        if(result != null)
            return Ok(result);
        return NotFound("Schema with specified id was not found");
    }

    [HttpPut]
    public ActionResult<Guid> PutSchema([FromBody] SchemaUpdate? schemaUpdate)
    {
        if(schemaUpdate == null)
            return BadRequest("Schema object is null");
        var isNullText = SchemaUpdateIsNullValidation(schemaUpdate);
        if (isNullText != "OK")
            return BadRequest(isNullText);
        var validationText = SchemaUpdateValidation(schemaUpdate);
        if (validationText != "OK")
            return BadRequest(validationText);

        var nowStr = systemClock.UtcNow.ToSortableDateString();
        var schema = new Schema
        {
            Info = new SchemaInfo
            {
                Name = schemaUpdate.Name,
                CreatedDate = nowStr,
                LastUpdateDate = nowStr,
                Width = schemaUpdate.Data.Max(row => row.Length),
                Height = schemaUpdate.Data.Length
            },
            Data = schemaUpdate.Data
        };

        var schemaId = schemaRepository.SaveSchema(schema);
        return schemaId;
    }

    [HttpPost]
    [Route("{schemaId:guid}")]
    public ActionResult<Guid> UpdateSchema(Guid schemaId, [FromBody] SchemaUpdate? schemaUpdate)
    {
        if(schemaUpdate == null)
            return BadRequest("Schema object is null");
        var validationText = SchemaUpdateValidation(schemaUpdate);
        if (validationText != "OK")
            return BadRequest(validationText);
        var schema = schemaRepository.GetSchema(schemaId);
        if (schema == null)
            return NotFound("Schema with specified id was not found");

        var updatedSchema = new Schema
        {
            Info = new SchemaInfo
            {
                Name = schemaUpdate.Name ?? schema.Info.Name,
                SchemaType = schemaUpdate.SchemaType ?? schema.Info.SchemaType,
                CreatedDate = schema.Info.CreatedDate,
                LastUpdateDate = systemClock.UtcNow.ToSortableDateString(),
                Width = schemaUpdate.Data?.Max(row => row.Length) ?? schema.Info.Width,
                Height = schemaUpdate.Data?.Length ?? schema.Data.Length,
                LinesCompleted = schemaUpdate.LinesCompleted ?? schema.Info.LinesCompleted
            },
            Data = schemaUpdate.Data ?? schema.Data
        };

        var success = schemaRepository.UpdateSchema(schemaId, updatedSchema);
        return success ? Ok(schemaId) : NotFound(schemaId);
    }

    private String SchemaUpdateIsNullValidation(SchemaUpdate schemaUpdate)
    {
        if (schemaUpdate.Name is null) 
            return "Name is null";
        if (schemaUpdate.SchemaType is null)
            return "Type is null";
        if (schemaUpdate.LinesCompleted is null) 
            return "Number of lines is null";
        if (schemaUpdate.Data is null)
            return "Data is null";
        return "OK";
    }

    private String SchemaUpdateValidation(SchemaUpdate schemaUpdate)
    {
        if (schemaUpdate.Name is not null && String.IsNullOrWhiteSpace(schemaUpdate.Name)) 
            return "Name is empty";
        if (schemaUpdate.LinesCompleted is not null && schemaUpdate.LinesCompleted < 0) 
            return "Number of lines is invalid";
        if (schemaUpdate.Data is not null && schemaUpdate.Data.Count(x => x.Length > 0) == 0) 
            return "Data is empty";
        if (schemaUpdate.Data is not null && schemaUpdate.Data.Count(x => x.Any(y => y < 0 || y > 16777215)) > 0) 
            return "Data is incorrect";
        return "OK";
    }
}