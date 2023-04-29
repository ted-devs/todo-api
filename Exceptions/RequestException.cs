namespace ToDoAPI.Exceptions;

public class RequestException : Exception
{
    public RequestException(string message, int statusCode, string title) : base(message) 
    {
        Data.Add("code", statusCode);
        Data.Add("title", title);
    }
}

public class BadRequestException : RequestException
{
    public BadRequestException(string message) 
        : base(message, StatusCodes.Status400BadRequest, "Bad Request") { }
}

public class NotFoundException : RequestException
{
    public NotFoundException(string message) 
        : base(message, StatusCodes.Status404NotFound, "Not Found") { }
}
