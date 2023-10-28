
export interface PlayerInMatch {
  id:         string;
  dateTime:   string;
  matchEvent: string;
  point:      number;
  createdAt:  string;
  updatedAt:  string;
  deleteAt:   null;
  player:     Player;
}

export interface Player {
  playerId:     string;
  name:         string;
  birthDate:    string;
  playerNumber: number;
  position:     string;
  isCaptain:    boolean;
  email:        string;
  team:         Team;
}

export interface Team {
  teamId:    string;
  name:      string;
  logo:      null;
  coach:     null;
}
