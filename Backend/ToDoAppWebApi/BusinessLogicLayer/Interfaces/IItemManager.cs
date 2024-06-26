using Models;

namespace BusinessLogicLayer.Interfaces
{
    public interface IItemManager
    {
        public Task<int> AddItem(ItemDto task);
        public Task<List<ItemDto>> GetAll(int userId);
        public Task UpdateItem(ItemDto task);
        public Task<int> DeleteItem(int id, int userId);
        public Task<List<ItemDto>> GetActiveItems(int userId);
        public Task<List<ItemDto>> GetCompletedItems(int userId);
        public Task DeleteItems(int userId);
        public Task<int[]> CompletionPercentage(int userId);
        public Task<int> makeItemCompleted(int id, int userId);
        public Task<int> makeItemActive(int id, int UserId);
        public Task<List<ItemDto>> GetPendingTasks(int userId, string property, string order);

    }
}
