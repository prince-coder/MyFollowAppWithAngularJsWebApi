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
        
        public ActionResult Index()
        {
            return View();
        }
     
        public ActionResult List()
        {
            return View();
        }
        public ActionResult ExpireMessage()
        {
            return View();
        }
        public ActionResult Message()
        {
            return View();
        }
    }
}