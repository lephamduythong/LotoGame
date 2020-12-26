using Microsoft.AspNetCore.SignalR;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System.Threading;
using System;
using LotoGameBackend.Services;

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
        private static List<PlayerSession> _playerList = new List<PlayerSession>();
        private static bool _isPlaying = false;
        private static bool _isFirstInit = false;
        private static int _readyCountDownTime = -1;

        public void BroadcastStartTheGameImmediately()
        {
            Clients.All.SendAsync("GameStartedCallback", "ok");
            _isFirstInit = true;
        }

        public void SendReadyCountDownTime()
        {
            Clients.Caller.SendAsync("SendReadyCountDownTimeCallback", _readyCountDownTime);
        }

        public void SendCurrentPlayerList()
        {
            Clients.Caller.SendAsync("SendCurrentPlayerListCallback", _playerList);
        }

        public void GetRandomedLotoTable(int[][] lotoTable)
        {
            var player = _playerList.Find(p => p.ConnectionId == Context.ConnectionId);
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
            if (_playerList.Count == 0) 
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
            
            _playerList.Add(newPlayer);

            if (isHost) {
                _readyCountDownTime = 20;
            }
        }

        public static void BackgroundJobs() 
        {
            while (true) 
            {
                Thread.Sleep(1000);

                // Lost host player => reset all
                if (!_playerList.Any(p => p.IsHost))
                {
                    _isPlaying = false;
                    _readyCountDownTime = -1;
                    _playerList.Clear();
                    // System.Console.WriteLine("Reset all");
                    continue;
                }

                Parallel.ForEach(_playerList, (player) => 
                {
                    // System.Console.WriteLine("testing: " + player.Name);
                    if (player == null) 
                    {
                        return;
                    }
                    if (player.NotInteractionTime >= 10) 
                    {
                        // Kick that player
                        _playerList.Remove(player);
                        Console.WriteLine("Kicked player: " + player.Name);
                    }
                    // Increase not interaction time for every player
                    player.NotInteractionTime++;
                });
                
                if (_playerList.Count == 0 || _playerList.Count == 1) 
                {
                    _isPlaying = false;
                }
                
                if (_readyCountDownTime >= 0) 
                {
                    _readyCountDownTime--;
                } 

                if (_readyCountDownTime < 0 && _playerList.Count >= 2) 
                {
                    _isPlaying = true;
                }

                if (_isPlaying && !_isFirstInit)
                {
                    // Announce to all players the game started
                    Console.WriteLine("Start the game");
                    HubContextService.GetLotoHubContext().Clients.All.SendAsync("GameStartedCallback", "ok");
                    _isFirstInit = true;
                }
            }
        }
        
        public void ResetNotInteractionTime()
        {
            var player = _playerList.Find(p => p.ConnectionId == Context.ConnectionId);
            if (player == null)
            {
                return;
            }
            player.NotInteractionTime = 0;
        }
    }
}