using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace EasyBeady.Api.DataContracts.SchemaContracts;

[DataContract(Name = "schemaCreate", Namespace = "")]
public class SchemaCreate
{
    [Required]
    [StringLength(255)]
    [DataMember(Name = "name")]
    public string Name { get; set; }

    [Required]
    [JsonConverter(typeof(JsonStringEnumConverter))]
    [DataMember(Name="schemaType")]
    public SchemaType SchemaType { get; set; }

    [Required]
    [DataMember(Name = "width")]
    public int Width { get; set; }

    [Required]
    [DataMember(Name = "height")]
    public int Height { get; set; }
}