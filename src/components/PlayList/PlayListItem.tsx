import React, { useState, useEffect } from "react";
import classNames from "classnames";
import styles from "./style.module.scss";
import { MusicListItemType, MusicPlayerState } from "../../store/types";
import { shallowEqual, useSelector } from "react-redux";

type PlayListItemProps = {
  item: MusicListItemType;
  index: number;
};
function PlayListItem({ item, index }: PlayListItemProps) {
  const currentIndex = useSelector(
    (state: MusicPlayerState) => state.currentIndex
  );
  const [duration, setDuration] = useState<string>("00:00");

  const getDuration = (src: string) => {
    return new Promise<string>((resolve) => {
      const audio = new Audio();
      audio.onloadedmetadata = () => {
        const min = `${~~(audio.duration / 60)}`;
        const sec = `${~~(audio.duration % 60)}`;
        const minutes: string = min.length >= 2 ? min : 0 + min;
        const seconds: string = sec.length >= 2 ? sec : 0 + sec;
        resolve(`${minutes}:${seconds}`);
      };
      audio.src = src;
    });
  };

  useEffect(() => {
    async function getTimer() {
      const duration = await getDuration(item.src);
      setDuration(duration);
    }
    getTimer();
  }, [item.src]);
  return (
    <>
      <div
        className={classNames(styles.row, {
          [styles.playing]: currentIndex === index,
        })}
      >
        <span aria-description="song name">{item.name}</span>
        <p aria-description="artist">{item.artist}</p>
      </div>
      <span
        className={classNames(styles.musicDuration, {
          [styles.playing]: currentIndex === index,
        })}
      >
        {duration}
      </span>
    </>
  );
}

export default PlayListItem;
