using BusinessLogicLayer.Interfaces;
using Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models.ViewModels;
using messages = Common.Enums.Messages;

namespace ToDoAppWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : Controller
    {
        private readonly IUserManager _userManager;
        private readonly TokenGenerator _tokenGenerator;
        public AuthenticationController(IUserManager userManager, TokenGenerator tokenGenerator)
        {
            _userManager = userManager;
            _tokenGenerator = tokenGenerator;
        }
        [HttpPost()]
        public async Task<Response> AuthenticateUser(User user)
        {

            int result = await _userManager.AuthenticateUser(user);
            if (result != 0)
            {
                return new Response
                {
                    Status = (int)messages.Success,
                    Message = "successfully logged in",
                    Result = await _tokenGenerator.GenerateToken(result)
                };
            }
            else
            {
                return new Response
                {
                    Status = (int)messages.Failure,
                    Message = "Enter Correct Details",
                };
            }
        }
        [Authorize]
        [HttpGet("regenerate")]
        public async Task<Response> RegenerateToken()
        {
            int userId = HttpContext.GetIdFromToken();
            return new Response
            {
                Status = (int)messages.Success,
                Message = "successful",
                Result = await _tokenGenerator.GenerateToken(userId)
            };
        }
    }
}
