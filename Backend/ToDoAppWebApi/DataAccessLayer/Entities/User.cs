using System;
using System.Collections.Generic;

namespace DataAccessLayer.Entities;

public partial class User
{
    public int Id { get; set; }

    public string Username { get; set; } = null!;

    public string Password { get; set; } = null!;

    public int? Isdeleted { get; set; }

    public virtual ICollection<Useritem> Useritems { get; set; } = new List<Useritem>();
}
