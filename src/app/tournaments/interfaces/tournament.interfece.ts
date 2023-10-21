
export interface Tournament {
  tournamId:      string;
  name:           string;
  location:       string;
  league:         string;
  startDate:      string;
  endDate:        null;
  createdAt:      string;
  updatedAt:      string;
  deleteAt:       null;
  participations: any[];
  teams:          Team[];
}

export interface Team {
  teamId:    string;
  name:      string;
  logo:      null;
  coach:     null;
  createdAt: string;
  updatedAt: string;
  deleteAt:  null;
}
