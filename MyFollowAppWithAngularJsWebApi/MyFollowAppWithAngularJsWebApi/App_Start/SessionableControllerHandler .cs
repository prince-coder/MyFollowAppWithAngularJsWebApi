﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.WebHost;
using System.Web.Routing;
using System.Web.SessionState;

namespace MyFollowAppWithAngularJsWebApi.Models
{
    public class SessionableControllerHandler: HttpControllerHandler, IRequiresSessionState
    {
        public SessionableControllerHandler(RouteData routeData)
        : base(routeData)
        { }

    }
}