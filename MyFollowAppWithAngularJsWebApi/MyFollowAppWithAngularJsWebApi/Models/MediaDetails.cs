using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyFollowAppWithAngularJsWebApi.Models
{
    public class MediaDetails
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string Media { get; set; }
        public virtual ProductDetails ProductDetails { get; set; }
    }
}