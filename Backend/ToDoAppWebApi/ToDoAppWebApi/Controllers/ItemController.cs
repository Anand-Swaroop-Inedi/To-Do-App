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
        public async Task<ApiResponse> GetAllItem()
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
    }
}
