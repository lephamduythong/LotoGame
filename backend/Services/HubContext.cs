using LotoGameBackend.Hubs;
using Microsoft.AspNetCore.SignalR;

namespace LotoGameBackend.Services
{
    public static class HubContextService
    {
        public static IHubContext<LotoHub> GetLotoHubContext()
        {
            return Program.HubContext;
        }
    }
}