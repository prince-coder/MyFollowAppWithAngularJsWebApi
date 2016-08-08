using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace MyFollowAppWithAngularJsWebApi.Models
{
    public class ProductDetails
    {
        [Key]
        public int ProductId { get; set; }
        public string ProductIntro { get; set; }
        public string Details { get; set; }
        public string ProductOwnerId { get; set; }
        //public virtual MyFollow MyFollow { get; set; }
        public virtual ProductOwner ProductOwner { get; set; }
        public ICollection<FollowProduct> FollowProduct { get; set; }
        public ICollection<MediaDetails> MediaDetails { get; set; }
    }
}