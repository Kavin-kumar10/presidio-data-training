using TodoModernizingApplication.Models.Enum;

namespace TodoModernizingApplication.Models.DTOs.RequestDTO
{
    public class TodoReqDTO
    {
        public string Title { get; set; }
        public DateTime TentativeDate { get; set; }
        public int MemberId { get; set; }
        public TodoStatus TodoStatus { get; set; }
    }
}
