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
  participations: any[];
  teams:          Team[];
}
