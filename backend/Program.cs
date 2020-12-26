using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LotoGameBackend.Hubs;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace LotoGameBackend
{
    public class Program
    {
        public static IHubContext<LotoHub> HubContext {get; set;}

        public static void Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();
            HubContext = (IHubContext<LotoHub>)host.Services.GetService(typeof(IHubContext<LotoHub>));
            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>().UseUrls("http://0.0.0.0:5000");
                });
    }
}
