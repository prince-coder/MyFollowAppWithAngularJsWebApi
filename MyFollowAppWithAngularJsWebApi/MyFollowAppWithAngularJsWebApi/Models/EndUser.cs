using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyFollowAppWithAngularJsWebApi.Models
{
    public class EndUser:MyFollow
    {
        public int EndUserId { get; set; }
        //public int UserId { get; set; }
        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime DateOfJoining { get; set; }
        //public string Url { get; set; }
        //public virtual MyFollow MyFollow { get; set; }
        //public virtual ICollection<FollowProduct> FollowProduct { get; set; }
    }
}