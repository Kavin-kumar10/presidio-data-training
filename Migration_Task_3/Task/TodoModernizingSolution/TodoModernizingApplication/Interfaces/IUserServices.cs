using TodoModernizingApplication.Modals;
using TodoModernizingApplication.Models;
using TodoModernizingApplication.Models.DTOs.RequestDTO.AuthReqDTOs;
using TodoModernizingApplication.Models.DTOs.ResponseDTO.LoginResponseDTOs;

namespace TodoModernizingApplication.Interfaces
{
    public interface IUserServices
    {
        public Task<LoginReturnDTO> Login(UserLoginDTO loginDTO);
        public Task<Member> Register(RegisterRequestDTO registerRequestDTO);
    }
}
