using TodoModernizingApplication.Context;
using TodoModernizingApplication.Interfaces;
using TodoModernizingApplication.Modals;
using Microsoft.EntityFrameworkCore;

namespace TodoModernizingApplication.Repositories
{
    public class MemberRepository : BaseRepository<Member>, IMemberRepository
    {
        TodoContext _context;
        public MemberRepository(TodoContext context) : base(context)
        {
            _context = context; 
        }
        public async Task<Member> Get(string Email)
        {
            var allMember = await _context.Set<Member>().ToListAsync();
            var res = allMember.FirstOrDefault(m => m.Email == Email);
            if (res == null) return null;
            return res;
        }
    }
}
