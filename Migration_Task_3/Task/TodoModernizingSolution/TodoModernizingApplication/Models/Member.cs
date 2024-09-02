using TodoModernizingApplication.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using System.Text.RegularExpressions;

namespace TodoModernizingApplication.Modals
{
    public class Member
    {
        [Key]
        public int MemberId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public IEnumerable<Todo> Todos { get; set; }

    }
}
