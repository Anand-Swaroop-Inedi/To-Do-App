using DataAccessLayer.Entities;
using DataAccessLayer.Interfaces;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Repositories
{
    public class UserRepository: IUserRepository
    {
        private readonly ToDoAppContext _context;
        public UserRepository(ToDoAppContext toDoAppContext) {
            _context = toDoAppContext;
        }
        public async Task<ApiResponse> AddUser(User user)
        {
            try
            {
                string result = _context.Users.Where(u => u.Username == user.Username).Select(u => u.Password).FirstOrDefault();
                if (result != null)
                {
                    if (PasswordHashing.VerifyPassword(result, user.Password))
                    {
                        return new ApiResponse
                        {
                            StatusCode = 200,
                            Message = "successfully logged in"
                        };

                    }
                    else
                    {
                        return new ApiResponse
                        {
                            StatusCode = 200,
                            Message = "Password is Incorrect"
                        };
                    }
                }
                else
                {
                    user.Password = PasswordHashing.HashPassword(user.Password);   
                    Console.WriteLine(user.Password + " " + user.Username);
                    _context.Users.Add(user);
                    _context.SaveChanges();
                    return new ApiResponse
                    {
                        StatusCode = 200,
                        Message = "Successfully registered"
                    };
                }
            }
            catch(Exception ex)
            {
                return new ApiResponse
                {
                    StatusCode = 500,
                    Message = ex.Message
                };
            }
        }
        public async Task<ApiResponse> GetAllUsers()
        {
            try
            {
                return new ApiResponse 
                    { StatusCode=200,Message="Successful",result= _context.Users.ToList()};

            }
            catch(Exception e)
            {
                return new ApiResponse
                {
                    StatusCode = 500,
                    Message = e.Message
                };
            }
        }
    }
}
