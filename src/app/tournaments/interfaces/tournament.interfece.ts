import { Match } from "./match.interfece";
import { Team } from "./team.interfece";

export interface Tournament {
  tournamId:      string;
  name:           string;
  location:       string;
  league:         string;
  startDate:      string;
  endDate:        null;
  user:           string;
  createdAt:      string;
  updatedAt:      string;
  deleteAt:       null;
  matchs:         Match[];
  teams:          Team[];
}
