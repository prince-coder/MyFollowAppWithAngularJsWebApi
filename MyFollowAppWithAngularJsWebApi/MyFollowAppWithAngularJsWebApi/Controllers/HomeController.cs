﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MyFollowAppWithAngularJsWebApi.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
       
        public ActionResult Login()
        {
            return View();
        }
        public ActionResult ProductOwnerRequest()
        {
            return View();
        }
    }
}