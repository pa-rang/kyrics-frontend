export type Example = string;

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

type SocialType = 'Google' | 'Facebook';
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
