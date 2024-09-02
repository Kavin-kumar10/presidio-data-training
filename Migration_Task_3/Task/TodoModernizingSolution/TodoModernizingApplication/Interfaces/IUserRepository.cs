using TodoModernizingApplication.Modals;

namespace TodoModernizingApplication.Interfaces
{
    public interface IUserRepository
    {
        public Task<User> Get(string Email);
    }
}
