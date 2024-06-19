using DataAccessLayer.Entities;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Interfaces
{
    public interface IUserRepository
    {
        public Task<ApiResponse> AddUser(User user);
        public Task<ApiResponse> GetAllUsers();
    }
}
