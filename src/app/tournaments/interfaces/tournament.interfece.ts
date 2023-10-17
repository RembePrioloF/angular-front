
export interface Tournament {
  tournamId: string;
  name:      string;
  location:  string;
  league:    string;
  startDate: string;
  endDate:   null | string;
  createdAt: string;
  updatedAt: string;
  deleteAt:  null;
}
