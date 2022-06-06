using System.ComponentModel.DataAnnotations;

namespace aspnetserver.Data
{
    public class Post
    {
        [Key]
        public Guid PostId { get; set; }
        [Required]
        [MaxLength(100)]
        public string Title { get; set; } = string.Empty;

        [Required] 
        [MaxLength(10000)] 
        public string Content { get; set; } = string.Empty;
    }
}
