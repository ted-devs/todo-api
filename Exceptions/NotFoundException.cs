namespace ToDoAPI.Exceptions;

public class NotFoundException : Exception
{
    public NotFoundException(string message) : base(message) 
        => Data.Add("code", StatusCodes.Status404NotFound);
}
