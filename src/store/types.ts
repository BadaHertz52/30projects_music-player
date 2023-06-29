export type MusicListItemType = {
  name: string;
  artist: string;
  img: string;
  /**
   * music mp3 file src
   */
  src: string;
  id: number;
};

export type MusicListType = MusicListItemType[];

export type RepeatType = "ONE" | "ALL" | "SHUFFLE";

export type MusicPlayerState = {
  playList: MusicListType;
  currentMusicId: number;
  currentIndex: number;
  playing: boolean;
  repeat: RepeatType;
};
