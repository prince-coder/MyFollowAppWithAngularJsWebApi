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
        [HttpPost]
        public JsonResult UploadFile()
        {
            string Message, fileName;
            Message = fileName = string.Empty;
            bool flag = false;

            if (Request.Files != null)
            {


                HttpPostedFileBase file = Request.Files[0];
                fileName = Path.GetFileName(file.FileName);
                try
                {

                    file.SaveAs(Path.Combine("C:\\Users\\prince\\Documents\\Visual Studio 2015\\Projects\\MyFollowAppWithAngularJsWebApi\\MyFollowAppWeb\\Images", fileName));
                    Message = "File uploaded";
                    flag = true;
                }
                catch (Exception)
                {
                    Message = "File upload failed! Please try again";
                }


                //var file = Request.Files[0];


            }
            return new JsonResult { Data = new  {  fileName= fileName, Message = Message, Status = flag } };
        }
    }
}
