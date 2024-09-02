using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics.CodeAnalysis;
using TodoModernizingApplication.Interfaces;
using TodoModernizingApplication.Modals;
using TodoModernizingApplication.Models;
using TodoModernizingApplication.Models.DTOs.RequestDTO;

namespace TodoModernizingApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private IServices<int, Todo> _service;
        private ITodoServices _todoServices;
        private ILogger<TodoController> _logger;

        public TodoController(IServices<int, Todo> service, ILogger<TodoController> logger, ITodoServices todoServices)
        {
            _service = service;
            _logger = logger;
            _todoServices = todoServices;
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Todo>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status404NotFound)]
        [ExcludeFromCodeCoverage]

        public async Task<ActionResult<IEnumerable<Todo>>> GetAllTodos()
        {
            try
            {
                var result = await _service.GetAll();
                _logger.LogInformation("Get all the Todos");
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(new ErrorModel(404, ex.Message));
            }
        }

        [HttpGet]
        [Route("GetByMemberId")]
        [ProducesResponseType(typeof(IEnumerable<Todo>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status404NotFound)]
        [ExcludeFromCodeCoverage]

        public async Task<ActionResult<IEnumerable<Todo>>> GetMyTodos(int MemberId)
        {
            try
            {
                var result = await _todoServices.getMyTodo(MemberId);
                _logger.LogInformation("Get all the Todos");
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(new ErrorModel(404, ex.Message));
            }
        }

        [HttpPost]
        [ProducesResponseType(typeof(IEnumerable<Todo>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status404NotFound)]
        [ExcludeFromCodeCoverage]

        public async Task<ActionResult<IEnumerable<Todo>>> PostNewTodo(TodoReqDTO todoReqDTO)
        {
            try
            {
                var result = await _todoServices.CreateTodo(todoReqDTO);
                _logger.LogInformation("Create new Todo");
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(new ErrorModel(404, ex.Message));
            }
        }

        [HttpPut]
        [ProducesResponseType(typeof(Todo), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status404NotFound)]
        [ExcludeFromCodeCoverage]

        public async Task<ActionResult<Todo>> UpdateTodo(Todo todo)
        {
            try
            {
                var result = await _service.Update(todo);
                _logger.LogInformation("Update Todo");
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(new ErrorModel(404, ex.Message));
            }
        }


        [HttpDelete]
        [ProducesResponseType(typeof(Todo), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status404NotFound)]
        [ExcludeFromCodeCoverage]

        public async Task<ActionResult<Todo>> DeleteTodo(int TodoId)
        {
            try
            {
                var result = await _service.Delete(TodoId);
                _logger.LogInformation("Delete Todo");
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(new ErrorModel(404, ex.Message));
            }
        }
    };
};
