using BusinessLogicLayer.Interfaces;
using DataAccessLayer.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;

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
        [HttpPost("create")]
        public async Task<ApiResponse> AddItem(ItemDto item)
        {
            item.Userid = ClaimsIdentifier.getIdFromToken(HttpContext);
            return await _itemManager.AddItem(item);
        }
        [HttpGet("all")]
        public async Task<ApiResponse> GetAllItems()
        {
            int userId = ClaimsIdentifier.getIdFromToken(HttpContext);
            return await _itemManager.GetAll(userId);
        }
        [HttpDelete("delete")]
        public async Task<ApiResponse> DeleteItem(int id)
        {
            int userId = ClaimsIdentifier.getIdFromToken(HttpContext);
            return await _itemManager.DeleteItem(id,userId);
        }
        [HttpPut("update")]
        public async Task<ApiResponse> UpdateItem(ItemDto item)
        {
            item.Userid = ClaimsIdentifier.getIdFromToken(HttpContext);
            return await _itemManager.UpdateItem(item);
        }
        [HttpGet("active-items")]
        public async Task<ApiResponse> GetActiveItems()
        {
            int userId = ClaimsIdentifier.getIdFromToken(HttpContext);
            return await _itemManager.GetActiveItems(userId);
        }
        [HttpGet("completed-items")]
        public async Task<ApiResponse> GetCompletedItems()
        {
            int userId = ClaimsIdentifier.getIdFromToken(HttpContext);
            return await _itemManager.GetCompletedItems(userId);
        }
        [HttpDelete("delete-all")]
        public async Task<ApiResponse> DeleteAllItems()
        {
            int userId = ClaimsIdentifier.getIdFromToken(HttpContext);
            return await _itemManager.DeleteItems(userId);
        }
        [HttpGet("completion-percentage")]
        public async Task<ApiResponse> CompletionPercentage()
        {
            int userId = ClaimsIdentifier.getIdFromToken(HttpContext);
            return await _itemManager.CompletionPercentage(userId);
        }
        [HttpPost("completed")]
        public async Task<ApiResponse> makeItemCompleted([FromBody]int id)
        {
            int userId = ClaimsIdentifier.getIdFromToken(HttpContext);
            return await _itemManager.makeItemCompleted(id, userId);
        }
    }
}
