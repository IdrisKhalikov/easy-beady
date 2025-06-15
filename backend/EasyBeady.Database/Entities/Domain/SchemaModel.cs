using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EasyBeady.Database.Entities.Domain;

public class SchemaModel
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.None)]
    [Column(TypeName = "binary(16)")]
    public Guid SchemaId { get; set; }

    [Required]
    [Column(TypeName = "binary(16)")]
    public Guid UserId { get; set; }

    [Required]
    [StringLength(255)]
    public string Name { get; set; }

    [Required]
    [StringLength(20)]
    public string Type { get; set; }

    [Required]
    [Column(TypeName = "smallint")]
    public int Width { get; set; }

    [Required]
    [Column(TypeName = "smallint")]
    public int Height { get; set; }

    [Required]
    [Column(TypeName = "tinyblob")]
    public byte[] LinesCompleted { get; set; }

    [Required]
    [Column(TypeName = "datetime")]
    public DateTime CreationDate { get; set; }

    [Required]
    [Column(TypeName = "datetime")]
    public DateTime LastUpdateDate { get; set; }

    [Required]
    [Column(TypeName = "mediumblob")]
    public byte[] Schema { get; set; }

    [Required]
    [Column(TypeName = "text")]
    public string SchemaPreview { get; set; }
}