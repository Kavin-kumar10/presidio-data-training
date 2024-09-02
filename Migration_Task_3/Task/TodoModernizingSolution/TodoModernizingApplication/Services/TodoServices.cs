using TodoModernizingApplication.Interfaces;
using TodoModernizingApplication.Modals;
using TodoModernizingApplication.Models;
using TodoModernizingApplication.Models.DTOs.RequestDTO;

namespace TodoModernizingApplication.Services
{
    public class TodoServices : BaseServices<Todo>, ITodoServices
    {
        IRepository<int, Todo> _repo;
        public TodoServices(IRepository<int, Todo> repo) : base(repo)
        {
            _repo = repo;
        }

        public async Task<Todo> CreateTodo(TodoReqDTO todoReqDTO)
        {
            Todo todo = new Todo();
            todo.MemberId = todoReqDTO.MemberId;
            todo.TentativeEndDate = todoReqDTO.TentativeDate;
            todo.Title = todoReqDTO.Title;
            var result = await _repo.Add(todo);
            return result;
        }

        public async Task<IEnumerable<Todo>> getMyTodo(int MemberId)
        {
            var allTodos = await _repo.Get();
            var result = allTodos.Where((t)=>t.MemberId == MemberId);
            return result;
            
        }

        public async Task<Todo> updateTodo(TodoReqDTO todoReqDTO)
        {
            Todo todo = new Todo();
            todo.MemberId = todoReqDTO.MemberId;
            todo.TentativeEndDate = todoReqDTO.TentativeDate;
            todo.Title = todoReqDTO.Title;
            todo.Status = todoReqDTO.TodoStatus;
            var result = await _repo.Update(todo);
            return result;
            throw new NotImplementedException();
        }
    }
}
