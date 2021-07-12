export type Example = string;

export interface Artist {
  id: number;
  name: string;
  profileImageUrl: string;
  logo: string;
}

export interface ISongData {
  albumImageUrl: string;
  artist: string;
  id: number;
  isSaved: boolean;
  lyrics: ITimedText[];
  title: string;
  youtubeUrl: string;
}

export interface ITimedText {
  startTime: number;
  duration: number;
  kor: string;
  eng: string;
}
