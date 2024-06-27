using AutoMapper;
using BusinessLogicLayer.Interfaces;
using Common;
using DataAccessLayer.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using EntitiesUser = DataAccessLayer.Entities.User;
using ModelsUser = Models.User;

namespace BusinessLogicLayer.Services
{
    public class UserManager : IUserManager
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public UserManager(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }
        public async Task<bool> AddUser(ModelsUser user)
        {
            _unitOfWork.BeginTransaction();
            user.Password = PasswordHashing.HashPassword(user.Password);
            EntitiesUser result = await _unitOfWork.UserRepository.GetByUsername(user.UserName);
            if (result != null)
            {
                return false;
            }
            else
            {
                _unitOfWork.UserRepository.AddUser(_mapper.Map<EntitiesUser>(user));
                _unitOfWork.SaveChanges();
                _unitOfWork.Commit();
                return true;
            }
        }
        public async Task<int> AuthenticateUser(ModelsUser user)
        {
            user.Password = PasswordHashing.HashPassword(user.Password);
            EntitiesUser result = await _unitOfWork.UserRepository.AuthenticateUser(_mapper.Map<EntitiesUser>(user));
            if (result != null)
            {
                if (user.Password.Equals(result.Password, StringComparison.OrdinalIgnoreCase))
                {
                    return result.Id;
                }
            }
            return 0;
        }
    }
}
