import React from "react";
import { RepeatType } from "../../store/types";
import RepeatIcon from "@mui/icons-material/Repeat";
import RepeatOneIcon from "@mui/icons-material/RepeatOne";
import ShuffleIcon from "@mui/icons-material/Shuffle";
type RepeatBtnProps = {
  repeat: RepeatType;
  onClick: () => void;
};
const RepeatBtn = ({ repeat, ...props }: RepeatBtnProps) => {
  const sx = { fontSize: 30, cursor: "pointer" };
  switch (repeat) {
    case "ALL":
      return <RepeatIcon sx={sx} {...props} />;
    case "ONE":
      return <RepeatOneIcon sx={sx} {...props} />;

    case "SHUFFLE":
      return <ShuffleIcon sx={sx} {...props} />;

    default:
      return null;
  }
};

export default React.memo(RepeatBtn);
