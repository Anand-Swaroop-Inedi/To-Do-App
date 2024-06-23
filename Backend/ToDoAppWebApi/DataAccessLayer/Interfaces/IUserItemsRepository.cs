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
        public Task<Useritem> checkItemCompleted(Useritem item);
        public Task<int> checkItemLinkingExists(Useritem item);
        public Task Update(Useritem item);
        public Task AddItem(Useritem item);
        public Task<List<Useritem>> GetAll(int userId);
        public Task<Useritem> GetItemById(int id, int userId);
        public Task DeleteItem(Useritem item, int UserId);
        public Task DeleteAllItems(int UserId);
        public  Task<List<Useritem>> GetActiveItems(int UserId);
        public Task<List<Useritem>> GetCompletedItems(int UserId);
        public Task<int> GetCompletedItemsCount(int userId);
        public Task<int> TotalItemsCount(int userId);

        /*public Task<ApiResponse> AddItem(Useritem item);
        public Task<ApiResponse> DeleteItem(int id, int UserId);
        public Task<ApiResponse> GetAllItems(int UserId);
        public Task<ApiResponse> UpdateItem(Useritem item);
        public Task<ApiResponse> GetActiveItems(int UserId);
        public Task<ApiResponse> GetCompletedItems(int UserId);
        public Task<ApiResponse> DeleteItems(int UserId);
        public Task<ApiResponse> CompletionPercentage(int UserId);
        public  Task<ApiResponse> makeItemCompleted(int id, int UserId);
        public Task<ApiResponse> makeItemActive(int id, int UserId);*/

    }
}
