import * as dat from "dat.gui";
import { Brush } from "./brush";
import { GUISettings } from "./types";

export function createGUI(): GUISettings {
  const settings: GUISettings = {
    brush: new Brush(),
  };

  const gui = new dat.GUI();

  const brushFolder = gui.addFolder("Brush");

  brushFolder.addColor(settings.brush, "strokeStyle");
  brushFolder.add(settings.brush, "lineWidth", 1, 21);

  brushFolder.open();

  gui.remember(settings);

  return settings;
}
