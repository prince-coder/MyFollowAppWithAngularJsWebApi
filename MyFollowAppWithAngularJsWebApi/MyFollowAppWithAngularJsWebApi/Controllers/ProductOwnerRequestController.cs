using MyFollowAppWithAngularJsWebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MyFollowAppWithAngularJsWebApi.Controllers
{
    public class ProductOwnerRequestController : Controller
    {
        // GET: ProductOwnerRequest
        public ActionResult Create()
        {
            return View();
        }
        [ValidateAntiForgeryToken]
        [HttpPost]
        public ActionResult Create(ProductOwnerRequest p)
        {
            TempData["ProductOwnerRequest"] = p;
           
            return View("Message");
           
        }
    }
}