export type Example = string;

export interface Artist {
  id: number;
  name: string;
  profileImageUrl: string;
  logo: string;
}

export interface Song {
  title: string;
  artist: string[];
  albumImg: string;
  songId: number;
}
