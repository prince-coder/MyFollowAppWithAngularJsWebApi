using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using MyFollowAppWithAngularJsWebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.Entity;

namespace MyFollowAppWithAngularJsWebApi.Controllers
{
    [Authorize(Roles = "End User")]
    [RoutePrefix("api/FollowProductApi")]
    public class FollowProductApiController : ApiController
    {
        private MyFollowAppContext db = new MyFollowAppContext();
        private UserManager<ApplicationUser> manager;
        private ApplicationDbContext ApplicationDb = new ApplicationDbContext();
        public FollowProductApiController()
        {
            manager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(ApplicationDb));
        }
        [Route("")]
        public IHttpActionResult Get()
        {
            db.Configuration.ProxyCreationEnabled = false;
            //var currentUser = manager.FindById(User.Identity.GetUserId());
            var product = from data in db.ProductDetails select data;
            var follow = from tblFollowProduct in db.FollowProduct where tblFollowProduct.EndUserId == "1" select new { tblFollowProduct.ProductId };
            var followProducts = from tblProductDetails in db.ProductDetails 
                                 where 
                                 tblProductDetails.ProductId != Convert.ToUInt32(follow)
                                 select new { tblProductDetails.ProductId,
                                 tblProductDetails.ProductIntro,
                                 tblProductDetails.Details};

            //var followProducts = from data in db.ProductDetails where data.ProductId
            if(followProducts!= null)
            {
                return Ok(followProducts);
            }
            else
            {
                return NotFound();
            }
        }
        [Route("Create")]
        public HttpResponseMessage Post(ProductDetails productDetails)
        {

                var currentUser = manager.FindById(User.Identity.GetUserId());
                FollowProduct followProduct = new FollowProduct();
                followProduct.ProductId = productDetails.ProductId;
                followProduct.EndUserId = "2";
                db.FollowProduct.Add(followProduct);
                db.SaveChanges();
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, followProduct);
                //response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = productDetails.ProductId }));
                return response;
          }
        }
    }
