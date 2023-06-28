import { PlayListType } from "./types";
import summerWalkImg from "../images/summer_walk.jpg";
import myUniverseImg from "../images/my_universe.jpg";
import levaImg from "../images/leva.jpg";
import unlockmeImg from "../images/unlockme.jpg";
import waterfallImg from "../images/waterfall.jpg";
import summerWalk from "../music/summer-walk.mp3";
import myUniverse from "../music/my-universe.mp3";
import leva from "../music/leva.mp3";
import unlockme from "../music/unlock-me.mp3";
import waterfall from "../music/waterfall.mp3";

export const playList: PlayListType = [
  {
    name: "Summer Walk",
    artist: "Olexy",
    img: summerWalkImg,
    src: summerWalk,
    id: 1,
  },
  {
    name: "My Universe",
    artist: "Nesterouk",
    img: myUniverseImg,
    src: myUniverse,
    id: 2,
  },
  {
    name: "Leva-Eternity",
    artist: "lemon music studio",
    img: levaImg,
    src: leva,
    id: 3,
  },
  {
    name: "Unlock Me",
    artist: "prazkhanal",
    img: unlockmeImg,
    src: unlockme,
    id: 4,
  },
  {
    name: "Waterfall",
    artist: "Roman Senyk Music",
    img: waterfallImg,
    src: waterfall,
    id: 5,
  },
];
