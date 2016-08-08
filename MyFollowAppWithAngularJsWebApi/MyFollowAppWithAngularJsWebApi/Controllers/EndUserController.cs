using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MyFollowAppWithAngularJsWebApi.Controllers
{
    public class EndUserController : Controller
    {
        // GET: EndUser
        public ActionResult Create()
        {
            return View();
        }
        public ActionResult Login()
        {
            return View();
        }
    }
}