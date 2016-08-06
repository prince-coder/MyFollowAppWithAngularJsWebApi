using Microsoft.AspNet.Identity;
using MyFollowAppWithAngularJsWebApi.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity.Infrastructure;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Configuration;
using System.Net.Http;
using System.Net.Mail;
using System.Net.Security;
using System.Security.Cryptography;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Web;
using System.Web.Http;
using System.Web.Security;

namespace MyFollowAppWithAngularJsWebApi.Controllers
{
    [Authorize(Roles ="Admin")]
    [RoutePrefix("api/ProductOwnerRequestApi")]
    public class ProductOwnerRequestApiController : ApiController
    {
      
        private MyFollowAppContext db = new MyFollowAppContext();
        [AllowAnonymous]
        [Route("Create")]
        public HttpResponseMessage Post(ProductOwnerRequest productOwnerRequest)
        {
            if (ModelState.IsValid)
            {

                db.ProductOwnerRequest.Add(productOwnerRequest);
                db.SaveChanges();
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, productOwnerRequest);
                //response.Headers.Location = new Uri(Url.Link("ControllerAndId", new { id = productOwnerRequest.ProductOwnerRequestId }));
                return response;
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ModelState);
            }

        }
        [Route("")]
        [HttpGet]
        public IEnumerable<ProductOwnerRequest> Get()
       {
            var User = HttpContext.Current.User;
            return db.ProductOwnerRequest.AsEnumerable();

        }
        [Route("{id:int}")]
        public ProductOwnerRequest Get(int id)
        {
            ProductOwnerRequest productOwnerRequest = db.ProductOwnerRequest.Find(id);
            if (productOwnerRequest == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            SendMail(productOwnerRequest.Email, productOwnerRequest.Name, productOwnerRequest.ProductOwnerRequestId);

            return productOwnerRequest;
        }
         [Route("Delete/{id:int}")]
        public IHttpActionResult Delete(int id)
        {
            ProductOwnerRequest productOwnerRequest = db.ProductOwnerRequest.Find(id);
            if(productOwnerRequest == null)
            {
                return NotFound();
            }
            db.ProductOwnerRequest.Remove(productOwnerRequest);
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
        private void SendMail(string mailTo,string name,int id)
        {
            try
            {
                SmtpSection secObj = (SmtpSection)ConfigurationManager.GetSection("system.net/mailSettings/smtp");
                MailMessage mail = new MailMessage();
                mail.To.Add(mailTo);
                mail.Subject = "Registration Request Accepted";
                string URL = string.Format(ConfigurationManager.AppSettings["mailURL"]+"{0}", id);
                mail.Body = PopulateBody(name, URL);
                mail.IsBodyHtml = true;
                SmtpClient smtp = new SmtpClient();
                smtp.UseDefaultCredentials = false;
                smtp.Host = secObj.Network.Host;
                smtp.EnableSsl = secObj.Network.EnableSsl; //---- Specify whether host accepts SSL Connections or not.
                NetworkCredential NetworkCred = new NetworkCredential(secObj.Network.UserName, secObj.Network.Password);
                ////---Your Email and password
                smtp.UseDefaultCredentials = true;
                smtp.Credentials = NetworkCred;

                //ServicePointManager.ServerCertificateValidationCallback =
                // delegate (object s, X509Certificate certificate,
                // X509Chain chain, SslPolicyErrors sslPolicyErrors)
                // { return true; };
                smtp.Send(mail);
            }
            catch(Exception e)
            {

            }
        }
        private string PopulateBody(string user,string url)
        {
            string body = string.Empty;
            //Path.
            var path = HttpContext.Current.Server.MapPath("~/Html/EmailTemplate.html");
            using (StreamReader reader = new StreamReader(path))
            {
                body = reader.ReadToEnd();
            }
            body = body.Replace("{User}", user);
            body = body.Replace("{Url}", url);
            return body;

        }

    }
}
