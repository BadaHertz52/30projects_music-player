import React from "react";
import styles from "./style.module.scss";
const SongDetail = () => {
  return (
    <>
      <div className={styles.header}></div>
      <div className={styles.imgArea} aria-description="music cover image">
        <img src="" alt="" />
      </div>
      <div className={styles.musicInfo} aria-description="music info">
        <p className={styles.song} aria-description="song title"></p>
        <p className={styles.artist} aria-description="artist"></p>
      </div>
    </>
  );
};

export default SongDetail;
