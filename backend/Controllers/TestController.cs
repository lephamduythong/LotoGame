using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LotoGameBackend.Hubs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;

namespace LotoGameBackend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TestController : ControllerBase
    {
        private IHubContext<LotoHub> _hubContext;
        public TestController(IHubContext<LotoHub> hubContext)
        {
            _hubContext = hubContext;
        }
 
        [HttpGet]
        public void Get()
        {
            _hubContext.Clients.All.SendAsync("GameStartedCallback", "ok");
        }
    }
}
