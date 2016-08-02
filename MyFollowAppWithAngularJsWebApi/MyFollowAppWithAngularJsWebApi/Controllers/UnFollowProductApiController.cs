using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using MyFollowAppWithAngularJsWebApi.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MyFollowAppWithAngularJsWebApi.Controllers
{
    [RoutePrefix("api/UnFollowProductApi")]
    public class UnFollowProductApiController : ApiController
    {
        private MyFollowAppContext db = new MyFollowAppContext();
        private UserManager<ApplicationUser> manager;
        private ApplicationDbContext ApplicationDb = new ApplicationDbContext();
        public UnFollowProductApiController()
        {
            manager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(ApplicationDb));
        }
        [Route("")]
        public IHttpActionResult Get()
        {
            db.Configuration.ProxyCreationEnabled = false;

            var currentUser = manager.FindById(User.Identity.GetUserId());

            var unFollowProducts = from tblFollowProduct in db.FollowProduct
                                   join tblProductDetails in db.ProductDetails on tblFollowProduct.ProductId equals tblProductDetails.ProductId
                                   where tblFollowProduct.EndUserId == "1"
                                   select new
                                   {
                                       tblProductDetails.ProductId,
                                       tblProductDetails.ProductIntro,
                                       tblProductDetails.Details
                                   };

            if (unFollowProducts != null)
            {
                return Ok(unFollowProducts);
            }
            else
            {
                return NotFound();
            }
        }
        [Route("Delete/{id:int}")]
        public IHttpActionResult Delete(int id)
        {
            FollowProduct followProduct = db.FollowProduct.Find(id);
            if(followProduct==null)
            {
                return NotFound();
            }
            db.FollowProduct.Remove(followProduct);
            try
            {
                db.SaveChanges();
            }
            catch(DbUpdateConcurrencyException ex)
            {
                return BadRequest(ex.ToString());
            }
            return Ok();
        }

    }
}
