
export interface Match {
  id?:           string;
  index?:        number;
  dateMatch?:    string;
  field?:        string;
  referee?:      string;
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
