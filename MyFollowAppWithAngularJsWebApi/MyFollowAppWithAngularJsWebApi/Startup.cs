using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Owin;
using Owin;
using Microsoft.Owin.Security.Facebook;
using Microsoft.Owin.Security.OAuth;

[assembly: OwinStartup(typeof(MyFollowAppWithAngularJsWebApi.Startup))]

namespace MyFollowAppWithAngularJsWebApi
{
    public partial class Startup
    {
        
        
        public void Configuration(IAppBuilder app)
        {
            
            ConfigureAuth(app);
        }
    }
}
