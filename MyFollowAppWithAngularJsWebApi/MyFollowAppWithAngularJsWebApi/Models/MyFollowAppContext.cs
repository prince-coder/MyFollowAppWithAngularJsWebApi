using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Web;

namespace MyFollowAppWithAngularJsWebApi.Models
{
    public class MyFollowAppContext : DbContext
    {
        public MyFollowAppContext() : base("MyFollowAppContext")
        {

        }
        //public DbSet<MyFollow> MyFollow { get; set; }
        public DbSet<ProductOwner> ProductOwners { get; set; }
        public DbSet<EndUser> EndUsers { get; set; }
        public DbSet<Admin> Admin { get; set; }
        public DbSet<FollowProduct> FollowProduct { get; set; }
        public DbSet<ProductDetails> ProductDetails { get; set; }
        public DbSet<ProductOwnerRequest> ProductOwnerRequest { get; set; }
        public DbSet<MediaDetails> MediaDetails { get; set; }
        protected override void OnModelCreating(DbModelBuilder modelbuilder)
        {
            modelbuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }


    }
}