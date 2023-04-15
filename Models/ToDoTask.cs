using System;
namespace ToDoAPI.Models;

public class ToDoTask : ToDoTaskBase
{
    public int Id { get; set; }
    public DateTime CreatedDate { get; set; }
}

public class ToDoTaskBase
{
    public string Title { get; set; } = null!;
    public bool Completed { get; set; } = false;
}
