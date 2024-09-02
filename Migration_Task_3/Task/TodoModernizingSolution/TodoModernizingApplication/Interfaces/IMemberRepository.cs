using TodoModernizingApplication.Modals;
using Microsoft.EntityFrameworkCore;

namespace TodoModernizingApplication.Interfaces
{
    public interface IMemberRepository
    {
        public Task<Member> Get(string Email);
    }
}
