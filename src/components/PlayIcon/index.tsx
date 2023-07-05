import React from "react";
import styles from "./style.module.scss";
import classNames from "classnames";
type PlayIconProps = {
  playing: boolean;
};
const PlayIcon = ({ playing }: PlayIconProps) => {
  return (
    <div
      className={classNames(styles.playIcon, { [styles.playIconOn]: playing })}
    >
      <div className={styles.barContainer}>
        <div className={styles.bar}></div>
      </div>
      <div className={styles.barContainer}>
        <div className={styles.bar}></div>
      </div>
      <div className={styles.barContainer}>
        <div className={styles.bar}></div>
      </div>
    </div>
  );
};

export default PlayIcon;
