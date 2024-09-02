using TodoModernizingApplication.Interfaces;
using TodoModernizingApplication.Modals;
using TodoModernizingApplication.Models;

namespace TodoModernizingApplication.Services
{
    public class MemberServices : BaseServices<Member>
    {
        public MemberServices(IRepository<int, Member> repo) : base(repo)
        {
        }
    }
}
