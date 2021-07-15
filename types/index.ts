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

export interface ITimedText {
  startTime: number;
  duration: number;
  kor: string;
  eng: string;
}

type SocialType = 'Google' | 'Facebook';
export interface IMySongItem {
  id: number;
  title: string;
  artist: string;
  albumImageUrl: string;
}
