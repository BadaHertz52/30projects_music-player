import React from "react";
import styles from "./style.module.scss";
const PlayListItem = () => {
  return (
    <>
      <div className={styles.row}>
        <span></span>
        <p></p>
      </div>
      <span className={styles.musicDuration}></span>
    </>
  );
};

export default PlayListItem;
