import { createStandardAction } from "typesafe-actions/dist/deprecated/create-standard-action";
import {
  createReducer,
  ActionType,
  createCustomAction,
} from "typesafe-actions";

import { initialPlayList } from "./data";
import { MusicListType, MusicPlayerState, RepeatType } from "./types";

const initialState: MusicPlayerState = {
  playList: initialPlayList,
  currentMusicId: initialPlayList[0].id,
  currentIndex: 0,
  playing: false,
  repeat: "ALL",
};
const repeatMode: RepeatType[] = ["ONE", "ALL", "SHUFFLE"];

const PLAY_MUSIC = "musicPlayer/PLAY_MUSIC" as const;
const STOP_MUSIC = "musicPlayer/STOP_MUSIC" as const;
const NEXT_MUSIC = "musicPlayer/NEXT_MUSIC" as const;
const PREV_MUSIC = "musicPlayer/PREV_MUSIC" as const;
const SET_REPEAT = "musicPlayer/SET_REPEAT" as const;
const SET_CURRENT_INDEX = "musicPlayer/SET_CURRENT_INDEX" as const;
const UPDATE_PLAY_LIST = "musicPlayer/UPDATE_PLAY_LIST" as const;

export const playMusic = createStandardAction(PLAY_MUSIC)();
export const stopMusic = createStandardAction(STOP_MUSIC)();
export const nextMusic = createStandardAction(NEXT_MUSIC)();
export const prevMusic = createStandardAction(PREV_MUSIC)();
export const setRepeat = createStandardAction(SET_REPEAT)();
export const setCurrentIndex = createCustomAction(
  SET_CURRENT_INDEX,
  (index: number) => ({
    payload: {
      index,
    },
  })
);
export const updatePlayList = createCustomAction(
  UPDATE_PLAY_LIST,
  (newPlayList: MusicListType) => ({
    payload: {
      newPlayList,
    },
  })
);
const actions = {
  playMusic,
  stopMusic,
  nextMusic,
  prevMusic,
  setRepeat,
  setCurrentIndex,
  updatePlayList,
};

type MusicPlayerAction = ActionType<typeof actions>;

const getRandomNum = (arr: number[], excludeNum: number): number => {
  const randomNum = Math.floor(Math.random() * arr.length);
  return arr[randomNum] === excludeNum
    ? getRandomNum(arr, excludeNum)
    : arr[randomNum];
};
const musicPlayerReducer = createReducer<MusicPlayerState, MusicPlayerAction>(
  initialState,
  {
    [PLAY_MUSIC]: (state) => ({ ...state, playing: true }),
    [STOP_MUSIC]: (state) => ({ ...state, playing: false }),
    [SET_CURRENT_INDEX]: (state, action) => ({
      ...state,
      currentIndex: action.payload.index,
      currentMusicId: state.playList[action.payload.index].id,
    }),
    [NEXT_MUSIC]: (state) => {
      const nextIndex =
        state.repeat === "SHUFFLE"
          ? getRandomNum(
              Array.from(Array(state.playList.length).keys()),
              state.currentIndex
            )
          : (state.currentIndex + 1) % state.playList.length;

      return {
        ...state,
        currentIndex: nextIndex,
        currentMusicId: state.playList[nextIndex].id,
      };
    },
    [PREV_MUSIC]: (state) => {
      const prevIndex =
        state.repeat === "SHUFFLE"
          ? getRandomNum(
              Array.from(Array(state.playList.length).keys()),
              state.currentIndex
            )
          : (state.currentIndex - 1 + state.playList.length) %
            state.playList.length;

      return {
        ...state,
        currentIndex: prevIndex,
        currentMusicId: state.playList[prevIndex].id,
      };
    },
    [SET_REPEAT]: (state) => ({
      ...state,
      repeat:
        repeatMode[(repeatMode.indexOf(state.repeat) + 1) % repeatMode.length],
    }),
    [UPDATE_PLAY_LIST]: (state, action) => {
      const { newPlayList } = action.payload;
      return {
        ...state,
        playList: newPlayList,
        currentIndex: newPlayList.findIndex(
          (music) => music.id === state.currentMusicId
        ),
      };
    },
  }
);

export default musicPlayerReducer;
