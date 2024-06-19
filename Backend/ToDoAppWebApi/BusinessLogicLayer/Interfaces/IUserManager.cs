using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Interfaces
{
    public interface IUserManager
    {
        public Task<ApiResponse> GetAllUsers();
        public  Task<ApiResponse> AddUser(UserDto user);
    }
}
