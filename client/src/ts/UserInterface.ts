import { DrawingTool, GUI, Palette, UserInterfaceController } from "./types";

export class UserInterface implements UserInterfaceController {
  private dtAvailable: {
    [name: string]: () => void;
  } = {};
  private paletteMap: Map<string, Palette> = new Map();
  private dtMap: Map<string, DrawingTool> = new Map();

  constructor(
    private controller: GUI,
    public readonly palettes: Palette[],
    public readonly drawingTools: DrawingTool[],
  ) {
    const dtFolder = this.controller.addFolder("tools");
    dtFolder.open();

    for (const dt of drawingTools) {
      this.dtAvailable[dt.name] = () => {
        return;
      };
      this.dtMap.set(dt.name, dt);
      dtFolder.add(this.dtAvailable, dt.name);
    }

    for (const palette of palettes) {
      const folder = this.controller.addFolder(palette.name);
      palette.connectTo(folder);
      this.paletteMap.set(palette.name, palette);
    }
  }

  public get dt(): DrawingTool {
    const dt = this.dtMap.get("brush");
    if (!dt) {
      throw new Error();
    }
    return dt;
  }

  // public addDrawingTool(tool: DrawingTool) {
  //   this.drawingTools.set(tool.name, tool);
  //   this.drawingTool = tool;
  //   this.drawingToolAvailable[tool.name] = () => {
  //     this.drawingTool = tool;
  //   };
  //   this.drawingToolsFolder.add(this.drawingToolAvailable, tool.name);
  // }
}
