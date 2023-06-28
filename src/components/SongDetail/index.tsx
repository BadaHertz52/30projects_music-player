import React from "react";
import styles from "./style.module.scss";
const SongDetail = () => {
  return (
    <>
      <div className={styles.header}></div>
      <div className={styles.imgArea}>
        <img src="" alt="" />
      </div>
      <div className={styles.musicInfo}>
        <p className={styles.song}></p>
        <p className={styles.artist}></p>
      </div>
    </>
  );
};

export default SongDetail;
