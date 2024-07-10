﻿using Models.ViewModels;

namespace BusinessLogicLayer.Interfaces
{
    public interface IUserManager
    {
        public Task<int> AuthenticateUser(User user);
        public Task<bool> AddUser(User user);
    }
}
