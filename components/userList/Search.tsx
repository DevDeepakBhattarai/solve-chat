import React, { ReactElement } from "react";
import SearchIcon from "../Icons/SearchIcon";

interface Props {}

export default function Search({}: Props): ReactElement {
  return (
    <div className="h-10 w-10 grid place-items-center box-border rounded-full hover:bg-white/20 transition-all duration-150 bg-white/10">
      <SearchIcon className="h-5 w-5"></SearchIcon>
    </div>
  );
}
