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

        var schema = new Schema
        {
            Info = new SchemaInfo
            {
                Name = schemaUpdate.Name,
                CreatedDate = systemClock.UtcNow.ToSortableDateString(),
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

        schemaRepository.UpdateSchema(schemaId, updatedSchema);
        return Ok(schemaId);
    }
}