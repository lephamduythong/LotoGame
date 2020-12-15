using Microsoft.AspNetCore.SignalR;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace LotoGame.Hubs
{
    public class PlayerSession
    {
        public string Name { get; set; }
        public string RoomId { get; set; }
        public string ConnectionId { get; set; }
        public bool IsReady { get; set; }
        public bool IsHost { get; set; }
    }

    public class LotoHub : Hub
    {
        public static List<PlayerSession> listPlayer = new List<PlayerSession>();
        public static List<string> listRoomId = new List<string>() { "room1", "room2", "room3" };
        public static List<string> listPlayingRoomId = new List<string>();

        public async Task Test()
        {
            await Clients.All.SendAsync("TestCallback", "ok");
        }

        public async Task JoinRoom(string roomId, string name)
        {
            // Check joined state
            if (listPlayer.Any(p => p.ConnectionId == Context.ConnectionId && p.RoomId == roomId))
            {
                await Clients.Caller.SendAsync("NotifyJoinedState", name);
                return;
            }

            // Check playing room
            if (listPlayingRoomId.Contains(roomId))
            {
                await Clients.Caller.SendAsync("NotifyPlayingRoom", name);
                return;
            }

            // Join 
            var newPlayer = new PlayerSession()
            {
                RoomId = roomId,
                Name = name,
                ConnectionId = Context.ConnectionId,
                IsReady = false,
                IsHost = listPlayer.Count == 0 ? true : false // First player will be chosen as the host
            };
            listPlayer.Add(newPlayer);
            await Groups.AddToGroupAsync(Context.ConnectionId, roomId);

            // Find there is any host player ?
            var hostPlayer = listPlayer.Find(p => p.IsHost);

            // Notify all players in room
            await Clients.Group(roomId).SendAsync("NotifyNewJoin", name, hostPlayer?.Name, newPlayer.IsHost);
        }

        public async Task LeaveRoom(string roomId)
        {
            var player = listPlayer.Find(u => u.ConnectionId == Context.ConnectionId);
            if (player == null) 
            {
                return;
            }
            string playerName = player.Name;
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, roomId);
            listPlayer.Remove(player);

            await Clients.Group(roomId).SendAsync("NotifyPlayerLeft", playerName);
        }

        public async Task DefineHost(string message, string roomId)
        {
            var player = listPlayer.Find(p => p.ConnectionId == Context.ConnectionId);

            if (message == "yes")
            {
                if (listPlayer.Any(p => p.IsHost)) 
                {
                    await Clients.Caller.SendAsync("DefineHostResult", "exist", listPlayer.Find(p => p.IsHost).Name);
                    return;
                }
                player.IsHost = true;
                await Clients.Group(roomId).SendAsync("DefineHostResult", "defined", player.Name);
                return;
            }

            player.IsHost = false;
            await Clients.Group(roomId).SendAsync("DefineHostResult", "removed");
        }

        public async Task CountPlayer(string roomId)
        {
            await Clients.Group(roomId).SendAsync("CountPlayerResult", listPlayer.Count);
        }

        public void Ready(string roomId)
        {
            var player = listPlayer.Find(u => u.ConnectionId == Context.ConnectionId);
            player.IsReady = true;
        }

        public void CancelReady(string roomId)
        {
            var player = listPlayer.Find(u => u.ConnectionId == Context.ConnectionId);
            player.IsReady = false;
        }

        public async Task CheckReadyState(string roomId)
        {
            if (listPlayer.All(p => p.IsReady) && listPlayer.Count >= 2)
            {
                listPlayingRoomId.Add(roomId);
                await Clients.Group(roomId).SendAsync("StartGame");
            }
        }

        public async Task StopTheGame(string roomId)
        {
            listPlayingRoomId.Remove(roomId);
            await Clients.Group(roomId).SendAsync("StopGame");
        }
    }
}