using TodoModernizingApplication.Context;
using TodoModernizingApplication.Models;

namespace TodoModernizingApplication.Repositories
{
    public class TodoRepository: BaseRepository<Todo>
    {
        public TodoRepository(TodoContext context) : base(context)
        {
        }
    }
}
