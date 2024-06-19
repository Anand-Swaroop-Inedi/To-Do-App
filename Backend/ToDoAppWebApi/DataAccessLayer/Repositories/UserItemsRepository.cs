using DataAccessLayer.Entities;
using DataAccessLayer.Interfaces;
using Microsoft.EntityFrameworkCore;
using Models;

namespace DataAccessLayer.Repositories
{
    public class UserItemsRepository:IUserItemsRepository
    {
        private readonly ToDoAppContext _context;
        public UserItemsRepository(ToDoAppContext toDoAppContext)
        {
            _context = toDoAppContext;
        }
        public async Task<ApiResponse> AddTask(Useritem item)
        {
            try
            {
                int result = _context.Useritems.Where(r => r.Userid == item.Id && r.Itemid == item.Itemid && r.Status.Name.ToUpper() == "ACTIVE").Select(r => r.Id).FirstOrDefault();
                if (result > 0)
                {
                    return new ApiResponse
                    {
                        StatusCode = 200,
                        Message = "Task is already added in the ToDo List"
                    };
                }
                else
                {
                    Useritem t=_context.Useritems.Where(r => r.Userid == item.Id && r.Itemid == item.Itemid && r.Status.Name.ToUpper() == "COMPLETED").FirstOrDefault();
                    if (t != null)
                    {
                        t.Statusid = _context.Statuses.Where(s => s.Name.ToUpper() == "ACTIVE").Select(s => s.Id).First();
                        _context.Useritems.Update(t);
                    }
                    else
                    {
                        _context.Useritems.Add(item);
                    }
                    _context.SaveChanges();
                    return new ApiResponse
                    {
                        StatusCode = 200,
                        Message = "Successfully added the task to the user ToDo with Id " + item.Userid
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
        public async Task<ApiResponse> DeleteTask(int id)
        {
            try
            {
                Useritem result = _context.Useritems.Where(r => r.Id == id).First();
                if (result != null)
                {
                    result.Statusid = _context.Statuses.Where(s => s.Name.ToUpper() == "COMPLETED").Select(s => s.Id).First();
                    _context.Useritems.Update(result);
                    _context.SaveChanges();
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
                        StatusCode = 200,
                        Message = "Task Deletion unsuccessful"
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
        public async Task<ApiResponse> GetAllTasks()
        {
             List<Useritem> Useritems= _context.Useritems.Include(u=>u.Item).Include(u=>u.User).Include(u=>u.Status).ToList();
            return new ApiResponse
            {
                StatusCode = 200,
                Message = "Retrieval successful",
                result = Useritems
            };
        }
        public async Task<ApiResponse> UpdateTask(Useritem useritem)
        {
            try
            {
                int id = _context.Useritems.Where(u => u.Id == useritem.Id).Select(u=>u.Id).FirstOrDefault();
                if (id != 0)
                {
                    _context.Useritems.Update(useritem);
                    _context.SaveChanges();
                    return new ApiResponse
                    {
                        StatusCode = 200,
                        Message = "Updated successfully"
                    };
                }
                else
                {
                    return new ApiResponse
                    {
                        StatusCode = 200,
                        Message = "Updation unsuccessful because Usertask doesn't exist in database"
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
    }
}
