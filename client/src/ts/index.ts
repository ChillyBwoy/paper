import "../css/style.css";
import { createGUI } from "./gui";
import { Paper } from "./paper";
import { Ws } from "./ws";

const $canvasParent = document.getElementById("canvasParent");
if (!$canvasParent) {
  throw new Error("No canvas detected");
}

const paper = new Paper(
  $canvasParent,
  {
    flushInterval: 25,
  },
  createGUI(),
);

const ws = new Ws("127.0.0.1:3012", () => {
  return;
});
