using System.ComponentModel.DataAnnotations;
using System.Drawing;
using System.Runtime.Serialization;
using Newtonsoft.Json;

namespace EasyBeady.Api.DataContracts.SchemaContracts;

[DataContract(Name = "schemaUpdate", Namespace = "")]
public class SchemaUpdate
{
    [StringLength(255)]
    [DataMember(Name = "name")]
    public string? Name { get; set; }

    [DataMember(Name = "linesCompleted")]
    public bool[]? LinesCompleted { get; set; }

    [DataMember(Name = "width")]
    public int? Width { get; set; }
    
    [DataMember(Name = "height")]
    public int? Height { get; set; }

    [JsonProperty(ItemConverterType = typeof(ColorConverter))]
    [DataMember(Name = "data")]
    public Color[]? Data { get; set; }
}