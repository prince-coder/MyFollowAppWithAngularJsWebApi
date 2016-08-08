using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MyFollowAppWithAngularJsWebApi.Controllers
{
    [RequireHttps]
    public class ProductDetailsController : Controller
    {
        // GET: ProductDetails
        public ActionResult List()
        {
            return View();
        }
        public ActionResult Create()
        {
            return View();
        }
       
    }
}
