using AutoMapper;
using BusinessLogicLayer.Interfaces;
using DataAccessLayer;
using DataAccessLayer.Entities;
using DataAccessLayer.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BusinessLogicLayer.Services
{
    public class UserManager : IUserManager
    {
        private readonly IMapper _mapper;
        private IConfiguration _config;
        private IUnitOfWork _unitOfWork;
        public UserManager(IMapper mapper, IConfiguration configuration, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _config = configuration;
            _unitOfWork = unitOfWork;
        }
        public async Task<int> AddUser(UserDto user)
        {
            _unitOfWork.BeginTransaction();
            user.Password = PasswordHashing.HashPassword(user.Password);
            User result = await _unitOfWork.UserRepository.GetByUsername(user.UserName);
            if (result != null)
            {
                return 3;
            }
            else
            {
                _unitOfWork.UserRepository.AddUser(_mapper.Map<User>(user));
                _unitOfWork.SaveChanges();
                _unitOfWork.Commit();
                return 1;
            }
        }
        public async Task<int> AuthenticateUser(UserDto user)
        {
            user.Password = PasswordHashing.HashPassword(user.Password);
            User result = await _unitOfWork.UserRepository.AuthenticateUser(_mapper.Map<User>(user));
            if (result != null)
            {
                if (user.Password.Equals(result.Password, StringComparison.OrdinalIgnoreCase))
                {
                    return 1;
                }
                else
                {
                    return 3;
                }
            }
            else
            {
                return 4;
            }
        }
        public async Task<string> GenerateToken(int id)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var tokenDescdriptor = new SecurityTokenDescriptor
            {
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256),
                Issuer = _config["Jwt:Issuer"],
                Audience = _config["Jwt:Audience"]
                ,
                Subject = new ClaimsIdentity(new Claim[] {
                    new Claim("Id",id.ToString())
                })
            };
            var token = new JwtSecurityTokenHandler().CreateToken(tokenDescdriptor);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
