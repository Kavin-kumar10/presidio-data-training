using System.ComponentModel.DataAnnotations.Schema;
using TodoModernizingApplication.Models.Enum;

namespace TodoModernizingApplication.Models.DTOs.RequestDTO
{
    public class TodoUpdateRequestDto
    {
        public int TodoId { get; set; }
        public string Title { get; set; }
        public DateTime TentativeEndDate { get; set; }
        public DateTime CreatedAt { get; set; }
        public TodoStatus Status { get; set; } 
        public int MemberId { get; set; }
    }
}
