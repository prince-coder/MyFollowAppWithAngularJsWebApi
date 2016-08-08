using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MyFollowAppWithAngularJsWebApi.Models
{
    public class ProductOwnerRequest
    {
        [Key]
        public int ProductOwnerRequestId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string CompanyName { get; set; } 
        //public int Count { get; set; }
    }
}