export type Example = string;

export interface Artist {
  id: number;
  name: string;
  profileImageUrl: string;
  logoImageUrl: string;
}

export interface ArtistSongs {
  id: number;
  name: string;
  backgroundImage: string;
  songs: Song[];
}

export interface Song {
  id: number;
  title: string;
  artist: string;
  albumImageUrl: string;
}

export interface ITimedText {
  startTime: number;
  duration: number;
  kor: string;
  eng: string;
}
export interface IMySongItem {
  id: number;
  title: string;
  artist: string;
  albumImageUrl: string;
}
