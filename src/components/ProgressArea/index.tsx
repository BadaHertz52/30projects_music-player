import React, { forwardRef } from "react";
import styles from "./style.module.scss";

const ProgressArea = forwardRef<HTMLAudioElement>((_, ref) => {
  return (
    <div className={styles.progressArea}>
      <div className={styles.progressBar}>
        <audio ref={ref} autoPlay></audio>
      </div>
      <div className={styles.musicTimer}>
        <span>00:00</span>
        <span>00:00</span>
      </div>
    </div>
  );
});

export default ProgressArea;
