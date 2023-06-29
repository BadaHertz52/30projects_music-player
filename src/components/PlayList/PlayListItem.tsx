import React from "react";
import classNames from "classnames";
import styles from "./style.module.scss";
import { MusicListItemType } from "../../store/types";
const cx = classNames.bind(styles);

type PlayListItemProps = {
  item: MusicListItemType;
  index: number;
};
function PlayListItem({ item, index }: PlayListItemProps) {
  return (
    <>
      <div className={cx("row")}>
        <span>{item.name}</span>
        <p>{item.artist}</p>
      </div>
      <span className={cx("music-duration")}>00:00</span>
    </>
  );
}

export default PlayListItem;
