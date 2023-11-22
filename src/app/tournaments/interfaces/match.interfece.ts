
export interface Match {
  id?:           string;
  index?:        number;
  dateMatch?:    string;
  field?:        string;
  endMatch?:     boolean;
  referee?:      string;
  typeMatch?:    string;
  tournam?:      string;
  localTeam?:    string;
  visitingTeam?: string;
  teams?:        TeamMatch[];
  openEvent?:    number;
}
export interface TeamMatch {
  teamId:    string;
  name:      string;
  logo?:      null;
  point?:     number;
}
