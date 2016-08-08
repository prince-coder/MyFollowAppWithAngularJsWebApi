using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MyFollowAppWithAngularJsWebApi.Models
{
    public abstract class MyFollow :AddressDetails
    {
        //[Key]
        //public int UserId { get; set; }
        [Required]
        [EmailAddress(ErrorMessage = "Please Enter Valid Email Address")]
        public string Email { get; set; }
       
        public string ContactNo { get; set; }
        //public string TempId { get; set; }
    }
}