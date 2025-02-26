using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApiWithPostgres.Migrations
{
    /// <inheritdoc />
    public partial class RemovePhoneFromProduct : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Phone",
                table: "Products");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Phone",
                table: "Products",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
