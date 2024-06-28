using BusinessLogicLayer.Interfaces;
using Microsoft.AspNetCore.Mvc;
using messages = Common.Enums.Messages;
using Response = Models.Response;

namespace ToDoAppWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserManager _userManager;
        public UserController(IUserManager userManager)
        {
            _userManager = userManager;
        }
        [HttpPost("add")]
        public async Task<Response> AddUser(Models.User user)
        {
            Boolean result = await _userManager.AddUser(user);
            if (result)
            {
                return new Response
                {
                    Status = (int)messages.Success,
                    Message = "Successfully registered",
                };
            }
            return new Response
            {
                Status = (int)messages.Failure,
                Message = "UserName Already Exists so choose other",
            };

        }
    }
}
