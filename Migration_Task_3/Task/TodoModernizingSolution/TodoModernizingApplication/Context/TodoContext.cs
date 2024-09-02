using TodoModernizingApplication.Modals;
using Microsoft.EntityFrameworkCore;

namespace TodoModernizingApplication.Context
{
    public class TodoContext : DbContext
    {
        public TodoContext(DbContextOptions<TodoContext> options) : base(options)
        {
        }
        public DbSet<Member> Members { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Member>()
                .HasMany(m => m.Todos)
                .WithOne(t => t.Member)
                .HasForeignKey(t => t.MemberId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Member>()
                .Navigation(m => m.Todos)
                .AutoInclude();
                
        }


    }
}
