using System;
using System.Collections.Generic;

namespace DataAccessLayer.Entities;

public partial class Item
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public int? Isdeleted { get; set; }

    public virtual ICollection<Useritem> Useritems { get; set; } = new List<Useritem>();
}
