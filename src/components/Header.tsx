import React from "react";
import HighlightIcon from "@material-ui/icons/Highlight";
import Logout from "./auth/Logout";

function Header() {
  return (
    <header className="flex justify-between bg-yellow-300 p-8 text-white">
      <h1>
        <HighlightIcon />
        Todolist
      </h1>
      <Logout />
    </header>
  );
}

export default Header;