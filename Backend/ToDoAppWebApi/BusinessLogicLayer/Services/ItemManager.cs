using AutoMapper;
using BusinessLogicLayer.Interfaces;
using DataAccessLayer.Entities;
using DataAccessLayer.Interfaces;
using Models;

namespace BusinessLogicLayer.Services
{
    public class ItemManager : IItemManager
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public ItemManager(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }
        public async Task<int> AddItem(ItemDto item)
        {
            _unitOfWork.BeginTransaction();
            int statusId = await _unitOfWork.StatusRepository.getIdByName("ACTIVE");
            int result = await _unitOfWork.ItemRepository.checkItemExists(_mapper.Map<Item>(item));
            if (result > 0)
            {

                item.Itemid = result;
                result = await _unitOfWork.UserItemRepository.checkItemLinkingExists(_mapper.Map<UserItem>(item));
                if (result > 0)
                {
                    return 2;
                }
                UserItem u = await _unitOfWork.UserItemRepository.checkItemCompleted(_mapper.Map<UserItem>(item));
                if (u != null)
                {
                    u.StatusId = statusId;
                    await _unitOfWork.UserItemRepository.Update(u);
                }
                else
                {
                    item.Statusid = statusId;
                    await _unitOfWork.UserItemRepository.AddItem(_mapper.Map<UserItem>(item));
                }

            }
            else
            {
                await _unitOfWork.ItemRepository.Add(_mapper.Map<Item>(item));
                int id = await _unitOfWork.ItemRepository.recentlyAddedId();
                item.Itemid = id + 1;
                item.Statusid = statusId;
                await _unitOfWork.UserItemRepository.AddItem(_mapper.Map<UserItem>(item));
            }
            _unitOfWork.Commit();
            return 1;
        }
        public async Task<List<ItemDto>> GetAll(int userId)
        {

            return _mapper.Map<List<ItemDto>>(await _unitOfWork.UserItemRepository.GetAll(userId));
        }
        public async Task UpdateItem(ItemDto item)
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
            await _unitOfWork.UserItemRepository.Update(_mapper.Map<UserItem>(item));
            _unitOfWork.Commit();
        }
        public async Task<int> DeleteItem(int id, int userId)
        {
            UserItem result = await _unitOfWork.UserItemRepository.GetItemById(id, userId);
            if (result != null)
            {
                await _unitOfWork.UserItemRepository.DeleteItem(result, userId);
                _unitOfWork.Commit();
                return 1;
            }
            return 2;
        }
        public async Task DeleteItems(int userId)
        {
            await _unitOfWork.UserItemRepository.DeleteAllItems(userId);
            _unitOfWork.Commit();
        }
        public async Task<List<ItemDto>> GetActiveItems(int userId)
        {
            return _mapper.Map<List<ItemDto>>(await _unitOfWork.UserItemRepository.GetActiveItems(userId));
        }
        public async Task<List<ItemDto>> GetCompletedItems(int userId)
        {
            return _mapper.Map<List<ItemDto>>(await _unitOfWork.UserItemRepository.GetCompletedItems(userId));
        }
        public async Task<int[]> CompletionPercentage(int userId)
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
            return new int[] { completedPercentage, activePercentage };
        }
        public async Task<int> makeItemCompleted(int id, int userId)
        {
            UserItem result = await _unitOfWork.UserItemRepository.GetItemById(id, userId);
            if (result != null)
            {
                result.StatusId = await _unitOfWork.StatusRepository.getIdByName("COMPLETED");
                await _unitOfWork.UserItemRepository.Update(result);
                _unitOfWork.Commit();
                return 1;

            }
            else
            {
                return 3;

            }
        }
        public async Task<int> makeItemActive(int id, int userId)
        {
            UserItem result = await _unitOfWork.UserItemRepository.GetItemById(id, userId);
            if (result != null)
            {
                result.StatusId = await _unitOfWork.StatusRepository.getIdByName("ACTIVE");
                await _unitOfWork.UserItemRepository.Update(result);
                _unitOfWork.SaveChanges();
                _unitOfWork.Commit();
                return 1;
            }
            else
            {
                return 3;
            }

        }
        public async Task<List<ItemDto>> GetPendingTasks(int userId)
        {
            return _mapper.Map<List<ItemDto>>(await _unitOfWork.UserItemRepository.GetPendingTasks(userId));
        }
    }
}
