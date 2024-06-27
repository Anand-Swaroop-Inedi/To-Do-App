using BusinessLogicLayer.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;
using Common.Enums;
using messages = Common.Enums.Messages;
using Response = Models.Response;

namespace ToDoAppWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ItemController : ControllerBase
    {
        private readonly IItemManager _itemManager;
        public ItemController(IItemManager itemManager)
        {
            _itemManager = itemManager;
        }
        [HttpPost("add")]
        public async Task<Response> AddItem(Item item)
        {
            item.Userid = HttpContext.GetIdFromToken();
            bool result = await _itemManager.AddItem(item);
            if (result)
            {
                return new Response
                {
                    Status = (int)messages.Success,
                    Message = "Task Added Successfully"
                };

            }
            else
            {
                return new Response
                {
                    Status = (int)messages.Failure,
                    Message = "Task already exists"
                };
            }
        }
        [HttpGet("all-items")]
        public async Task<Response> GetAllItems()
        {
            int userId = HttpContext.GetIdFromToken();
            return new Response
            {
                Status = (int)messages.Success,
                Message = messages.Success.GetEnumDescription(),
                Result = await _itemManager.GetAll(userId)
            };
        }
        [HttpDelete("")]
        public async Task<Response> DeleteItem(int id)
        {
            int userId = HttpContext.GetIdFromToken();
            bool result = await _itemManager.DeleteItem(id, userId);
            if (result)
            {
                return new Response
                {
                    Status = (int)messages.Success,
                    Message = "Task Deleted from the list successfully"
                };
            }
            else
            {
                return new Response
                {
                    Status = (int)messages.Failure,
                    Message = "Task Id doesn't exist"
                };
            }
        }
        [HttpPut("")]
        public async Task<Response> UpdateItem(Item item)
        {
            item.Userid = HttpContext.GetIdFromToken();
            await _itemManager.UpdateItem(item);
            return new Response
            {
                Status = (int)messages.Success,
                Message = "Updated successfully",
            };
        }
        [HttpGet("active-items")]
        public async Task<Response> GetActiveItems()
        {
            int userId = HttpContext.GetIdFromToken();
            return new Response { Status = (int)messages.Success, Message =messages.Success.GetEnumDescription(), Result = await _itemManager.GetActiveItems(userId) };
        }
        [HttpGet("completed-items")]
        public async Task<Response> GetCompletedItems()
        {
            int userId = HttpContext.GetIdFromToken();
            return new Response { Status = (int)messages.Success, Message =messages.Success.GetEnumDescription(), Result = await _itemManager.GetCompletedItems(userId) };
        }
        [HttpDelete("all")]
        public async Task<Response> DeleteAllItems()
        {
            int userId = HttpContext.GetIdFromToken();
            _itemManager.DeleteItems(userId);
            return new Response
            {
                Status = (int)messages.Success,
                Message = "All Tasks Deleted from the your list successfully"
            };
        }
        [HttpGet("completion-percentage")]
        public async Task<Response> CompletionPercentage()
        {
            int userId = HttpContext.GetIdFromToken();
            return new Response
            {
                Status = (int)messages.Success,
                Message = messages.Success.GetEnumDescription(),
                Result = await _itemManager.CompletionPercentage(userId)
            };
        }
        [HttpPost("completed")]
        public async Task<Response> makeItemCompleted([FromBody] int id)
        {
            int userId = HttpContext.GetIdFromToken();
            bool result = await _itemManager.makeItemCompleted(id, userId);
            if (result)
            {
                return new Response
                {
                    Status = (int)messages.Success,
                    Message = "Task Updated as completed"
                };
            }
            else
            {
                return new Response
                {
                    Status = (int)messages.Failure,
                    Message = "Task not found"
                };
            }
        }
        [HttpPost("active")]
        public async Task<Response> makeItemActive([FromBody] int id)
        {
            int userId = HttpContext.GetIdFromToken();
            bool result = await _itemManager.makeItemActive(id, userId);
            if (result)
            {
                return new Response
                {
                    Status = (int)messages.Success,
                    Message = "Task Updated as active"
                };
            }
            else
            {
                return new Response
                {
                    Status = (int)messages.Failure,
                    Message = "Task not found"
                };
            }
        }
        [HttpGet("pending-items")]
        public async Task<Response> GetPendingTasks(string property, string order)
        {
            int userId = HttpContext.GetIdFromToken();
            return new Response { Status = (int)messages.Success, Message = messages.Success.GetEnumDescription(), Result = await _itemManager.GetPendingTasks(userId, property, order) };
        }
    }
}
