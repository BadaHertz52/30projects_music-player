import React from "react";
import styles from "./style.module.scss";
const ProgressArea = () => {
  return (
    <div className={styles.progressArea}>
      <div className={styles.progressBar}></div>
      <div className={styles.musicTimer}>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default ProgressArea;
