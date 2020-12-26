using System.Threading.Tasks;
using LotoGameBackend.Hubs;
using Microsoft.AspNetCore.SignalR;

namespace LotoGameBackend.Services
{   
    public class NotificationService
    {
        private readonly IHubContext<LotoHub> _myHubContext;

        public NotificationService(IHubContext<LotoHub> myHubContext)
        {
            _myHubContext= myHubContext;
        }

        public void SendMessage(string message)
        {
            _myHubContext.Clients.All.SendAsync("GameStartedCallback", "ok");
        }      
    }
}