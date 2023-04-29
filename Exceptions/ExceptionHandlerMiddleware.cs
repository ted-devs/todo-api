using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Text.Json;

namespace ToDoAPI.Exceptions;

public class ExceptionHandlerMiddleware
{
    private readonly RequestDelegate _next;

    public ExceptionHandlerMiddleware(RequestDelegate next) => _next = next;

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            await HandleExceptions(context, ex);
        }
    }

    private static Task HandleExceptions(HttpContext context, Exception ex)
    {
        ProblemDetails problem = new()
        {
            Status = (int?)ex.Data["code"],
            Title = (string?)ex.Data["title"],
            Detail = ex.Message,
            Instance = context.Request.Path
        };

        if (ex is not RequestException)
        {
            problem.Status = 500;
            problem.Title = "Internal Server Error";
        }

        context.Response.ContentType = "application/json";

        return context.Response.WriteAsync(JsonSerializer.Serialize(problem));
    }
}
