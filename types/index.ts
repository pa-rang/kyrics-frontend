export interface LoginResponse {
  token: string;
  isNewUser: boolean;
}

export interface User {
  id: number;
  name: string;
  email: string;
  profileImageUrl: string;
}

export interface IMyVocab {
  id: number;
  kor: string;
  eng: string;
  korExample: string;
  engExample: string;
  isSaved: boolean;
}

export interface Artist {
  id: number;
  name: string;
  profileImageUrl: string;
  logoImageUrl: string;
}

export interface ArtistSongs {
  id: number;
  artist: string;
  backgroundImageUrl: string;
  songs: Song[];
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

export interface PlayerProps {
  handleSeekTime: (e: React.FormEvent<HTMLInputElement>) => void;
  handleBackTime: () => void;
  handleForwardTime: () => void;
}
export interface PlayControllerProps {
  handlePlay: () => void;
  handleSeekTime: (e: React.FormEvent<HTMLInputElement>) => void;
  handleVolumeChange: (e: React.FormEvent<HTMLInputElement>) => void;
  handleBackTime: () => void;
  handleForwardTime: () => void;
  handleLoop: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  mouseEnterController: () => void;
  mouseLeaveController: () => void;
}
