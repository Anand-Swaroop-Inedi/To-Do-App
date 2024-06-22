using AutoMapper;
using BusinessLogicLayer.Interfaces;
using DataAccessLayer.Entities;
using DataAccessLayer.Interfaces;
using Microsoft.AspNetCore.Http;
using Models;
using System.Net.Http;

namespace BusinessLogicLayer.Services
{
    public class ItemManager : IItemManager
    {
        private readonly IItemsRepository _taskRepository;
        private readonly IUserItemsRepository _userItemsRepository;
        private readonly IMapper _mapper;
        //private readonly IHttpContextAccessor  _httpContextAccessor;
        public ItemManager(IItemsRepository taskRepository, IUserItemsRepository usersItemsRepository, IMapper mapper)
        {
            _taskRepository = taskRepository;
            _userItemsRepository = usersItemsRepository;
            _mapper = mapper;
           
        }
        public async Task<ApiResponse> AddItem(ItemDto item)
        {
            //item.Userid=_httpContextAccessor.HttpContext.User.FindFirst<
            ApiResponse response = await _taskRepository.AddItem(_mapper.Map<Item>(item));
            if (response != null && response.StatusCode == 200)
            {
                item.Itemid = (int)response.result;
                return await _userItemsRepository.AddItem(_mapper.Map<Useritem>(item));
            }
            else
            {
                {
                    return response;
                }
            }
        }
        public async Task<ApiResponse> GetAll(int userId)
        {
            ApiResponse apiResponse = await _userItemsRepository.GetAllItems(userId);
            apiResponse.result = _mapper.Map<List<ItemDto>>(apiResponse.result);
            return apiResponse;
        }
        public async Task<ApiResponse> UpdateItem(ItemDto item)
        {
            ApiResponse response = await _taskRepository.GetId(_mapper.Map<Item>(item));
            if (response.StatusCode == 200)
            {
                item.Itemid = (int)response.result;
                return await _userItemsRepository.UpdateItem(_mapper.Map<Useritem>(item));
            }
            else
            {
                return response;
            }

        }
        public async Task<ApiResponse> DeleteItem(int id, int userId)
        {
            return await _userItemsRepository.DeleteItem(id, userId);
        }
        public async Task<ApiResponse> DeleteItems(int userId)
        {
            return await _userItemsRepository.DeleteItems(userId);
        }
        public async Task<ApiResponse> GetActiveItems(int userId)
        {
            //int userId = ClaimsIdentifier.getIdFromToken(HttpContext);
            ApiResponse apiResponse = await _userItemsRepository.GetActiveItems(userId);
            apiResponse.result = _mapper.Map<List<ItemDto>>(apiResponse.result);
            return apiResponse;
        }
        public async Task<ApiResponse> GetCompletedItems(int userId)
        {
            ApiResponse apiResponse = await _userItemsRepository.GetCompletedItems(userId);
            apiResponse.result = _mapper.Map<List<ItemDto>>(apiResponse.result);
            return apiResponse;
        }
        public async Task<ApiResponse> CompletionPercentage(int userId)
        {
            return await _userItemsRepository.CompletionPercentage(userId);
        }
        public async Task<ApiResponse> makeItemCompleted(int id, int userId)
        {
            return await _userItemsRepository.makeItemCompleted(id, userId);
        }
        public async Task<ApiResponse> makeItemActive(int id, int UserId)
        {
            return await _userItemsRepository.makeItemActive(id, UserId);
        }
    }
}
