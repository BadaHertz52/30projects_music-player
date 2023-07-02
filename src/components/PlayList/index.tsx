import React, { Dispatch, SetStateAction } from "react";
import QueueMusic from "@mui/icons-material/QueueMusic";
import Close from "@mui/icons-material/Close";
import PlayListItem from "./PlayListItem";
import classNames from "classnames";
import { initialPlayList } from "../../store/data";
import styles from "./style.module.scss";
const cx = classNames.bind(styles);

type PlayListProps = {
  showPlayList: boolean;
  setShowPlayList: Dispatch<SetStateAction<boolean>>;
};

const PlayList = ({ showPlayList, setShowPlayList }: PlayListProps) => {
  return (
    <div className={cx("play-list")}>
      <div className={styles.header}>
        <div className={styles.row}>
          <QueueMusic className={styles.list} />
          <span>Play list</span>
        </div>
        <Close sx={{ fontSize: 22, cursor: "pointer" }} />
      </div>
      <ul>
        {initialPlayList.map((item, index) => (
          <li key={index}>
            <PlayListItem item={item} index={index} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayList;
