using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MyFollowAppWeb.Controllers
{
   [RequireHttps]
    public class ProductOwnerController : Controller
    {
        // GET: ProductOwner
        
        public ActionResult Create(int id)
        {
            ViewBag.ProductOwnerRequestId = id.ToString();
            return View();
        }
        
        public ActionResult Login()
        {
            return View();
        }
    }
}