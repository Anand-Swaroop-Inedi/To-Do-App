using DataAccessLayer.Entities;
using DataAccessLayer.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.SqlServer.Server;
using Models;
using System.Globalization;

namespace DataAccessLayer.Repositories
{
    public class UserItemsRepository:IUserItemsRepository
    {
        private readonly ToDoAppContext _context;
        public UserItemsRepository(ToDoAppContext toDoAppContext)
        {
            _context = toDoAppContext;
        }
        public async Task<ApiResponse> AddItem(Useritem item)
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
                        t.Createdon = DateTime.Now.ToString("MM/dd/yyyy hh:mm:ss tt"); 
                        _context.Useritems.Update(t);
                    }
                    else
                    {
                        item.Statusid = _context.Statuses.Where(s => s.Name.ToUpper() == "ACTIVE").Select(s => s.Id).First();
                        item.Createdon = DateTime.Now.ToString("MM/dd/yyyy hh:mm:ss tt");
                        _context.Useritems.Add(item);
                    }
                    _context.SaveChanges();
                    return new ApiResponse
                    {
                        StatusCode = 200,
                        Message = "Successfully added the task to the user ToDo"
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
        public async Task<ApiResponse> CompletionPercentage()
        {
            try
            {
                int count = _context.Useritems.Where(u => u.Status.Name.ToUpper() == "COMPLETED" && u.Isdeleted == 0).Count();
                int totalCount = _context.Useritems.Where(u => u.Isdeleted == 0).Count();
                int percentage = 0;
                if (totalCount > 0)
                {
                    percentage = (int)Math.Round((double)count*100 / totalCount);
                }
                return new ApiResponse { StatusCode = 200, Message = "Successful", result = percentage };
            }
            catch(Exception ex)
            {
                return new ApiResponse
                {
                    StatusCode = 500,
                    Message = ex.Message
                };
            }
        }
        public async Task<ApiResponse> makeItemCompleted(int id)
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
                        Message = "Task Updated as completed"
                    };
                }
                else
                {
                    return new ApiResponse
                    {
                        StatusCode = 200,
                        Message = "Task Updation unsuccessful"
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
        public async Task<ApiResponse> DeleteItem(int id)
        {
            try
            {
                Useritem result = _context.Useritems.Where(r => r.Id == id).First();
                if (result != null)
                {
                    result.Isdeleted = 1;
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
        public async Task<ApiResponse> GetAllItems()
        {
             List<Useritem> Useritems= _context.Useritems.Where(x=>x.Isdeleted == 0).Include(u=>u.Item).Include(u=>u.User).Include(u=>u.Status).ToList();
            return new ApiResponse
            {
                StatusCode = 200,
                Message = "Retrieval successful",
                result = Useritems
            };
        }
        public async Task<ApiResponse> UpdateItem(Useritem useritem)
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
        public async Task<ApiResponse> GetActiveItems()
        {
            try
            {
                return new ApiResponse 
                        {
                            StatusCode=200,
                            Message="Successful",
                            result = _context.Useritems.Where(x=>x.Status.Name.ToUpper()=="ACTIVE" && x.Isdeleted == 0).Include(u => u.Item).Include(u => u.User).Include(u => u.Status).ToList()
                        };

            }
            catch(Exception ex)
            {
                return new ApiResponse
                {
                    StatusCode = 500,
                    Message = ex.Message
                };
            }
        }
        public async Task<ApiResponse> GetCompletedItems()
        {
            try
            {
                return new ApiResponse
                {
                    StatusCode = 200,
                    Message = "Successful",
                    result = _context.Useritems.Where(x => x.Status.Name.ToUpper() == "COMPLETED" && x.Isdeleted==0).Include(u => u.Item).Include(u => u.User).Include(u => u.Status).ToList()
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
        public async Task<ApiResponse> DeleteItems()
        {
            try
            {
                _context.Useritems.ToList().ForEach(x => { x.Isdeleted=1; });
                _context.SaveChanges();
                return new ApiResponse { StatusCode = 200, Message = "Successfully Deleted" };
            }
            catch(Exception ex)
            {
                return new ApiResponse { StatusCode = 500,Message=ex.Message };
            }
            
        }
    }
}
