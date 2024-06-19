using System;
using System.Collections.Generic;

namespace DataAccessLayer.Entities;

public partial class Useritem
{
    public int Id { get; set; }

    public int Userid { get; set; }

    public int Itemid { get; set; }

    public string Createdon { get; set; } = null!;

    public string? Completedon { get; set; }

    public int Statusid { get; set; }

    public int? Isdeleted { get; set; }

    public virtual Item Item { get; set; } = null!;

    public virtual Status Status { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
