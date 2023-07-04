import React, { Dispatch, SetStateAction, useCallback } from "react";
import QueueMusic from "@mui/icons-material/QueueMusic";
import Close from "@mui/icons-material/Close";
import PlayListItem from "./PlayListItem";
import styles from "./style.module.scss";
import { initialPlayList } from "../../store/data";
import { useSelector, useDispatch } from "react-redux";
import {
  MusicListItemType,
  MusicListType,
  MusicPlayerState,
} from "../../store/types";
import {
  setCurrentIndex,
  updatePlayList,
} from "../../store/musicPlayerReducer";
import classNames from "classnames";
import { SortableList } from "@badahertz52/sortable-list-tsc";

type PlayListProps = {
  showPlayList: boolean;
  setShowPlayList: Dispatch<SetStateAction<boolean>>;
};

const PlayList = ({ showPlayList, setShowPlayList }: PlayListProps) => {
  const playList = useSelector((state: MusicPlayerState) => state.playList);
  const dispatch = useDispatch();
  const onClickClosePlayList = useCallback(() => {
    setShowPlayList(false);
  }, [setShowPlayList]);
  const onClickItem = useCallback(
    (index: number) => {
      dispatch(setCurrentIndex(index));
    },
    [dispatch]
  );

  const updateData = useCallback(
    (newPlayList: MusicListType) => {
      dispatch(updatePlayList(newPlayList));
    },
    [dispatch]
  );

  const renderItem = useCallback(
    (item: MusicListItemType, index: number) => (
      <PlayListItem item={item} index={index} />
    ),
    []
  );

  return (
    <div
      className={classNames(styles.playList, {
        [styles.playListShow]: showPlayList,
      })}
    >
      <div className={styles.header}>
        <div className={styles.row}>
          <QueueMusic className={styles.list} />
          <span>Play list</span>
        </div>
        <Close
          sx={{ fontSize: 22, cursor: "pointer" }}
          onClick={onClickClosePlayList}
        />
      </div>
      <SortableList
        data={playList}
        onClickItem={onClickItem}
        renderItem={renderItem}
        updateData={updateData}
      />
    </div>
  );
};

export default PlayList;
