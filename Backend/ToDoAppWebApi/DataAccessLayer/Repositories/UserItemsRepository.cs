using statusEnum=Common.Enums.Status;
using DataAccessLayer.Entities;
using DataAccessLayer.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System.Reflection;

namespace DataAccessLayer.Repositories
{
    public class UserItemsRepository : IUserItemsRepository
    {
        private readonly ToDoAppContext _context;
        public UserItemsRepository(ToDoAppContext toDoAppContext)
        {
            _context = toDoAppContext;
        }

        public async Task<int> checkItemLinkingExists(UserItem item)
        {
            return _context.UserItems.Where(r => r.UserId == item.UserId && r.ItemId == item.ItemId && r.Status.Name.ToUpper() == statusEnum.active.ToString()).Select(r => r.Id).FirstOrDefault();
        }
        public async Task<UserItem> checkItemCompleted(UserItem item)
        {
            return _context.UserItems.Where(r => r.UserId == item.Id && r.ItemId == item.ItemId && r.Status.Name.ToUpper() == statusEnum.completed.ToString() && r.UserId == item.UserId).FirstOrDefault();
        }
        public async Task AddItem(UserItem item)
        {
            _context.UserItems.Add(item);
        }
        public async Task Update(UserItem item)
        {
            _context.UserItems.Update(item);
        }
        public async Task<List<UserItem>> GetAll(int userId)
        {
            return _context.UserItems.Where(x => x.IsDeleted == 0 && x.UserId == userId && x.CreatedOn > DateTime.Today && x.CreatedOn < DateTime.Today.AddDays(1)).Include(u => u.Item).Include(u => u.User).Include(u => u.Status).ToList();
        }

        public async Task<UserItem> GetItemById(int Id, int userId)
        {
            return _context.UserItems.Where(r => r.Id == Id && r.UserId == userId).First();
        }
        public async Task DeleteItem(UserItem item, int UserId)
        {
            item.IsDeleted = 1;
            _context.UserItems.Update(item);
        }
        public async Task DeleteAllItems(int UserId)
        {

            _context.UserItems.Where(x => x.UserId == UserId).ToList().ForEach(x => { x.IsDeleted = 1; });
        }
        public async Task<List<UserItem>> GetActiveItems(int UserId)
        {
            return _context.UserItems.Where(x => x.Status.Name.ToUpper() == statusEnum.active.ToString() && x.IsDeleted == 0 && x.UserId == UserId && x.CreatedOn > DateTime.Today && x.CreatedOn < DateTime.Today.AddDays(1)).Include(u => u.Item).Include(u => u.User).Include(u => u.Status).ToList();
        }
        public async Task<List<UserItem>> GetCompletedItems(int UserId)
        {
            return _context.UserItems.Where(x => x.Status.Name.ToUpper() == statusEnum.completed.ToString() && x.IsDeleted == 0 && x.UserId == UserId && x.CreatedOn > DateTime.Today && x.CreatedOn < DateTime.Today.AddDays(1)).Include(u => u.Item).Include(u => u.User).Include(u => u.Status).ToList();

        }
        public async Task<int> GetCompletedItemsCount(int userId)
        {
            return _context.UserItems.Where(u => u.Status.Name.ToUpper() == statusEnum.completed.ToString() && u.IsDeleted == 0 && u.UserId == userId && u.CreatedOn > DateTime.Today && u.CreatedOn < DateTime.Today.AddDays(1)).Count();
        }
        public async Task<int> TotalItemsCount(int userId)
        {
            return _context.UserItems.Where(u => u.IsDeleted == 0 && u.UserId == userId && u.CreatedOn > DateTime.Today && u.CreatedOn < DateTime.Today.AddDays(1)).Count();
        }
        public async Task<List<UserItem>> GetPendingTasks(int userId,string property,string order)
        {
            if (!string.IsNullOrEmpty(property))
            {
                List<UserItem> userItems = _context.UserItems
                        .Where(u => u.Status.Name.ToUpper() == statusEnum.active.ToString() &&
                        u.IsDeleted == 0 &&
                        u.UserId == userId &&
                        u.CreatedOn < DateTime.Today).Include(u => u.Item).Include(u => u.User).Include(u => u.Status).ToList();
                if (property.Equals("createdon", StringComparison.OrdinalIgnoreCase))
                {
                    if (order.Equals("asc", StringComparison.OrdinalIgnoreCase))
                    {
                        return userItems.OrderByDescending(e => e.CreatedOn).ToList();
                    }
                    else
                    {
                        return userItems.OrderBy(e => e.CreatedOn).ToList();
                    }
                }
                else
                {
                    if (order.Equals("asc", StringComparison.OrdinalIgnoreCase))
                    {
                        return userItems.OrderBy(e => e.Item.Name).ToList();
                    }
                    else
                    {
                        return userItems.OrderByDescending(e => e.Item.Name).ToList();
                    }
                }

            }
            return [];

        }
    }
}
