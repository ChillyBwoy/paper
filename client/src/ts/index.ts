import * as dat from "dat.gui";

import "../css/style.css";
import { Ws } from "./Ws";

import App from "./App";
import { Brush } from "./drawingtools/Brush";
import { ColorPalette } from "./palettes/ColorPallete";
import { Paper } from "./Paper";
import { Frame } from "./types";
import { UserInterface } from "./UserInterface";

const $canvasParent = document.getElementById("canvasParent");
if (!$canvasParent) {
  throw new Error("No canvas detected");
}

const ws = new Ws("127.0.0.1:3012", () => {
  return;
});

const palettes = [new ColorPalette({})];
const drawingTools = [new Brush(palettes)];

const gui = new UserInterface(new dat.GUI(), palettes, drawingTools);
const app = new App($canvasParent, gui);

const send = (payload: Frame) => {
  // console.log(payload);
  ws.send(JSON.stringify(payload));
};

app.append((ctx, g) => {
  const paper = new Paper(ctx, g, send);
});
