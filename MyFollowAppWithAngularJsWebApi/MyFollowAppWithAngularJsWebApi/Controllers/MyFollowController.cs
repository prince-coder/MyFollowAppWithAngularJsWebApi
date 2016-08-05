using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MyFollowAppWeb.Controllers
{
    public class MyFollowController : Controller
    {
        // GET: MyFollow
        public ActionResult Create(int id)
        {
            ViewBag.ProductOwnerRequestId =  id.ToString();
            return View();
        }
    }
}