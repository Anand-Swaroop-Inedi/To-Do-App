using System;
using System.Collections.Generic;

namespace DataAccessLayer.Entities;

public partial class Useritem
{
    public int Id { get; set; }

    public int Userid { get; set; }

    public int Itemid { get; set; }

    public DateTime Createdon { get; set; }

    public DateTime Completedon { get; set; }

    public int Statusid { get; set; }

    public virtual Item Item { get; set; } = null!;

    public virtual Status Status { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
