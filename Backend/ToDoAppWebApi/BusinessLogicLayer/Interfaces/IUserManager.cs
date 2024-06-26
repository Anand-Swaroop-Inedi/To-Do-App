using Models;

namespace BusinessLogicLayer.Interfaces
{
    public interface IUserManager
    {
        public Task<int> AuthenticateUser(UserDto user);
        public Task<int> AddUser(UserDto user);
        public Task<string> GenerateToken(int id);
    }
}
