
import { Player } from "./player.interfece";

export interface Team {
  teamId:    string;
  name:      string;
  logo:      null;
  coach:     null;
  createdAt: string;
  updatedAt: string;
  deleteAt:  null;
  tournam:   string;
  players:   Player[];
}
