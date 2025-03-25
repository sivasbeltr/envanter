using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace StokApp.Controllers
{
    [Authorize(Roles = "admin")]
    public class SettingsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Departments()
        {
            return View();
        }

        public IActionResult Users()
        {
            return View();
        }
    }
}
