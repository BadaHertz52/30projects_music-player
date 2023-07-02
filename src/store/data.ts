import { MusicListType } from "./types";
import summerWalkImg from "../assets/images/summer_walk.jpg";
import myUniverseImg from "../assets/images/my_universe.jpg";
import levaImg from "../assets/images/leva.jpg";
import unlockmeImg from "../assets/images/unlockme.jpg";
import waterfallImg from "../assets/images/waterfall.jpg";
import summerWalk from "../assets/music/summer-walk.mp3";
import myUniverse from "../assets/music/my-universe.mp3";
import leva from "../assets/music/leva.mp3";
import unlockme from "../assets/music/unlock-me.mp3";
import waterfall from "../assets/music/waterfall.mp3";

export const initialPlayList: MusicListType = [
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
