using TodoModernizingApplication.Context;
using TodoModernizingApplication.Interfaces;
using TodoModernizingApplication.Modals;
using Microsoft.EntityFrameworkCore;

namespace TodoModernizingApplication.Repositories
{
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        TodoContext _context;
        public UserRepository(TodoContext context) : base(context)
        {
            _context = context;
        }

        public async Task<User> Get(string Email)
        {
            var allMember = await _context.Set<User>().ToListAsync();
            var res = allMember.FirstOrDefault(m => m.Email == Email);
            if (res == null) return null;
            return res;
        }
    }
}
