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
            => Ok(await _business.GetTasks());

        [HttpGet("{id}")]
        [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Get))]
        public async Task<ActionResult<ToDoTask>> GetTask(int id)
            => Ok(await _business.GetTask(id));

        [HttpPost]
        [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Post))]
        public async Task<ActionResult<ToDoTask>> AddTask(string title)
            => Ok(await _business.AddTask(title));

        [HttpPut("{id}")]
        [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Put))]
        public async Task<ActionResult<ToDoTask>> UpdateTask(int id, [FromBody] ToDoTaskBase task)
            => Ok(await _business.UpdateTask(id, task));
        
        [HttpDelete("{id}")]
        [ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Delete))]
        public async Task<ActionResult<ToDoTask>> DeleteTask(int id)
            => Ok(await _business.DeleteTask(id));
    }
}
