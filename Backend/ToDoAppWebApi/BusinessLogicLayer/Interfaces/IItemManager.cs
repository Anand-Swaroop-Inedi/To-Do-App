using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Interfaces
{
    public interface IItemManager
    {
        public Task<ApiResponse> AddItem(ItemDto task);
        public  Task<ApiResponse> GetAll();
        public Task<ApiResponse> UpdateItem(ItemDto task);
        public Task<ApiResponse> DeleteItem(int id);
    }
}
