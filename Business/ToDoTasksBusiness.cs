using Microsoft.EntityFrameworkCore;
using ToDoAPI.Exceptions;
using ToDoAPI.Models;

namespace ToDoAPI.Business
{
    public interface IBusiness
    {
        Task<IEnumerable<ToDoTask>> GetTasks();
        Task<ToDoTask> GetTask(int id);
        Task<ToDoTask> AddTask(string title);
        Task<ToDoTask> UpdateTask(int id, ToDoTaskBase task);
        Task<ToDoTask> DeleteTask(int id);
    }

    public class ToDoTasksBusiness : IBusiness
    {
        public readonly LocalDbContext _context;

        public ToDoTasksBusiness(LocalDbContext context)
            => _context = context;

        public async Task<IEnumerable<ToDoTask>> GetTasks()
            => await _context.ToDoTasks.ToListAsync();

        public async Task<ToDoTask> GetTask(int id)
        {
            if (id <= 0)
                throw new BadRequestException($"Task cannot have id less than 1.");

            ToDoTask? item = await _context.ToDoTasks.FindAsync(id);

            if (item == null)
                throw new NotFoundException($"Task with id:{id} does not exist.");

            return item;
        }

        public async Task<ToDoTask> AddTask(string title)
        {
            ToDoTask task = new() { Title = title };

            _context.ToDoTasks.Add(task);
            await _context.SaveChangesAsync();

            return task;
        }

        public async Task<ToDoTask> UpdateTask(int id, ToDoTaskBase updatedTask)
        {
            ToDoTask task = await GetTask(id);

            if (task.Title != updatedTask.Title)
                task.Title = updatedTask.Title;

            if (task.Completed != updatedTask.Completed)
                task.Completed = updatedTask.Completed;

            await _context.SaveChangesAsync();
            return task;
        }

        public async Task<ToDoTask> DeleteTask(int id)
        {
            if (id <= 0)
                throw new BadRequestException($"Task cannot have id less than 1.");

            ToDoTask? task = await _context.ToDoTasks.FindAsync(id);

            if (task == null)
                throw new NotFoundException($"Task with id:{id} does not exist.");

            _context.ToDoTasks.Remove(task);
            await _context.SaveChangesAsync();

            return task;
        }
    }
}
