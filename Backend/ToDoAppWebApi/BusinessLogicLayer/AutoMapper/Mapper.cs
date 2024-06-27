using AutoMapper;
using DataAccessLayer.Entities;
using Models;

namespace BusinessLogicLayer.AutoMapper
{
    public class Mapper : Profile
    {
        public Mapper()
        {
            CreateMap<Models.Item, DataAccessLayer.Entities.Item>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name));
            CreateMap<Models.Item, UserItem>();
            CreateMap<UserItem, Models.Item>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Item.Name))
                .ForMember<string>(dest => dest.Description, opt => opt.MapFrom<string>(src => src.Item.Description))
                .ForMember<string>(dest => dest.StatusName, opt => opt.MapFrom(src => src.Status.Name));
            CreateMap<Models.User, DataAccessLayer.Entities.User>().ReverseMap();
            CreateMap<Models.ErrorLog, DataAccessLayer.Entities.ErrorLog>();
        }

    }
}
