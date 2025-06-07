using System.ComponentModel.DataAnnotations;

namespace EasyBeady.Database.Entities.Domain;

public class SchemaModel
{
    [Key]
    public Guid SchemaId { get; set; }
    public Guid UserId { get; set; }
    public string Name { get; set; }
    public string Type { get; set; }
    public int Width { get; set; }
    public int Height { get; set; }
    public int LinesCompleted { get; set; }
    public DateTime CreationDate { get; set; }
    public DateTime LastUpdateDate { get; set; }
    public byte[] Schema { get; set; }
}