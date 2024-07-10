using AutoMapper;
using BusinessLogicLayer.Interfaces;
using EntitiesErrorLog = DataAccessLayer.Entities.ErrorLog;
using DataAccessLayer.Interfaces;
using ViewErrorLog = Models.ViewModels.ErrorLog;
using Models.DtoModels;

namespace BusinessLogicLayer.Services
{
    public class ErrorLogManager : IErrorLogManager
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public ErrorLogManager(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task addError(ViewErrorLog error)
        {
            _unitOfWork.ErrorLogRepository.AddError(_mapper.Map<EntitiesErrorLog>(_mapper.Map<ErrorLogDto>(error)));
            _unitOfWork.Commit();
        }
    }
}
