export type PlayListItemType = {
  name: string;
  artist: string;
  img: string;
  /**
   * music mp3 file src
   */
  src: string;
  id: number;
};

export type PlayListType = PlayListItemType[];

export type RepeatType = "ONE" | "ALL" | "SHUFFLE";

export type MusicPlayerState = {
  playList: PlayListType;
  currentMusicId: number;
  currentIndex: number;
  playing: boolean;
  repeat: RepeatType;
};
