import { ColorPalette } from "../palettes/ColorPallete";
import { DrawingTool, Frame, Palette, Point } from "../types";
import { rgb2str } from "../utils";

export class Brush implements DrawingTool {
  public readonly name = "brush";
  private points: Point[] = [];
  private paletteMap: Map<string, Palette> = new Map();

  constructor(public readonly palettes: Palette[]) {
    for (const palette of palettes) {
      this.paletteMap.set(palette.name, palette);
    }
  }

  public begin(ctx: CanvasRenderingContext2D, point: Point) {
    const colorPalette = this.paletteMap.get("color") as ColorPalette;
    if (!colorPalette) {
      throw new Error(`Palette "color" not found in "${this.name}"`);
    }

    const { size, opacity, color } = colorPalette;
    const [x, y] = point;

    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = size;
    ctx.strokeStyle = rgb2str(color, opacity);
    ctx.globalAlpha = 1;

    ctx.beginPath();
    ctx.moveTo(x, y);
    this.points.push(point);
  }

  public end(ctx: CanvasRenderingContext2D, point: Point): Frame {
    ctx.closePath();
    const points = this.points.slice(0);
    this.points.length = 0;

    return {
      drawingTool: this.name,
      palettes: this.palettes.map((p) => p.serialize()),
      points,
    };
  }

  public draw(ctx: CanvasRenderingContext2D, point: Point) {
    const [x, y] = point;
    ctx.lineTo(x, y);
    ctx.stroke();
    this.points.push(point);
  }
}
