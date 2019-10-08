import {Injectable} from "@angular/core";

import {SettingsService} from "./settings.service";
import {SocketService} from "./socket.service";
import {Server} from "@app/models";

@Injectable({
  providedIn: "root"
})
export class ServersService{
  private _servers: Server[];

  lastUpdate = -1;

  constructor(private settingsService: SettingsService,
              private socketService: SocketService){
    try{
      this.setServers(JSON.parse(localStorage.getItem("serversCache")));
    }catch(err){
    }

    this.socketService.on<Server[]>("servers").subscribe((data: Server[]) => this.setServers(data));
    this.socketService.emit("servers", {onlinePlayers: this.settingsService.onlyServersWithPlayers});
  }

  get servers(): Server[]{
    return this.settingsService.showHiddenServers ? this._servers : this._servers.filter((server) => !this.settingsService.getList("hiddenServers", []).includes(`${server.address}:${server.port}`));
  }

  private setServers(servers: Server[]): void{
    let timestamp = 0;
    for(let i = 0; i < servers.length; i++){
      if(servers[i].timestamp > timestamp){
        timestamp = servers[i].timestamp;
      }
    }

    servers.sort((a, b) => a.playersCount > b.playersCount ? -1 : 1);
    this._servers = servers;

    this.lastUpdate = timestamp;

    try{
      return localStorage.setItem("serversCache", JSON.stringify(this.servers));
    }catch(err){
    }

    console.log("servers updated");
  }

  playerCount(): number{
    let playerCount = 0;
    for(const server of this.servers){
      playerCount += server.playersCount;

      const observerTeam = server.teams.find((team) => team.name === "Observer");
      if(observerTeam){
        playerCount -= observerTeam.players;
      }
    }

    return playerCount;
  }

  observerCount(): number{
    let observerCount = 0;
    for(const server of this.servers){
      const observerTeam = server.teams.find((team) => team.name === "Observer");
      if(observerTeam){
        observerCount += observerTeam.players;
      }
    }

    return observerCount;
  }
}
