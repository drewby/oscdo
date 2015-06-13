using Microsoft.AspNet.Mvc;
using System;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace oscdo.Controllers
{
    public class HomeController : Controller
    {
        // GET: /<controller>/
        public IActionResult Index()
        {
            #if DNX451
            ViewBag.ServerName = Environment.MachineName;
            #else
            ViewBag.ServerName = "";           
            #endif
            return View();
        }
    }
}
