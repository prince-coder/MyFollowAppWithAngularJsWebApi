using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(MyFollowAppWeb.Startup))]
namespace MyFollowAppWeb
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
