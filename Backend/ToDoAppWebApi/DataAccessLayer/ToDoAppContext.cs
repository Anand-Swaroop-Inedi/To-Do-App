using System;
using System.Collections.Generic;
using DataAccessLayer.Entities;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer;

public partial class ToDoAppContext : DbContext
{
    public ToDoAppContext()
    {
    }

    public ToDoAppContext(DbContextOptions<ToDoAppContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Item> Items { get; set; }

    public virtual DbSet<Status> Statuses { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<Useritem> Useritems { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("data source=.\\SQLEXPRESS; database=ToDoApp;TrustServerCertificate=True;User=sa;Password=P@ssw0rd", x => x.UseNetTopologySuite());

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Item>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__ITEMS__3214EC273C1460C9");

            entity.ToTable("ITEMS");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Description)
                .IsUnicode(false)
                .HasColumnName("DESCRIPTION");
            entity.Property(e => e.Isdeleted)
                .HasDefaultValue(0)
                .HasColumnName("ISDELETED");
            entity.Property(e => e.Name)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("NAME");
        });

        modelBuilder.Entity<Status>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__STATUSES__3214EC27FC361A9E");

            entity.ToTable("STATUSES");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Isdeleted)
                .HasDefaultValue(0)
                .HasColumnName("ISDELETED");
            entity.Property(e => e.Name)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("NAME");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__USERS__3214EC27E1D12233");

            entity.ToTable("USERS");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Isdeleted)
                .HasDefaultValue(0)
                .HasColumnName("ISDELETED");
            entity.Property(e => e.Password)
                .IsUnicode(false)
                .HasColumnName("PASSWORD");
            entity.Property(e => e.Username)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("USERNAME");
        });

        modelBuilder.Entity<Useritem>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__USERITEM__3214EC27FC879CB4");

            entity.ToTable("USERITEMS");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Completedon)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("COMPLETEDON");
            entity.Property(e => e.Createdon)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("CREATEDON");
            entity.Property(e => e.Isdeleted)
                .HasDefaultValue(0)
                .HasColumnName("ISDELETED");
            entity.Property(e => e.Itemid).HasColumnName("ITEMID");
            entity.Property(e => e.Statusid).HasColumnName("STATUSID");
            entity.Property(e => e.Userid).HasColumnName("USERID");

            entity.HasOne(d => d.Item).WithMany(p => p.Useritems)
                .HasForeignKey(d => d.Itemid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__USERITEMS__ITEMI__7A672E12");

            entity.HasOne(d => d.Status).WithMany(p => p.Useritems)
                .HasForeignKey(d => d.Statusid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__USERITEMS__STATU__7D439ABD");

            entity.HasOne(d => d.User).WithMany(p => p.Useritems)
                .HasForeignKey(d => d.Userid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__USERITEMS__USERI__00200768");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
