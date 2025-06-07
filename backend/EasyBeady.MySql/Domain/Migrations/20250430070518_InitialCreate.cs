using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EasyBeady.Api.Database.Domain.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Schemas",
                columns: table => new
                {
                    SchemaId = table.Column<Guid>(type: "binary(16)", nullable: false),
                    UserId = table.Column<Guid>(type: "binary(16)", nullable: false),
                    Name = table.Column<string>(type: "varchar(255)", nullable: false),
                    Type = table.Column<string>(type: "varchar(20)", nullable: false),
                    Width = table.Column<int>(type: "smallint", nullable: false),
                    Height = table.Column<int>(type: "smallint", nullable: false),
                    LinesCompleted = table.Column<int>(type: "smallint", nullable: false),
                    CreationDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    LastUpdateDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    Schema = table.Column<byte[]>(type: "mediumblob", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Schemas", x => x.SchemaId);
                })
                .Annotation("MySQL:Charset", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Schemas");
        }
    }
}
