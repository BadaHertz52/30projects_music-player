import React from "react";
import styles from "./style.module.scss";
import { shallowEqual, useSelector } from "react-redux";
import { MusicPlayerState } from "../../store/types";
import { PlayIcon } from "../../components";
const SongDetail = () => {
  const { playing, playList, currentIndex } = useSelector(
    (state: MusicPlayerState) => ({
      playing: state.playing,
      playList: state.playList,
      currentIndex: state.currentIndex,
    }),
    shallowEqual
  );

  return (
    <>
      <div className={styles.header}>
        <PlayIcon playing={playing} />
      </div>
      <div className={styles.imgArea} aria-description="music cover image">
        <img
          src={playList[currentIndex].img}
          alt={playList[currentIndex].name}
        />
      </div>
      <div className={styles.musicInfo} aria-description="music info">
        <p className={styles.song} aria-description="song title">
          {playList[currentIndex].name}
        </p>
        <p className={styles.artist} aria-description="artist">
          {playList[currentIndex].artist}
        </p>
      </div>
    </>
  );
};

export default SongDetail;
