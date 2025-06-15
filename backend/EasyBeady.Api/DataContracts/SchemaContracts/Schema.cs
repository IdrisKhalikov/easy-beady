using System.Drawing;
using System.Runtime.Serialization;

namespace EasyBeady.Api.DataContracts.SchemaContracts;

[DataContract(Name = "schema", Namespace = "")]
public class Schema
{
    [DataMember(Name = "info")]
    public SchemaInfo Info { get; set; }

    [DataMember(Name = "data")]
    public Color[] Data { get; set; }
}