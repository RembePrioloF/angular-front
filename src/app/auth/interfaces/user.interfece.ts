import { Tournament } from "src/app/tournaments/interfaces/tournament.interfece";

export interface User {
  id:          string;
  email:       string;
  password:    string;
  name:        string;
  role:        string;
  token:       string;
  createdAt:   string;
  updatedAt:   string;
  deleteAt:    null;
  tournaments: Tournament[];
}
