using System.ComponentModel.DataAnnotations;

namespace TodoModernizingApplication.Models.DTOs.RequestDTO.AuthReqDTOs
{
    public class UserLoginDTO
    {

        [Required(ErrorMessage = "User id cannot be empty")]
        public int UserId { get; set; }


        [Required(AllowEmptyStrings = false, ErrorMessage = "Password cannot be empty")]
        public string Password { get; set; } = string.Empty;
    }
}
