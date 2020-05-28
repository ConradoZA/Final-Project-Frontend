import React from "react";
import Main from "./Main";
import { DndProvider } from "react-dnd-multi-backend";
import HTML5toTouch from "react-dnd-multi-backend/dist/cjs/HTML5toTouch";

const Checkers = () => {
  return (
    <DndProvider options={HTML5toTouch}>
      <Main />
    </DndProvider>
  );
};

export default Checkers;
