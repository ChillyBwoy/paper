import * as dat from "dat.gui";
import { GUISettings } from "./types";

export function createGUI(): GUISettings {
  const settings: GUISettings = {
    brush: {
      fillStyle: "#2aa7a7",
      lineWidth: 3,
      strokeStyle: "#333333",
    },
  };

  const gui = new dat.GUI();

  const brushFolder = gui.addFolder("Brush");

  brushFolder.addColor(settings.brush, "fillStyle");
  brushFolder.addColor(settings.brush, "strokeStyle");
  brushFolder.add(settings.brush, "lineWidth", 1, 21);

  brushFolder.open();

  gui.remember(settings);

  return settings;
}
