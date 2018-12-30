import { DrawingTool, GUI, Palette, UserInterfaceController } from "./types";

export class UserInterface implements UserInterfaceController {
  public drawingTool: DrawingTool | null = null;
  private palettes: Map<string, Palette> = new Map();
  private drawingTools: Map<string, DrawingTool> = new Map();
  private drawingToolAvailable: {
    [name: string]: () => void;
  } = {};

  constructor(private controller: GUI) {}

  public getPalette(name: string): Palette {
    const palette = this.palettes.get(name);
    if (!palette) {
      throw new Error(`No palette found: "${name}"`);
    }

    return palette;
  }

  public addPalette(palette: Palette) {
    const folder = this.controller.addFolder(palette.name);
    palette.connectTo(folder);

    this.palettes.set(palette.name, palette);
  }

  public addDrawingTool(tool: DrawingTool) {
    tool.connectTo(this);

    this.drawingTools.set(tool.name, tool);
    this.drawingTool = tool;
    this.drawingToolAvailable[tool.name] = () => {
      this.drawingTool = tool;
    };
    this.controller.add(this.drawingToolAvailable, tool.name);
  }
}
