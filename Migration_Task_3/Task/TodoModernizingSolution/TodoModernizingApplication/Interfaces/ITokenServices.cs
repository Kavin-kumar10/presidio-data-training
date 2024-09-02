using TodoModernizingApplication.Modals;
using TodoModernizingApplication.Models;

namespace TodoModernizingApplication.Interfaces
{
    public interface ITokenServices
    {
        public string GenerateToken(Member member);
    }
}
