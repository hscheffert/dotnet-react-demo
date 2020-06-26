namespace ReactDemo.Models
{
    public class TodoItem
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public bool IsComplete { get; set; }
        // A field we don't want the client to see!
        public string Secret { get; set; }
    }
}
