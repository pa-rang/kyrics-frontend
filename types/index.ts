export type Example = string;

export interface Artist {
  id: number;
  name: string;
  profileImageUrl: string;
  logo: string;
}

export interface ITimedText {
  startTime: number;
  duration: number;
  kor: string;
  eng: string;
}

type SocialType = 'Google' | 'Facebook';
