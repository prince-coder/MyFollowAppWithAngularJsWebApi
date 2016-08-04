using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using MyFollowAppWithAngularJsWebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MyFollowAppWithAngularJsWebApi.Controllers
{
    public class EndUserApiController : ApiController
    {
        private MyFollowAppContext db = new MyFollowAppContext();
        private UserManager<ApplicationUser> manager;
        private ApplicationDbContext ApplicationDb = new ApplicationDbContext();
        public EndUserApiController()
        {
            manager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(ApplicationDb));
        }

    }
}
