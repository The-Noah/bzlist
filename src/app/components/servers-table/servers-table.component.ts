import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from "@angular/core";

import {SettingsService} from "../../services/settings.service";
import {ServersService} from "../../services/servers.service";

import {Server} from "../../models/server.model";

@Component({
  selector: "app-servers-table",
  templateUrl: "./servers-table.component.html",
  styleUrls: ["./servers-table.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServersTableComponent{
  // @Input() servers: Server[];
  @Output() rowClick = new EventEmitter<Server>();

  constructor(public settingsService: SettingsService,
              private serversService: ServersService){
  }

  rowClicked(server: Server): void{
    this.rowClick.emit(server);
  }

  hasColumn(column: string): boolean{
    return this.settingsService.displayedServerColumns.includes(column);
  }
}
