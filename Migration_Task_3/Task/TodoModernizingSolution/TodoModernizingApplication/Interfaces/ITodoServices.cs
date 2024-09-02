using TodoModernizingApplication.Models;
using TodoModernizingApplication.Models.DTOs.RequestDTO;

namespace TodoModernizingApplication.Interfaces
{
    public interface ITodoServices
    {
        public Task<Todo> CreateTodo(TodoReqDTO todoReqDTO);
        public Task<Todo> updateTodo(TodoReqDTO todoReqDTO);
        public Task<IEnumerable<Todo>> getMyTodo(int MemberId);

    }
}
