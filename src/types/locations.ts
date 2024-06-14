export interface Location {
  id: string;
  name_en: string;
  name_kh: string;
}

export interface SelectedLocations {
  provinces: string[];
  districts: string[];
  communes: string[];
  villages: string[];
}

export interface ProjectLocation extends SelectedLocations {}
