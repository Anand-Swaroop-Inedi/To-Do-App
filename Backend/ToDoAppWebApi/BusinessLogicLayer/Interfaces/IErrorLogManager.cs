using Models;

namespace BusinessLogicLayer.Interfaces
{
    public interface IErrorLogManager
    {
        public Task addError(ErrorLogDto error);
    }
}
