using Microsoft.AspNetCore.Mvc;
using ToDoAPI.Business;
using ToDoAPI.Models;

namespace ToDoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToDoTasksController : ControllerBase
    {
        private readonly IBusiness _business;

        public ToDoTasksController(IBusiness business)
            => _business = business;

        [HttpGet]
        [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Get))]
        public async Task<ActionResult<IEnumerable<ToDoTask>>> GetTasks()
        {
            try
            {
                return Ok(await _business.GetTasks());
            }
            catch (Exception ex)
            {
                return Problem(
                    detail: ex.Message,
                    statusCode: (int?)ex.Data["code"]
                );
            }
        }

        [HttpGet("{id}")]
        [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Get))]
        public async Task<ActionResult<ToDoTask>> GetTask(int id)
        {
            try
            {
                return Ok(await _business.GetTask(id));
            }
            catch (Exception ex)
            {
                return Problem(
                    detail: ex.Message,
                    statusCode: (int?)ex.Data["code"]
                );
            }
        }
        [HttpPost]
        [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Post))]
        public async Task<ActionResult<ToDoTask>> AddTask(string title)
        {
            try
            {
                return Ok(await _business.AddTask(title));
            }
            catch (Exception ex)
            {
                return Problem(
                    detail: ex.Message,
                    statusCode: (int?)ex.Data["code"]
                );
            }
        }

        [HttpPut("{id}")]
        [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Put))]
        public async Task<ActionResult<ToDoTask>> UpdateTask(int id, [FromBody] ToDoTaskBase task)
        {
            try
            {
                return Ok(await _business.UpdateTask(id, task));
            }
            catch (Exception ex)
            {
                return Problem(
                    detail: ex.Message,
                    statusCode: (int?)ex.Data["code"]
                );
            }
        }
        
        [HttpDelete("{id}")]
        [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Delete))]
        public async Task<ActionResult<ToDoTask>> DeleteTask(int id)
        {
            try
            {
                return Ok(await _business.DeleteTask(id));
            }
            catch (Exception ex)
            {
                return Problem(
                    detail: ex.Message,
                    statusCode: (int?)ex.Data["code"]
                );
            }
        }
    }
}
