using AutoMapper;
using BusinessLogicLayer.Interfaces;
using DataAccessLayer.Entities;
using DataAccessLayer.Interfaces;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Services
{
    public class UserManager: IUserManager
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public UserManager(IUserRepository userRepository,IMapper mapper) 
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }
        public async Task<ApiResponse> AddUser(UserDto user)
        {
            return await _userRepository.AddUser(_mapper.Map<User>(user));
        }
        public async Task<ApiResponse> GetAllUsers()
        {
            return await _userRepository.GetAllUsers();
        }
    }
}
