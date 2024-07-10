using Models.ViewModels;

namespace BusinessLogicLayer.Interfaces
{
    public interface IErrorLogManager
    {
        public Task addError(ErrorLog error);
    }
}
