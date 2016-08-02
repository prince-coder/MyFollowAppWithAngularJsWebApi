using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin.Security;
using MyFollowAppWithAngularJsWebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace MyFollowAppWithAngularJsWebApi.Controllers
{
    [RoutePrefix("api/ProductOwnerApi")]
    public class ProductOwnerApiController : ApiController
    {
        
        private MyFollowAppContext db = new MyFollowAppContext();
        private UserManager<ApplicationUser> manager;
        
        private ApplicationDbContext ApplicationDb = new ApplicationDbContext();

        public ProductOwnerApiController()
         { 
             manager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(ApplicationDb)); 
         }

        //[Route("{id:int}")]
        public void Get(int id)
        {
            ProductOwnerRequest p = db.ProductOwnerRequest.Find(id);
            //Id = id;
            if (p == null)
            {
                HttpContext.Current.Response.Redirect("https://localhost:44364/ProductOwnerRequest/ExpireMessage/");
            }
            else
            {
                HttpContext.Current.Response.Redirect("https://localhost:44364/ProductOwner/Create/" + id);
            }
        }
       
        [AllowAnonymous]
        [Route("Create")]
        public async Task<IHttpActionResult> Post(ProductOwner productOwner)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    //string currentUserId = User.Identity.GetUserId();
                    var user = new ApplicationUser() { UserName = productOwner.Email, Email = productOwner.Email };
                    var checkUser = manager.FindByNameAsync(user.UserName);
                    if (checkUser.Result == null)
                    {
                        var result = await manager.CreateAsync(user, productOwner.Password);
                        if (result.Succeeded)
                        {
                            manager.AddToRole(user.Id, "Product Owner");
                        }
                        productOwner.ProductOwnerId = user.Id;
                        db.ProductOwners.Add(productOwner);
                        db.SaveChanges();
                        //int id = Convert.ToInt32(session["ProductOwnerRequestId"]);
                        ProductOwnerRequest productOwnerRequest = db.ProductOwnerRequest.Find(productOwner.RequestId);
                        if (productOwnerRequest != null)
                        {
                            db.ProductOwnerRequest.Remove(productOwnerRequest);
                            db.SaveChanges();
                        }
                        return Ok();
                    }
                    else
                    {
                        return BadRequest("User Already Exist");
                    }
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.ToString());
                }

            }
            else
            {
                return BadRequest(ModelState);
            }
            
            
            //var session = HttpContext.Current.Session;
            //productOwner.UserId = Convert.ToInt32(session["UserId"]);

            //string id = ReturnSession();
            //HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, productOwner);
            //HttpContext.Current.Response.Redirect("http://localhost:50280/api/ProductFollowApi");
            //    return response;

            //}

            //else
            //{
            //    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            //}
        }
        
    }
}
