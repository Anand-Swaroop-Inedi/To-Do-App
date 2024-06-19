using BusinessLogicLayer.Interfaces;
using BusinessLogicLayer.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;

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
        [HttpPost]
        public async Task<ApiResponse> AddUser(UserDto user)
        {
            return await _userManager.AddUser(user);
        }
        [HttpGet]
        public async Task<ApiResponse> GetAllTasks()
        {
            return await _userManager.GetAllUsers();
        }
    }
}
