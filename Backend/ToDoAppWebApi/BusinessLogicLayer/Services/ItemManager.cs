using AutoMapper;
using BusinessLogicLayer.Interfaces;
using DataAccessLayer.Entities;
using DataAccessLayer.Interfaces;
using Models;

namespace BusinessLogicLayer.Services
{
    public class ItemManager : IItemManager
    {
        private readonly IItemsRepository _taskRepository;
        private readonly IUserItemsRepository _userItemsRepository;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        //private readonly IHttpContextAccessor  _httpContextAccessor;
        public ItemManager(IItemsRepository taskRepository, IUserItemsRepository usersItemsRepository, IMapper mapper, IUnitOfWork unitOfWork)
        {
            _taskRepository = taskRepository;
            _userItemsRepository = usersItemsRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }
        public async Task<ApiResponse> AddItem(ItemDto item)
        {
            try
            {
                _unitOfWork.BeginTransaction();
                string time = DateTime.Now.ToString("MM/dd/yyyy hh:mm:ss tt");
                int statusId = await _unitOfWork.StatusRepository.getIdByName("ACTIVE");
                int result = await _unitOfWork.ItemRepository.checkItemExists(_mapper.Map<Item>(item));
                if (result > 0)
                {

                    item.Itemid = result;
                    result = await _unitOfWork.UserItemRepository.checkItemLinkingExists(_mapper.Map<Useritem>(item));
                    if (result > 0)
                    {
                        return new ApiResponse
                        {
                            StatusCode = 500,
                            Message = "Task already exists"
                        };
                    }
                    Useritem u = await _unitOfWork.UserItemRepository.checkItemCompleted(_mapper.Map<Useritem>(item));
                    if (u != null)
                    {
                        u.Statusid = statusId;
                        u.Createdon = time;
                        await _unitOfWork.UserItemRepository.Update(u);
                    }
                    else
                    {
                        item.Statusid = statusId;
                        item.Createdon = time;
                        await _unitOfWork.UserItemRepository.AddItem(_mapper.Map<Useritem>(item));
                    }

                }
                else
                {
                    await _unitOfWork.ItemRepository.Add(_mapper.Map<Item>(item));
                    item.Itemid = await _unitOfWork.ItemRepository.recentlyAddedId() + 1;
                    item.Createdon = time;
                    item.Statusid = statusId;
                    await _unitOfWork.UserItemRepository.AddItem(_mapper.Map<Useritem>(item));
                }
                _unitOfWork.Commit();
                return new ApiResponse
                {
                    StatusCode = 200,
                    Message = "Task added successfully"
                };

            }
            catch (Exception ex)
            {
                _unitOfWork.Rollback();
                var apiResponse = new ApiResponse
                {
                    StatusCode = 500,
                    Message = ex.Message
                };
                return apiResponse;
            }
        }
        public async Task<ApiResponse> GetAll(int userId)
        {
            try
            {
                return new ApiResponse
                {
                    StatusCode = 200,
                    Message = "Successful",
                    result = _mapper.Map<List<ItemDto>>(await _unitOfWork.UserItemRepository.GetAll(userId))
                };
            }
            catch (Exception ex)
            {
                return new ApiResponse
                {
                    StatusCode = 500,
                    Message = ex.Message
                };
            }
        }
        public async Task<ApiResponse> UpdateItem(ItemDto item)
        {
            try
            {
                _unitOfWork.BeginTransaction();
                int result = await _unitOfWork.ItemRepository.checkItemExists(_mapper.Map<Item>(item));
                if (result == 0)
                {
                    await _unitOfWork.ItemRepository.Add(_mapper.Map<Item>(item));
                    item.Itemid = await _unitOfWork.ItemRepository.recentlyAddedId() + 1;
                }
                else
                {
                    item.Itemid = result;
                }
                item.Isdeleted = 0;
                await _unitOfWork.UserItemRepository.Update(_mapper.Map<Useritem>(item));
                _unitOfWork.Commit();
                return new ApiResponse
                {
                    StatusCode = 200,
                    Message = "Updated successfully"
                };
            }
            catch (Exception ex)
            {
                return new ApiResponse
                {
                    StatusCode = 500,
                    Message = ex.Message
                };
            }
        }
        public async Task<ApiResponse> DeleteItem(int id, int userId)
        {
            try
            {
                Useritem result = await _unitOfWork.UserItemRepository.GetItemById(id, userId);
                if (result != null)
                {
                    await _unitOfWork.UserItemRepository.DeleteItem(result, userId);
                    _unitOfWork.Commit();
                    return new ApiResponse
                    {
                        StatusCode = 200,
                        Message = "Task Deleted from the list successfully"
                    };
                }
                else
                {
                    return new ApiResponse
                    {
                        StatusCode = 500,
                        Message = "Id not found"
                    };
                }

            }
            catch (Exception ex)
            {
                return new ApiResponse
                {
                    StatusCode = 500,
                    Message = ex.Message
                };
            }
        }
        public async Task<ApiResponse> DeleteItems(int userId)
        {
            try
            {
                await _unitOfWork.UserItemRepository.DeleteAllItems(userId);
                _unitOfWork.Commit();
                return new ApiResponse
                {
                    StatusCode = 200,
                    Message = "All Tasks Deleted from the your list successfully"
                };
            }
            catch (Exception ex)
            {
                return new ApiResponse
                {
                    StatusCode = 500,
                    Message = ex.Message

                };
            }
        }
        public async Task<ApiResponse> GetActiveItems(int userId)
        {
            try
            {
                return new ApiResponse
                {
                    StatusCode = 200,
                    Message = "Successful",
                    result = _mapper.Map<List<ItemDto>>(await _unitOfWork.UserItemRepository.GetActiveItems(userId))
                };

            }
            catch (Exception ex)
            {
                return new ApiResponse
                {
                    StatusCode = 500,
                    Message = ex.Message
                };
            }
        }
        public async Task<ApiResponse> GetCompletedItems(int userId)
        {
            try
            {
                return new ApiResponse
                {
                    StatusCode = 200,
                    Message = "Successful",
                    result = _mapper.Map<List<ItemDto>>(await _unitOfWork.UserItemRepository.GetCompletedItems(userId))
                };

            }
            catch (Exception ex)
            {
                return new ApiResponse
                {
                    StatusCode = 500,
                    Message = ex.Message
                };
            }
        }
        public async Task<ApiResponse> CompletionPercentage(int userId)
        {
            try
            {
                int count = await _unitOfWork.UserItemRepository.GetCompletedItemsCount(userId);
                int totalCount = await _unitOfWork.UserItemRepository.TotalItemsCount(userId);
                int completedPercentage = 0;
                int activePercentage = 0;
                if (totalCount > 0)
                {
                    completedPercentage = (int)Math.Round((double)count * 100 / totalCount);
                    activePercentage = (int)Math.Round((double)(totalCount - count) * 100 / totalCount);
                }
                return new ApiResponse { StatusCode = 200, Message = "Successful", result = new int[] { completedPercentage, activePercentage } };
            }
            catch (Exception ex)
            {
                return new ApiResponse
                {
                    StatusCode = 500,
                    Message = ex.Message
                };
            }
        }
        public async Task<ApiResponse> makeItemCompleted(int id, int userId)
        {
            try
            {
                Useritem result = await _unitOfWork.UserItemRepository.GetItemById(id, userId);
                if (result != null)
                {
                    result.Statusid = await _unitOfWork.StatusRepository.getIdByName("COMPLETED");
                    result.Completedon = DateTime.Now.ToString("MM/dd/yyyy hh:mm:ss tt");
                    await _unitOfWork.UserItemRepository.Update(result);
                    _unitOfWork.Commit();
                    return new ApiResponse
                    {
                        StatusCode = 200,
                        Message = "Task Updated as completed"
                    };
                }
                else
                {
                    return new ApiResponse
                    {
                        StatusCode = 500,
                        Message = "Task not found"
                    };
                }

            }
            catch (Exception ex)
            {
                return new ApiResponse
                {
                    StatusCode = 500,
                    Message = ex.Message
                };
            }
        }
        public async Task<ApiResponse> makeItemActive(int id, int userId)
        {
            try
            {
                Useritem result = await _unitOfWork.UserItemRepository.GetItemById(id, userId);
                if (result != null)
                {
                    result.Statusid = await _unitOfWork.StatusRepository.getIdByName("ACTIVE");
                    result.Createdon = DateTime.Now.ToString("MM/dd/yyyy hh:mm:ss tt");
                    await _unitOfWork.UserItemRepository.Update(result);
                    _unitOfWork.SaveChanges();
                    _unitOfWork.Commit();
                    return new ApiResponse
                    {
                        StatusCode = 200,
                        Message = "Task Updated as active"
                    };
                }
                else
                {
                    return new ApiResponse
                    {
                        StatusCode = 500,
                        Message = "Task not found"
                    };
                }

            }
            catch (Exception ex)
            {
                return new ApiResponse
                {
                    StatusCode = 500,
                    Message = ex.Message
                };
            }
        }
        /*public async Task<ApiResponse> AddItem(ItemDto item)
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
        }*/
    }
}
