using BusinessLogicLayer.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace ToDoAppWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
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
            return await _itemManager.AddItem(item);
        }
        [HttpGet("all")]
        public async Task<ApiResponse> GetAllItems()
        {
            return await _itemManager.GetAll();
        }
        [HttpDelete("delete")]
        public async Task<ApiResponse> DeleteItem(int id)
        {
            return await _itemManager.DeleteItem(id);
        }
        [HttpPut("update")]
        public async Task<ApiResponse> UpdateItem(ItemDto item)
        {
            return await _itemManager.UpdateItem(item);
        }
        [HttpGet("active-items")]
        public async Task<ApiResponse> GetActiveItems()
        {
            return await _itemManager.GetActiveItems();
        }
        [HttpGet("completed-items")]
        public async Task<ApiResponse> GetCompletedItems()
        {
            return await _itemManager.GetCompletedItems();
        }
        [HttpDelete("delete-all")]
        public async Task<ApiResponse> DeleteAllItems()
        {
            return await _itemManager.DeleteItems();
        }
        [HttpGet("completion-percentage")]
        public async Task<ApiResponse> CompletionPercentage()
        {
            return await _itemManager.CompletionPercentage();
        }
        [HttpPost("completed")]
        public async Task<ApiResponse> makeItemCompleted([FromBody]int id)
        {
            return await _itemManager.makeItemCompleted(id);
        }
    }
}
