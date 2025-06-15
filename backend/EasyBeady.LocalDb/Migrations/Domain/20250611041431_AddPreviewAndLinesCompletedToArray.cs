using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EasyBeady.LocalDb.Migrations.Domain
{
    /// <inheritdoc />
    public partial class AddPreviewAndLinesCompletedToArray : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "LinesCompleted",
                table: "Schemas",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddColumn<string>(
                name: "SchemaPreview",
                table: "Schemas",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SchemaPreview",
                table: "Schemas");

            migrationBuilder.AlterColumn<Guid>(
                name: "UserId",
                table: "Schemas",
                type: "BLOB",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<int>(
                name: "LinesCompleted",
                table: "Schemas",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<Guid>(
                name: "SchemaId",
                table: "Schemas",
                type: "BLOB",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "TEXT");
        }
    }
}
