import React, { Dispatch, SetStateAction } from "react";
import RepeatIcon from "@mui/icons-material/Repeat";
import RepeatOneIcon from "@mui/icons-material/RepeatOne";
import PauseIcon from "@mui/icons-material/Pause";
import SkipPrevious from "@mui/icons-material/SkipPrevious";
import PlayArrow from "@mui/icons-material/PlayArrow";
import SkipNext from "@mui/icons-material/SkipNext";
import QueueMusic from "@mui/icons-material/QueueMusic";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import styles from "./style.module.scss";

type ControlsProps = {
  setShowPlayList: Dispatch<SetStateAction<boolean>>;
  //resetDuration;
  play: () => void;
  pause: () => void;
  changeVolume: (v: number) => void;
};
const Controls = ({
  setShowPlayList,
  play,
  pause,
  changeVolume,
}: ControlsProps) => {
  return (
    <div className={styles.controlArea}>
      <QueueMusic sx={{ fontSize: 30, cursor: "pointer" }} />
      <RepeatIcon sx={{ fontSize: 30, cursor: "pointer" }} />
      <SkipPrevious sx={{ fontSize: 30, cursor: "pointer" }} />
      {true ? (
        <PauseIcon sx={{ fontSize: 30, cursor: "pointer" }} />
      ) : (
        <PlayArrow
          className={styles.play}
          sx={{ fontSize: 30, cursor: "pointer" }}
        />
      )}
      <SkipNext sx={{ fontSize: 30, cursor: "pointer" }} />
      <div className={styles.volumeContainer}>
        <VolumeUpIcon sx={{ fontSize: 20 }} />
        <input
          type="range"
          style={{ cursor: "pointer" }}
          defaultValue={1}
          min="0"
          max="1"
          step="0.1"
        />
      </div>
    </div>
  );
};

export default Controls;
