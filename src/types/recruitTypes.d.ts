export type PlayerStateDataType = {
    state_name: string;
    count: number;
  };

export type SchoolDataType = {
  lat: number;
  lng: number;
  logo: string;
  color: string;
  alt_color: string;
  playerData: PlayerStateDataType[]
}

export type RecruitsFilter = {
  schoolName: string;
  yearStart: number;
  yearEnd: number;
}