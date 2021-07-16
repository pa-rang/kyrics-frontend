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
