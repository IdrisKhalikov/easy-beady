using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EasyBeady.Api.Database.Domain.Migrations
{
    /// <inheritdoc />
    public partial class AddPreviewAndLinesCompletedToArray : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<byte[]>(
                name: "LinesCompleted",
                table: "Schemas",
                type: "tinyblob",
                nullable: false,
                oldClrType: typeof(short),
                oldType: "smallint",
                oldDefaultValueSql: "0");

            migrationBuilder.AddColumn<string>(
                name: "SchemaPreview",
                table: "Schemas",
                type: "text",
                nullable: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SchemaPreview",
                table: "Schemas");

            migrationBuilder.AlterColumn<short>(
                name: "LinesCompleted",
                table: "Schemas",
                type: "smallint",
                nullable: false,
                defaultValueSql: "0",
                oldClrType: typeof(byte[]),
                oldType: "tinyblob");
        }
    }
}
