using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using TodoModernizingApplication.Modals;
using TodoModernizingApplication.Models.Enum;

namespace TodoModernizingApplication.Models
{
    public class Todo
    {
        [Key]
        public int TodoId { get; set; }
        public string Title { get; set; }
        public DateTime TentativeEndDate  { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public TodoStatus Status { get; set; } = TodoStatus.Pending;
        [ForeignKey("MemberId")]
        public int MemberId { get; set; }
        [JsonIgnore]
        public Member? Member { get; set; }

    }
}
