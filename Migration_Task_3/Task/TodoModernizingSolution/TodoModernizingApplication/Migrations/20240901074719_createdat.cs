using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TodoModernizingApplication.Migrations
{
    public partial class createdat : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "lastUpdated",
                table: "Todo",
                newName: "CreatedAt");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "Todo",
                newName: "lastUpdated");
        }
    }
}
