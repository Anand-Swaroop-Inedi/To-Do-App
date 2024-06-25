
using Models;
using System.Net;
using System.Text.Json;

namespace ToDoAppWebApi
{
    public class ExceptionHandlingMiddleware:IMiddleware
    {
        private readonly ILogger<ExceptionHandlingMiddleware> _logger;

        public ExceptionHandlingMiddleware(ILogger<ExceptionHandlingMiddleware> logger)
        {
            _logger = logger;
        }
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next(context);
            }
            catch (Exception ex)
            {
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                var apiResponse = new ApiResponse
                {
                    Status = 2,
                    Message = "Something Went Wrong"
                };

                var json = JsonSerializer.Serialize(apiResponse);
                await context.Response.WriteAsync(json);
            }
        }
    }
}
