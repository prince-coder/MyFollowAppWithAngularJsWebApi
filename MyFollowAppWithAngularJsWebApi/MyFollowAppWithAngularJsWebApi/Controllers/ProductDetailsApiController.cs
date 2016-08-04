using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using MyFollowAppWithAngularJsWebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MyFollowAppWithAngularJsWebApi.Controllers
{

    [Authorize(Roles = "Product Owner")]
    [RoutePrefix("api/ProductDetailsApi")]

    public class ProductDetailsApiController : ApiController
    {
        private MyFollowAppContext db = new MyFollowAppContext();
        private UserManager<ApplicationUser> manager;
        private ApplicationDbContext ApplicationDb = new ApplicationDbContext();
        public ProductDetailsApiController()
        {
            manager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(ApplicationDb));
        }
        [Route("")]
        public IHttpActionResult Get()
        {
            db.Configuration.ProxyCreationEnabled = false;

            var currentUser = manager.FindById(User.Identity.GetUserId());
            var products = from data in db.ProductDetails where data.ProductOwnerId.ToString() == currentUser.Id
                           select data;
            if (products != null)
            {
                return Ok(products);
            }                                                                                                                                   
            else
            {
                return NotFound();
            }
        }
        [Route("{id:int}")]
        public IHttpActionResult Get(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            //var media="";
           
                //var currentUser = manager.FindById(User.Identity.GetUserId());
                var media = (from data in db.MediaDetails where data.ProductId == id select data).AsEnumerable();

                return Ok(media);
            
            //return Ok();

        }
        [Route("Create")]
        public HttpResponseMessage Post(ProductDetails productDetails)
        { 
            if(ModelState.IsValid)
            {
                var currentUser = manager.FindById(User.Identity.GetUserId());
                productDetails.ProductOwnerId = currentUser.Id;
                db.ProductDetails.Add(productDetails);
                db.SaveChanges();
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, productDetails);
                //response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = productDetails.ProductId }));
                return response;
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }
    }
}
