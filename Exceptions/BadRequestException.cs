﻿namespace ToDoAPI.Exceptions;

public class BadRequestException : Exception
{
    public BadRequestException(string message) : base(message)
        => Data.Add("code", StatusCodes.Status400BadRequest);
}
