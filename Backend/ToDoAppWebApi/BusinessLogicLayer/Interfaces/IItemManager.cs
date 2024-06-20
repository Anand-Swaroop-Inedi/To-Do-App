using DataAccessLayer.Entities;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Interfaces
{
    public interface IItemManager
    {
        public Task<ApiResponse> AddItem(ItemDto task);
        public  Task<ApiResponse> GetAll(int userId);
        public Task<ApiResponse> UpdateItem(ItemDto task);
        public Task<ApiResponse> DeleteItem(int id, int userId);
        public Task<ApiResponse> GetActiveItems(int userId);
        public Task<ApiResponse> GetCompletedItems(int userId);
        public Task<ApiResponse> DeleteItems(int userId);
        public Task<ApiResponse> CompletionPercentage(int userId);
        public Task<ApiResponse> makeItemCompleted(int id, int userId);

    }
}
