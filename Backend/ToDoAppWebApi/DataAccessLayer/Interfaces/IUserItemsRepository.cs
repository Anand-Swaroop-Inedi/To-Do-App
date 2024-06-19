using DataAccessLayer.Entities;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Interfaces
{
    public interface IUserItemsRepository
    {
        public Task<ApiResponse> AddItem(Useritem item);
        public Task<ApiResponse> DeleteItem(int id);
        public Task<ApiResponse> GetAllItems();
        public Task<ApiResponse> UpdateItem(Useritem item);
        public Task<ApiResponse> GetActiveItems();
        public Task<ApiResponse> GetCompletedItems();
        public Task<ApiResponse> DeleteItems();
        public Task<ApiResponse> CompletionPercentage();
        public  Task<ApiResponse> makeItemCompleted(int id);

    }
}
