import React from "react";
import styles from "./style.module.scss";

type ProgressAreaProps = {
  props;
  ref;
};
function ProgressArea({ props, ref }: ProgressAreaProps) {
  return (
    <div className={styles.progressArea}>
      <div className={styles.progressBar}>
        <audio autoPlay></audio>
      </div>
      <div className={styles.musicTimer}>
        <span>00:00</span>
        <span>00:00</span>
      </div>
    </div>
  );
}

export default ProgressArea;
