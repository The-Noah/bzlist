import {Player} from "./player.model";

interface Team{
  name: string;
  players: number;
  maxPlayers: number;
  wins: number;
  losses: number;
}

interface Configuration{
  gameStyle: string;
  timeLimit: number;
  maxShots: number;
  maxPlayers: number;
  maxPlayerScore: number;
  maxTeamScore: number;
  superflags: boolean;
  jumping: boolean;
  ricochet: boolean;
  inertia: boolean;
  shaking: boolean;
  antidoteFlags: boolean;
  handicap: boolean;
  noTeamKills: boolean;
  dropBadFlags: DropBadFlags;
}

interface DropBadFlags{
  wins: number;
  time: number;
}

export interface Server{
  address: string;
  port: number;
  ip: string;
  owner: string;
  protocol: string;
  country: string;
  countryCode: string;
  timestamp: number;
  title: string;
  online: boolean;
  teams: Array<Team>;
  players?: Array<Player>;
  playersCount: number;
  configuration: Configuration;
}
