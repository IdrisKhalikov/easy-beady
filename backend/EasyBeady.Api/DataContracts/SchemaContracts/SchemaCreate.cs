using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace EasyBeady.Api.DataContracts.SchemaContracts;

[DataContract(Name = "schemaCreate", Namespace = "")]
public class SchemaCreate
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    [DataMember(Name="schemaType")]
    public SchemaType SchemaType { get; set; }

    [DataMember(Name = "data")]
    public int[][] Data { get; set; }
}