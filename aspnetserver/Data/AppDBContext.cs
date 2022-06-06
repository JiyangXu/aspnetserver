using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace aspnetserver.Data
{
    internal sealed class AppDBContext : DbContext
    {
        public DbSet<Post> Posts { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder dbContextOptionsBuilder) =>
            dbContextOptionsBuilder.UseSqlServer("Server=.;Database=EmployeeDb;Trusted_Connection=True;MultipleActiveResultSets=True");
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            Post[] postsToSeed = new Post[6];

            for (int i = 1; i <= 6; i++)
            {
                postsToSeed[i - 1] = new Post
                {
                    PostId = Guid.NewGuid(),
                    Title = $"Post {i}",
                    Content =
                        $"This is post {i} and it has some very interesting content. I have also liked to the video and subscribed"
                };
            }

            modelBuilder.Entity<Post>().HasData(postsToSeed);
        }

    }
}
