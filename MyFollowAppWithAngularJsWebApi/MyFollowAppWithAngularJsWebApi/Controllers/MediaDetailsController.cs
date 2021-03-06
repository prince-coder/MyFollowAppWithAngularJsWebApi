﻿using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using MyFollowAppWithAngularJsWebApi.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Results;
using System.Web.Mvc;

namespace MyFollowAppWithAngularJsWebApi.Controllers
{
    //[RoutePrefix("api/MediaDetailsApi")]
    public class MediaDetailsController : Controller
    {
        private MyFollowAppContext db = new MyFollowAppContext();
    
        
        //[Route("Create/{id:int}/{name}")]
        [System.Web.Mvc.HttpPost]
        public JsonResult UploadFile(int id)
        {
            string Message, fileName;
            Message = fileName = string.Empty;
            bool IsFileUploaded = false;

            if (Request.Files != null)
            {

                HttpPostedFileBase file = Request.Files[0];
                fileName = Path.GetFileName(file.FileName);
                try
                {

                    file.SaveAs(Path.Combine(Server.MapPath("~/Images/"), fileName));
                    Message = "File uploaded";
                    IsFileUploaded = true;
                    
                    MediaDetails mediaDetails = new MediaDetails();
                    mediaDetails.ProductId = id;
                    mediaDetails.Media = fileName;
                    db.MediaDetails.Add(mediaDetails);
                    db.SaveChanges();
                    //return Ok();
                    
                }

                catch (Exception ex)
                {
                    Message = ex.ToString();
                }


                //var file = Request.Files[0];

            }
            return new JsonResult { Data = new { fileName = fileName, Message = Message, Status = IsFileUploaded } };
        }
    }
}
               
                //mediaDetails.Media = productDetails.MediaDetails.ToString();
               