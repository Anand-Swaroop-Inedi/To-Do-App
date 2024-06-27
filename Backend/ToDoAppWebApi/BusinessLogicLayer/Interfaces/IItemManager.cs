using Models;

namespace BusinessLogicLayer.Interfaces
{
    public interface IItemManager
    {
        public Task<bool> AddItem(Item task);
        public Task<List<Item>> GetAll(int userId);
        public Task UpdateItem(Item task);
        public Task<bool> DeleteItem(int id, int userId);
        public Task<List<Item>> GetActiveItems(int userId);
        public Task<List<Item>> GetCompletedItems(int userId);
        public Task DeleteItems(int userId);
        public Task<int[]> CompletionPercentage(int userId);
        public Task<bool> makeItemCompleted(int id, int userId);
        public Task<bool> makeItemActive(int id, int UserId);
        public Task<List<Item>> GetPendingTasks(int userId, string property, string order);

    }
}
