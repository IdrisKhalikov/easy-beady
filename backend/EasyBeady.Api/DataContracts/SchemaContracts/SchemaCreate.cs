using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace EasyBeady.Api.DataContracts.SchemaContracts;

[DataContract(Name = "schemaCreate", Namespace = "")]
public class SchemaCreate
{
    [DataMember(Name = "name")]
    public string Name { get; set; }

    [JsonConverter(typeof(JsonStringEnumConverter))]
    [DataMember(Name="schemaType")]
    public SchemaType SchemaType { get; set; }

    [DataMember(Name = "wdith")]
    public int Width { get; set; }

    [DataMember(Name = "height")]
    public int Height { get; set; }
}