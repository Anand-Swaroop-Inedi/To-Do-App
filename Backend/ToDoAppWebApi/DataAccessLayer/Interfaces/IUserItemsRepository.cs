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
        public Task<ApiResponse> DeleteItem(int id, int UserId);
        public Task<ApiResponse> GetAllItems(int UserId);
        public Task<ApiResponse> UpdateItem(Useritem item);
        public Task<ApiResponse> GetActiveItems(int UserId);
        public Task<ApiResponse> GetCompletedItems(int UserId);
        public Task<ApiResponse> DeleteItems(int UserId);
        public Task<ApiResponse> CompletionPercentage(int UserId);
        public  Task<ApiResponse> makeItemCompleted(int id, int UserId);

    }
}
