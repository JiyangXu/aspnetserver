using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace aspnetserver.Data.Migrations
{
    public partial class FirstMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Posts",
                columns: table => new
                {
                    PostId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Content = table.Column<string>(type: "nvarchar(max)", maxLength: 10000, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Posts", x => x.PostId);
                });

            migrationBuilder.InsertData(
                table: "Posts",
                columns: new[] { "PostId", "Content", "Title" },
                values: new object[,]
                {
                    { new Guid("003cfcd1-aa14-4c11-bd0d-fcc7a90b29c3"), "This is post 2 and it has some very interesting content. I have also liked to the video and subscribed", "Post 2" },
                    { new Guid("4bb509be-6fdf-42ed-8297-2848dfd7c1ee"), "This is post 3 and it has some very interesting content. I have also liked to the video and subscribed", "Post 3" },
                    { new Guid("7355c658-fe59-4f9c-a55b-edf54c4c8548"), "This is post 6 and it has some very interesting content. I have also liked to the video and subscribed", "Post 6" },
                    { new Guid("9155b358-a674-4233-9b55-4b6786ca499c"), "This is post 5 and it has some very interesting content. I have also liked to the video and subscribed", "Post 5" },
                    { new Guid("a4e9b455-36e1-4e2a-b40a-b165fd899227"), "This is post 4 and it has some very interesting content. I have also liked to the video and subscribed", "Post 4" },
                    { new Guid("cddd0057-ad45-458f-80d8-a6e1c9ff79e4"), "This is post 1 and it has some very interesting content. I have also liked to the video and subscribed", "Post 1" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Posts");
        }
    }
}
