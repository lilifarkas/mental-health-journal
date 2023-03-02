using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace MentalHealth.Migrations
{
    /// <inheritdoc />
    public partial class treeRefactor : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MoodTracker",
                columns: table => new
                {
                    ID = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MoodTracker", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Trees",
                columns: table => new
                {
                    ID = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OwnerId = table.Column<int>(type: "int", nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false),
                    Progress = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Trees", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    ID = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Points = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "UserTasks",
                columns: table => new
                {
                    ID = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TaskName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Complete = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserTasks", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "TrackerUserJoins",
                columns: table => new
                {
                    ID = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MoodTrackerID = table.Column<long>(type: "bigint", nullable: false),
                    UserID = table.Column<long>(type: "bigint", nullable: false),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrackerUserJoins", x => x.ID);
                    table.ForeignKey(
                        name: "FK_TrackerUserJoins_MoodTracker_MoodTrackerID",
                        column: x => x.MoodTrackerID,
                        principalTable: "MoodTracker",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TreeUser",
                columns: table => new
                {
                    TreesID = table.Column<long>(type: "bigint", nullable: false),
                    UsersID = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TreeUser", x => new { x.TreesID, x.UsersID });
                    table.ForeignKey(
                        name: "FK_TreeUser_Trees_TreesID",
                        column: x => x.TreesID,
                        principalTable: "Trees",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TreeUser_Users_UsersID",
                        column: x => x.UsersID,
                        principalTable: "Users",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserUserTask",
                columns: table => new
                {
                    UserTasksID = table.Column<long>(type: "bigint", nullable: false),
                    UsersID = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserUserTask", x => new { x.UserTasksID, x.UsersID });
                    table.ForeignKey(
                        name: "FK_UserUserTask_UserTasks_UserTasksID",
                        column: x => x.UserTasksID,
                        principalTable: "UserTasks",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserUserTask_Users_UsersID",
                        column: x => x.UsersID,
                        principalTable: "Users",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "MoodTracker",
                columns: new[] { "ID", "Description" },
                values: new object[,]
                {
                    { 1L, 0 },
                    { 2L, 1 },
                    { 3L, 2 },
                    { 4L, 3 },
                    { 5L, 4 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_TrackerUserJoins_MoodTrackerID",
                table: "TrackerUserJoins",
                column: "MoodTrackerID");

            migrationBuilder.CreateIndex(
                name: "IX_TreeUser_UsersID",
                table: "TreeUser",
                column: "UsersID");

            migrationBuilder.CreateIndex(
                name: "IX_UserUserTask_UsersID",
                table: "UserUserTask",
                column: "UsersID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TrackerUserJoins");

            migrationBuilder.DropTable(
                name: "TreeUser");

            migrationBuilder.DropTable(
                name: "UserUserTask");

            migrationBuilder.DropTable(
                name: "MoodTracker");

            migrationBuilder.DropTable(
                name: "Trees");

            migrationBuilder.DropTable(
                name: "UserTasks");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
