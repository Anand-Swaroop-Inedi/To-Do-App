namespace Models
{
    public class ItemDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string? Description { get; set; }

        public int Userid { get; set; }

        public int Itemid { get; set; }

        public DateTime? Createdon { get; set; }

        public DateTime? Completedon { get; set; }

        public int Statusid { get; set; }
        public String? StatusName { get; set; }
        public int? Isdeleted { get; set; }

    }
}
