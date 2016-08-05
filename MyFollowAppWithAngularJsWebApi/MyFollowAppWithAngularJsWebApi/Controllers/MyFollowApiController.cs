using MyFollowAppWithAngularJsWebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace MyFollowAppWithAngularJsWebApi.Controllers
{
    public class MyFollowApiController : ApiController
    {
        private MyFollowAppContext db = new MyFollowAppContext();
        //int Id;
        public void Get(int id)

        {
            ProductOwnerRequest p = db.ProductOwnerRequest.Find(id);
            //Id = id;
            if (p == null)
            {
                HttpContext.Current.Response.Redirect("http://localhost:60847/ProductOwnerRequest/ExpireMessage/");
            }
            else
            {
                HttpContext.Current.Response.Redirect("http://localhost:60847/Myfollow/Create/" + id);
            }
            //return p;
              
            //var checkStatus = (from data in db.ProductOwnerRequest where data.Id == id && data.Count == 0 select data);
            //if(checkStatus.Count() > 0)
            //{
            //    //RedirectToRoute("");
            //    var session1 =  HttpContext.Current.Session;

            //    HttpContext.Current.Response.Redirect("http://localhost:60847/Myfollow/Create/");
            //    session1["ProductOwnerRequestId"] = id;

            //    //return response;
            //}
            ////return Request.CreateResponse(HttpStatusCode.NotFound);

        }
        public HttpResponseMessage Post(MyFollow myFollow)
        {
            if(ModelState.IsValid)
            {
                //db.MyFollow.Add(myFollow);
                //db.SaveChanges();
                //var session = HttpContext.Current.Session;
                //session["ProductOwnerRequestId"] = myFollow.TempId;
                ////ProductOwnerRequest p = new ProductOwnerRequest();
                ////int id = p.Id;
                //session["UserId"] = myFollow.UserId;
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, myFollow);
                return response;
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }
        
     

    }
}
