using System.ComponentModel.DataAnnotations;

namespace TodoModernizingApplication.Models.DTOs.RequestDTO.AuthReqDTOs
{
    public class RegisterRequestDTO
    {
        [Required(ErrorMessage = "User Name cannot be empty")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Password Cannot be empty")]
        public string password { get; set; }

        [Required(ErrorMessage = "EmailAddress Cannot be empty")]
        [EmailAddress]
        public string email { get; set; }
    }
}
