using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace EasyBeady.Api.DataContracts.SchemaContracts;

[DataContract(Name = "schemaUpdate", Namespace = "")]
public class SchemaUpdate
{
    [DataMember(Name = "name")]
    public string? Name { get; set; }

    [JsonConverter(typeof(JsonStringEnumConverter))]
    [DataMember(Name="schemaType")]
    public SchemaType? SchemaType { get; set; }

    [DataMember(Name = "linesCompleted")]
    public int? LinesCompleted { get; set; }

    [DataMember(Name = "data")]
    public int[][]? Data { get; set; }
}