using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace EasyBeady.Api.DataContracts.SchemaContracts;

[DataContract(Name = "schemaInfo", Namespace = "")]
public class SchemaInfo
{
    [DataMember(Name = "name")]
    public string Name { get; set; }

    [DataMember(Name = "schemaId")]
    public Guid SchemaId { get; set; }

    [JsonConverter(typeof(JsonStringEnumConverter))]
    [DataMember(Name="schemaType")]
    public SchemaType SchemaType { get; set; }

    [DataMember(Name = "width")]
    public int Width { get; set; }
    
    [DataMember(Name = "height")]
    public int Height { get; set; }

    [DataMember(Name = "linesCompleted")]
    public int LinesCompleted { get; set; }

    [DataMember(Name = "creationDate")]
    public string CreatedDate { get; set; }

    [DataMember(Name = "lastUpdatedDate")]
    public string LastUpdateDate { get; set; }
}