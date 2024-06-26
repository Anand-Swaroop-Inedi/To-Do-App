using AutoMapper;
using BusinessLogicLayer.Interfaces;
using DataAccessLayer.Entities;
using DataAccessLayer.Interfaces;
using Models;

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
        public async Task addError(ErrorLogDto error)
        {
            _unitOfWork.ErrorLogRepository.AddError(_mapper.Map<ErrorLog>(error));
            _unitOfWork.Commit();
        }
    }
}
