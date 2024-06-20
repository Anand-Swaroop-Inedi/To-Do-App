using AutoMapper;
using BusinessLogicLayer.Interfaces;
using DataAccessLayer.Entities;
using DataAccessLayer.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Services
{
    public class UserManager: IUserManager
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private IConfiguration _config;
        public UserManager(IUserRepository userRepository,IMapper mapper,IConfiguration configuration) 
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _config = configuration;
        }
        public async Task<ApiResponse> AddUser(UserDto user)
        {
            return await _userRepository.AddUser(_mapper.Map<User>(user));
        }
        public async Task<ApiResponse> AuthenticateUser(UserDto user)
        {
            ApiResponse response= await _userRepository.AuthenticateUser(_mapper.Map<User>(user));
            if(response.StatusCode == 200 && (int)response.result>0)
            {
                response.result = GenerateToken((int)response.result);
            }
            return response;
        }
        public async Task<ApiResponse> GetAllUsers()
        {
            return await _userRepository.GetAllUsers();
        }
        private string GenerateToken(int id)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var tokenDescdriptor = new SecurityTokenDescriptor
            {
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256),
                Issuer = _config["Jwt:Issuer"],
                Audience = _config["Jwt:Audience"]
                ,Subject = new ClaimsIdentity(new Claim[] {
                    new Claim("Id",id.ToString())
                })
            };
            var token= new JwtSecurityTokenHandler().CreateToken(tokenDescdriptor);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
