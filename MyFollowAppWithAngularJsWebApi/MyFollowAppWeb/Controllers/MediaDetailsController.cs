using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MyFollowAppWeb.Controllers
{
    public class MediaDetailsController : Controller
    {
        // GET: MediaDetails
        public ActionResult List()
        {
            //ViewBag.ProductId = id.ToString();
            return View();
        }
    }
}