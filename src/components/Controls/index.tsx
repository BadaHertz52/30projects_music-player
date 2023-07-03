import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  ChangeEvent,
} from "react";
import RepeatIcon from "@mui/icons-material/Repeat";
import PauseIcon from "@mui/icons-material/Pause";
import SkipPrevious from "@mui/icons-material/SkipPrevious";
import PlayArrow from "@mui/icons-material/PlayArrow";
import SkipNext from "@mui/icons-material/SkipNext";
import QueueMusic from "@mui/icons-material/QueueMusic";

import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import styles from "./style.module.scss";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { MusicPlayerState } from "../../store/types";
import {
  nextMusic,
  prevMusic,
  setRepeat,
} from "../../store/musicPlayerReducer";
import RepeatBtn from "../RepeatBtn";

type ControlsProps = {
  setShowPlayList: Dispatch<SetStateAction<boolean>>;
  //resetDuration;
  play: () => void;
  pause: () => void;
  changeVolume: (v: number) => void;
  resetDuration: () => void;
};
const Controls = ({
  setShowPlayList,
  play,
  pause,
  changeVolume,
  resetDuration,
}: ControlsProps) => {
  const { playing, repeat } = useSelector(
    (state: MusicPlayerState) => ({
      playing: state.playing,
      repeat: state.repeat,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  const sx = { fontSize: 30, cursor: "pointer" };
  const onClickPlay = useCallback(() => {
    play();
  }, [play]);

  const onClickPause = useCallback(() => {
    pause();
  }, [pause]);

  const onChangeVolume = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      changeVolume(+event.target.value);
    },
    [changeVolume]
  );
  const onClickPrevious = useCallback(() => {
    repeat === "ONE" ? resetDuration() : dispatch(prevMusic());
  }, [dispatch]);

  const onClickNext = useCallback(() => {
    repeat === "ONE" ? resetDuration() : dispatch(nextMusic());
  }, [dispatch]);

  const onClickRepeat = useCallback(() => {
    dispatch(setRepeat());
  }, [dispatch]);

  const onClickShowPlayList = useCallback(() => {
    setShowPlayList(true);
  }, []);

  return (
    <div className={styles.controlArea}>
      <QueueMusic sx={sx} onClick={onClickShowPlayList} />
      <RepeatBtn repeat={repeat} onClick={onClickRepeat} />
      <SkipPrevious sx={sx} onClick={onClickPrevious} />
      {playing ? (
        <PauseIcon sx={sx} onClick={onClickPause} />
      ) : (
        <PlayArrow className={styles.play} sx={sx} onClick={onClickPlay} />
      )}
      <SkipNext sx={sx} onClick={onClickNext} />
      <div className={styles.volumeContainer}>
        <VolumeUpIcon sx={{ fontSize: 20 }} />
        <input
          type="range"
          style={{ cursor: "pointer" }}
          defaultValue={1}
          onChange={onChangeVolume}
          min="0"
          max="1"
          step="0.1"
        />
      </div>
    </div>
  );
};

export default Controls;
