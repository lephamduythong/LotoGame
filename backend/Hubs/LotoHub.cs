using Microsoft.AspNetCore.SignalR;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System.Threading;
using System;
using LotoGameBackend.Services;
using LotoGameBackend;

namespace LotoGameBackend.Hubs
{
    public class PlayerSession
    {
        public string Name { get; set; }
        public string RoomId { get; set; }
        public string ConnectionId { get; set; }
        public bool IsReady { get; set; }
        public bool IsHost { get; set; }
        public int NotInteractionTime { get; set; }
        public int[][] CurrentLotoTable { get; set;}
        public int[][] CurrentMarkedLotoTable { get; set; }
    }

    public class LotoHub : Hub
    {
        private static List<PlayerSession> playerList = new List<PlayerSession>();
        private static bool isPlaying = false;
        private static int readyCountDownTime = -1;

        public void SendReadyCountDownTime()
        {
            Clients.Caller.SendAsync("SendReadyCountDownTimeCallback", readyCountDownTime);
        }

        public void SendCurrentPlayerList()
        {
            Clients.Caller.SendAsync("SendCurrentPlayerListCallback", playerList);
        }

        public void GetRandomedLotoTable(int[][] lotoTable)
        {
            var player = playerList.Find(p => p.ConnectionId == Context.ConnectionId);
            if (player == null) 
            {
                return;
            }
            player.CurrentLotoTable = lotoTable;
        }

        public void JoinSingleRoom(string name) 
        {
            System.Console.WriteLine(name + " joined");
            
            var isHost = false;
            if (playerList.Count == 0) 
            {
                isHost = true;
            }
            
            Clients.Caller.SendAsync("JoinSingleRoomIsHostCallback", isHost);
            
            var newPlayer = new PlayerSession() 
            {
                Name = name,
                ConnectionId = Context.ConnectionId,
                IsHost = isHost ? true : false,
                NotInteractionTime = 0,
                CurrentMarkedLotoTable = new int[9][]
            };
            for (var i = 0; i < 9; i++) 
            {
                newPlayer.CurrentMarkedLotoTable[i] = new int[9];
                for (var j = 0; j < 9; j++) 
                {
                    newPlayer.CurrentMarkedLotoTable[i][j] = 0;
                }
            }
            
            playerList.Add(newPlayer);

            if (isHost) {
                readyCountDownTime = 60;
            }
        }

        public static void BackgroundResetCheck() 
        {
            while (true) 
            {
                Thread.Sleep(1000);

                Parallel.ForEach(playerList, (player) => 
                {
                    // System.Console.WriteLine("testing: " + player.Name);
                    if (player == null) 
                    {
                        return;
                    }
                    if (player.NotInteractionTime >= 10) 
                    {
                        // Kick that player
                        playerList.Remove(player);
                        Console.WriteLine("Kicked player: " + player.Name);
                    }
                    // Increase not interaction time for every player
                    player.NotInteractionTime++;
                });
                
                if (playerList.Count == 0 || playerList.Count == 1) 
                {
                    isPlaying = false;
                }
                
                if (readyCountDownTime >= 0) 
                {
                    readyCountDownTime--;
                } 
                else 
                {
                    isPlaying = true;
                }

                if (isPlaying && readyCountDownTime < 0)
                {
                    // Announce to all players the game started
                    Program.HubContext.Clients.All.SendAsync("GameStartedCallback", "ok");
                }
            }
        }
        
        public void ResetNotInteractionTime()
        {
            var player = playerList.Find(p => p.ConnectionId == Context.ConnectionId);
            if (player == null)
            {
                return;
            }
            player.NotInteractionTime = 0;
        }
    }
}