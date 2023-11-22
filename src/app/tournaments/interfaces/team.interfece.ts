
import { Player } from "./player.interfece";

export interface Team {
  teamId:    string;
  name:      string;
  logo?:      null;
  coach?:     string;
  createdAt?: string;
  tournam?:   string;
  players?:   Player[];
}



