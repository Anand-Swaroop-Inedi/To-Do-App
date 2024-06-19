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
        public Task<ApiResponse> AddTask(Useritem item);
        public Task<ApiResponse> DeleteTask(int id);
        public Task<ApiResponse> GetAllTasks();
        public Task<ApiResponse> UpdateTask(Useritem item);
    }
}
