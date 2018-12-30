import * as dat from "dat.gui";

import "../css/style.css";
// import { Ws } from "./ws";

import App from "./app";
import { Brush } from "./drawingtools/Brush";
import { Pencil } from "./drawingtools/Pencil";
import { ColorPalette } from "./palettes/ColorPallete";
import { Paper } from "./paper";
import { UserInterface } from "./UserInterface";

const $canvasParent = document.getElementById("canvasParent");
if (!$canvasParent) {
  throw new Error("No canvas detected");
}

const gui = new UserInterface(new dat.GUI());

gui.addPalette(new ColorPalette({}));
gui.addDrawingTool(new Pencil());
gui.addDrawingTool(new Brush());

const app = new App($canvasParent, gui);

app.append((ctx, g) => {
  const paper = new Paper(ctx, g);
});

// const ws = new Ws("127.0.0.1:3012", () => {
//   return;
// });
